const { user, nft, post, club } = require("#src/services/index");

// ✅ API 9-1. 일반 회원 MyPage 에서 나의 정보 조회 (나의 상세 정보)
exports.get_detail = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log("MyPage나의 정보조회", address);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });

    const result_data = await user.getMyDetail(result_user.value.dataValues.id);
    if(result_data.msg !== "success") {
      return res.status(404).json({ data: `fail error = ${result_data.value}` });
    }

    return res.status(200).json({
      data: { my_info: result_data.value },
    });
  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 9-2. 일반 회원 MyPage 에서 나의 정보 조회 (나의 가입 클럽)
exports.get_club = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log("MyPage 나의 club 조회", address);
    //const { userId } = req.cookies.login;
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });

    const data = await user.getMyClubs(result_user.value.dataValues.id);
    if(data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${data.value}` });

    const { ApplyClub } = data.value[0];

    const my_club = ApplyClub.map((el) => {
      return {
        id: el.id,
        title: el.title,
        img: el.img,
        createdAt: el.UserClub.createdAt,
      };
    });

    return res.status(200).json({
      data: { my_club },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// API 9-3. 일반 회원 MyPage 에서 나의 정보 조회 (나의 보유 NFT)
exports.get_nft = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log("MyPage 나의 nft 조회", address);
    //const { userId } = req.cookies.login;
    console.log(address);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });

    const result_data = await nft.getMyNFTs(result_user.value.dataValues.id);
    if(result_data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_data.value}` });

    return res.status(200).json({
      data: { my_nft: result_data.value },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 9-4. 일반 회원 MyPage 에서 나의 정보 조회 (나의 작성 게시글)
exports.get_content = async (req, res, next) => {
  try {
    const address = req.params.address;
    console.log(address);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });
    const result_data = await post.getMyContents(result_user.value.dataValues.id);
    if(result_data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_data.value}` });

    return res.status(200).json({
      data: { my_contents: result_data.value },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 10. 운영자 MyPage 에서 정보 조회 (가입을 요청한 회원 정보 조회)
exports.get_admin_info = async (req, res, next) => {
  try {
    const { address, club_id } = req.params;
    console.log(address);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });

    if(result_user.value.dataValues.auth === 0)
      return res.status(404).json({ data: "fail error = 운영자가 아닙니다." });

    const result_data = await club.getAdminInfo(result_user.value.dataValues.id, club_id);
    if(result_data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_data.value}` });

    return res.status(200).json({
      data: { signup_list: result_data.value[0].ApplyUser },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 11. 운영자 MyPage 에서 가입 허용
exports.get_admin_allow = async (req, res, next) => {
  try {
    const { address, club_id } = req.params;
    //const { applyUserId } = req.body; // 가입허용 아이디

    if (!(address && club_id))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });
    console.log("가입허용", result_user.value, club_id, result_user.value.dataValues.id);

    if(result_user.value.dataValues.auth === 0)
      return res.status(404).json({ data: "fail error = 운영자가 아닙니다." });

    const result_data = await club.setAdminAllow(result_user.value.dataValues.id, club_id);
    if(result_data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_data.value}` });

    return res.status(200).json({
      data: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 19. 운영자 MyPage 에서 개설한 모든 클럽 조회 
exports.get_admin_club = async (req, res, next) => {
  try {
    const { address } = req.params;
    if (!address) return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });
     
    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_user.value}` });
    console.log("운영자 MyPage 에서 개설한 모든 클럽 조회", result_user.value.dataValues.id);
    const result_data = await club.getAdminAllClub(result_user.value.dataValues.id);
    if(result_data.msg !== "success")
      return res.status(404).json({ data: `fail error = ${result_data.value}` });
    
    return res.status(200).json({
        data: result_data.value
    });  
  }
  catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
}
