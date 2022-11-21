//const jwt = require("jsonwebtoken");
//const service = require("../services/my.service");

// API 9-1. 일반 회원 MyPage 에서 나의 정보 조회 (나의 상세 정보)
exports.get_detail = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    // 일반회원의 상세정보를 json 포멧 으로 전송 하는 함수 구현 필요
    //const result_data = await service.getMyDetail(address);
    ///////////////////test code ////////////////
    const my_info_obj = {
      nickname: "<nickname>",
      image_uri: "<profile iamge IPFS 경로>",
    };
    return res.status(200).json({
      data: { my_info: my_info_obj },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};

// API 9-2. 일반 회원 MyPage 에서 나의 정보 조회 (나의 가입 클럽)
exports.get_club = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    // 일반회원이 가입한 club 정보를 json 포멧 으로 전송 하는 함수 구현 필요
    const result_data = await service.getMyClubs(address);
    ///////////////////test code ////////////////
    const my_club_obj = [
      {
        club_id: "<club id>",
        "club name": "<club name>",
      },
      {
        club_id: "<club id 2>",
        "club name": "<club name 3>",
      },
    ];
    return res.status(200).json({
      data: { my_club: my_club_obj },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 9-3. 일반 회원 MyPage 에서 나의 정보 조회 (나의 보유 NFT)
exports.get_nft = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    // 일반회원의 nft정보를 json 포멧 으로 전송 하는 함수 구현 필요
    const result_data = await service.getMyNFTs(address);
    ///////////////////test code ////////////////
    const my_nft_obj = [
      {
        nft_id: "<nft id>",
        token_url: "ipfs://ehuhuhfuhuhu3fugu3gu3gqu",
      },
      {
        nft_id: "<nft id 2>",
        token_url: "ipfs://ehuhuhfuhuhu3fugu3gu3gqu",
      },
    ];
    return res.status(200).json({
      data: { my_nft: my_nft_obj },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 9-4. 일반 회원 MyPage 에서 나의 정보 조회 (나의 작성 게시글)
exports.get_content = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 일반회원의 작성게시글 정보를 json 포멧 으로 전송 하는 함수 구현 필요
    const result_data = await service.getMyContents(address);
    ///////////////////test code ////////////////
    const my_content_obj = [
      {
        title: "<title>",
        post_id: "<post id>",
      },
      {
        title: "<title 2>",
        post_id: "<post id 2>",
      },
    ];
    return res.status(200).json({
      data: { my_contents: my_content_obj },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 10. 운영자 MyPage 에서 정보 조회 (가입을 요청한 회원 정보 조회)
exports.get_admin_info = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 운영자에게 가입을 희망하는 회원의 정보를 json 포멧 으로 전송 하는 함수 구현 필요
    const result_data = await service.getAdminInfo(address);
    ///////////////////test code ////////////////
    const my_hope_obj = [
      {
        address: "<회원 address>",
        nickname: "<ghldnjs nick name>",
      },
      {
        address: "<회원 address 2>",
        nickname: "<ghldnjs nick name 2>",
      },
    ];
    return res.status(200).json({
      data: { signup_list: my_hope_obj },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 11. 운영자 MyPage 에서 가입 허용
exports.get_admin_allow = async (req, res, next) => {
  try {
    const address = req.params.address;
    const club_id = req.params.club_id;
    console.log(address, club_id);
    if (!(address && club_id))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 운영자가 가입을 희망하는 회원을 허락하는 함수 구현 필요
    const result_data = await service.setAdminAllow(address);
    ///////////////////test code ////////////////
    return res.status(200).json({
      data: "success",
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
