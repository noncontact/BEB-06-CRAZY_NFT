const basePath = process.cwd();
const service_user = require("../services/user.service");
const service_nft = require("../services/nft.service");
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
    console.log("12. NFT 발행 (Deploy) 요청")
    const { club_id, nft_name, nft_symbol, nft_desc, nft_price, deploy_count } =
      req.body;
    console.log(club_id, nft_name, nft_desc, nft_price, deploy_count);
    if (!(club_id && nft_name && nft_desc && nft_price && deploy_count))
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
      await service_nft.setNFTDeploy(
        club_id,
        meta_cid,
        nft_price,
        deploy_count,
        result_deploy.value
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
    console.log("API 13. NFT 민팅 요청")
    const { address, tx_hash, club_id } = await req.body;
    console.log(address, tx_hash, club_id);
    if (!(address && club_id && tx_hash))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    // DB table에서 tx_hash 를 검색하여 동일한 것이 잇는지 확인한다.
    const result_check = await service_nft.checkTransHash(tx_hash); //<<<< Database 함수 추가 필요
    if (result_check.msg === "success")
      return res
        .status(404)
        .json({ data: "fail error = 이미 처리된 hash 입니다." });
    //database 에서 club_id 에 맞는 contract address 와 tokenURI, deploy_count, price 를 가져오는 함수 필요
    const result_db = await service_nft.getContractAddress(club_id); //<<<< Database 함수 추가 필요
    if(result_db.msg !== "success"){
      return res.status(404).json({
        data: `fail error = ${result_db.value}`,
      });
    }
    // 클라이언트에서 회원이 서버계좌에 토큰을 보냈는지 확인하는 함수 구현
    const result_trans = await contract_proc.getTokenTransCheck(
      address,
      tx_hash,
      result_db.value.price
    );
    if (result_trans === "ok") {
      // 현재 발행량이 초과가 되었는지 체크하는 함수
      const result_supply = await contract_proc.getNFTDeployCheck(
        result_db.value.dataValues.contractAddress,
        result_db.value.dataValues.deployCount
      );
      if (result_supply === "ok") {
        console.log("esult_supply === ok")
        console.log(result_db.value.dataValues)
        // 운영자가 NFT 민팅하여 클라이언트 계정에 전송하는 함수 구현
        const return_mint = await contract_proc.MintNFT(
          address,
          result_db.value.dataValues.contractAddress,
          result_db.value.dataValues.metaCid
        );
        if (return_mint.msg === "success") {
          console.log("return_mint.msg === ok")
          // minting을 한 user 계정의 NFT 정보를 database에 insert 하는 함수 구현 필요
          const result_user = await service_user.getUserId(address); // <<< Database 함수 추가 필요
          
          if(result_user.msg !== "success") {
            return res.status(404).json({
              data: `fail error = ${result_user.value}`,
            });
          }
          console.log("result_user = " , result_user.value.dataValues.id)
          const result = await service_nft.setNFTMint(
            address,
            club_id,
            return_mint.value,
            result_user.value.dataValues.id
          ); 
           
          if(result.msg !== "success") {
            return res.status(404).json({
              data: `fail error = ${result.value}`,
            });
          }
          // transaction history table에 회원 지갑 주소, tx_hash 를 insert 하는 함수 필요
          console.log("insert start = ", result_user.value, tx_hash)
          const result_set = await service_nft.setTransHash(result_user.value.dataValues.id, tx_hash);
          if (result_set.msg !== "success"){
            return res.status(404).json({
              data: `fail error = ${result_set.value}`,
            });
          }

          return res.status(200).json({
            data: {
              token_uri: `ipfs://${result_db.value.dataValues.metaCid}`,
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

// API 14. 서버 계정(Account) 및 contract address 요청
exports.get_nft_address = async (req, res, next) => {
  try {
    console.log("14. 서버 계정(Account) 및 contract address 요청")
    return res.status(200).json({
      data: {
        address: `${process.env.SERVER_ACCOUNT}`,
        ca: `${process.env.KIP7_CONTRACT_ADDRESS}`
      }
    });

  }catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }

}

//15. NFT 이미지 생성을 위한 Parts 이미지 upload 요청
exports.post_nft_parts_upload = async (req, res, next) => {
  try {
    console.log("15. NFT 이미지 생성을 위한 Parts 이미지 upload 요청")
    const { club_id, dir, total } = await req.body;
    console.log(club_id, dir, total);
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
      return res.status(200).json({
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


//17. 클럽에서 민팅된 모등 NFT 정보 요청
exports.get_nft_all = async(req, res, next)=> {
  try {
    console.log("17. 클럽에서 민팅된 모등 NFT 정보 요청")
    const club_id = req.params.club_id;
    console.log(club_id);
    const result_array = await service_nft.getNFTAllInfo(club_id);
    if(result_array.msg === "success") {
      return res.status(200).json({
        data: result_array.value
      });
    }
    
    return res.status(404).json({
      data: `fail error = ${result_array.value}`
    });
  }
  catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
}