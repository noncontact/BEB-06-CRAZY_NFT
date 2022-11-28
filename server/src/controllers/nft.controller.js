const basePath = process.cwd();
const service = require("../services/nft.service");
const contract_proc = require("../process/contract.process");
const file_proc = require("../process/file.process");
const {
  startCreating,
  buildSetup,
} = require(`${basePath}/hashilip_engine/src/main.js`);
const {
  updateConfig,
} = require(`${basePath}/hashilip_engine/src/update_info.js`);

// API 12. NFT 발행 (Deploy) 요청
exports.post_nft_deploy = async (req, res, next) => {
  try {
    const {
      address,
      club_id,
      nft_name,
      nft_symbol,
      nft_desc,
      nft_price,
      deploy_count,
    } = req.body;
    console.log(club_id, nft_name, nft_desc, nft_price, deploy_count);
    if (
      !(address && club_id && nft_name && nft_desc && nft_price && deploy_count)
    )
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    // 수신된 parts 이미지를 조합하여 nft 이미지를 생성하는 기능 구현
    await buildSetup();
    await startCreating(deploy_count, club_id);
    // 생성돤 nft 이미지와 metadata json 파일을 NFT.Storage 로 uploade 하는 기능 구현
    let dir_path = `${process.env.NFT_BUILD_PATH}/images`;
    let cid = await file_proc.ipfs_dir_upload(dir_path);
    console.log(cid);
    const upload_result = await updateConfig(cid, nft_name, nft_desc);
    let meta_cid;
    if (upload_result === "success") {
      dir_path = `${process.env.NFT_BUILD_PATH}/json`;
      meta_cid = await file_proc.ipfs_dir_upload(dir_path);
      console.log(meta_cid);
    } else
      return res.status(404).json({
        data: `fail error = ${upload_result}`,
      });

    // NFT 발행을 하는 함수 구현
    const result_deploy = await contract_proc.DeployNFT(nft_name, nft_symbol);
    if (result_deploy.msg === "success") {
      // 발행을 한 NFT 정보를 database에 insert 하는 함수 구현 필요
      await service.setNFTDeploy(
        club_id,
        meta_cid,
        nft_price,
        deploy_count,
        result_deploy.value,
        address
      );
      return res.status(200).json({
        data: { token_uri: `ipfs://${meta_cid}`, ca: result_deploy.value },
      });
    } else {
      return res.status(404).json({
        data: `fail error = ${result_deploy.value}`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// API 13. NFT 민팅 요청
exports.post_nft_mint = async (req, res, next) => {
  try {
    const { address, tx_hash, club_id } = await req.body;
    console.log(address, tx_hash, club_id);
    if (!(address && club_id && tx_hash))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    //database 에서 club_id 에 맞는 contract address 와 tokenURI, deploy_count, price 를 가져오는 함수 필요
    const result_db = await service.getContractAddress(club_id); //<<<< Database 함수 추가 필요
    console.log(result_db);
    // 클라이언트에서 회원이 서버계좌에 토큰을 보냈는지 확인하는 함수 구현
    const result_trans = await contract.getTokenTransCheck(
      address,
      tx_hash,
      result_db.price
    );
    if (result_trans === "ok") {
      // 현재 발행량이 초과가 되었는지 체크하는 함수
      const result_supply = await contract_proc.getNFTDeployCheck(
        result_db.contract_add,
        result_db.deploy_count
      );
      if (result_supply === "ok") {
        // 운영자가 NFT 민팅하여 클라이언트 계정에 전송하는 함수 구현
        const return_mint = await contract_proc.MintNFT(
          address,
          result_db.contract_add,
          result_db.token_URI
        );
        if (return_mint === "success") {
          // minting을 한 user 계정의 NFT 정보를 database에 insert 하는 함수 구현 필요
          const user = await getUserId(address);
          if (!user)
            return res
              .status(404)
              .json({ data: "fail error = 없는 유저입니다." });
          await service.setNFTMint(address, club_id, return_mint.value, user.id); //<<<< Database 함수 추가 필요
          // minting 후 nft table에 발행량을 업데이트
          const count = result_db.deploy_count++;
          await service.setDeployCount(club_id, count);
          return res.status(200).json({
            data: {
              token_uri: result_db.token_URI,
              token_id: return_mint.value,
            },
          });
        } else {
          return res.status(404).json({
            data: `fail error = ${return_mint.value}`,
          });
        }
      } else {
        return res.status(404).json({
          data: `fail error = ${result_supply}`,
        });
      }
    } else {
      return res.status(404).json({
        data: `fail error = ${result_trans}`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

//15. NFT 이미지 생성을 위한 Parts 이미지 upload 요청
exports.post_nft_parts_upload = async (req, res, next) => {
  try {
    const { club_id, dir, total } = await req.body;
    console.log(club_id, dir, total);
    console.log(
      "move start -----------------------------------------------------------------------"
    );
    const targetDir = `${process.env.NFT_IMG_WORK_PATH}/${club_id}/layer/${dir}`;
    console.log(targetDir);
    await file_proc.makeFolder(targetDir);
    // 프론트로 부터 수신된 parts 별 이미지 파일은 process.env.NFT_UPLOAD_PATH -> targetDir 으로 옮긴다.
    const result = await file_proc.filesMove(
      process.env.NFT_UPLOAD_PATH,
      targetDir
    );
    if (result === "success") {
      const msg = `${dir}/${total} 번째 Parts 이미지 저장 성공`;
      res.status(200).json({
        data: {
          message: msg,
          fileInfo: req.files,
        },
      });
    } else {
      return res.status(404).json({
        data: `fail error = ${result}`,
      });
    }
  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};
