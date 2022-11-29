const contract = require("../process/contract.process");
const club = require("../services/club.service");
const post = require("../services/post.service");
const comment = require("../services/comment.service");
const user = require("../services/user.service");

// ✅ API 3. 모든 클럽 목록
exports.get_allclub = async (req, res, next) => {
  try {
    // 모든 클럽의 목록을 가져와서 클라이언트에 json 포멧으로 전송 하는 함수 구현 필요
    const result_data = await club.getAllClub();

    return res.status(200).json({
      data: result_data,
    });
  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ API 4. 클럽 게시글 목록
exports.get_index = async (req, res, next) => {
  try {
    const { club_id, category_id } = req.params;
    if (!(club_id && category_id))
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });
    console.log(club_id, category_id);

    const result_data = await post.getContentIndex(club_id, category_id);

    return res.status(200).json({
      data: result_data,
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};
// ✅ API 5. 게시글 상세보기
exports.get_detail = async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    if (!post_id)
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });
    console.log(post_id);

    const result_post = await post.getContentDetail(post_id);
    const result_comment = await comment.getCommentList(post_id);

    return res.status(200).json({
      data: { result_post, result_comment },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ API 6. 게시글 작성
exports.post_write = async (req, res, next) => {
  try {
    const { address, title, content, club_id, category_id } = req.body;
    console.log(address, title, content, club_id, category_id);
    if (!(address && title && content && club_id && category_id))
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);
    const result = await post.setPostWrite(
      id,
      title,
      content,
      club_id,
      category_id
    );

    if (result === "success") {
      // 회원 address로 보상 토큰 전송
      const contract_result = await contract.transmit_Token(address);
      if(contract_result.msg === "success") {
        return res.status(200).json({
          data: { tx_hash:contract_result.value }
        });
      }
      else {
        return res.status(404).json({
          data: `fail error = ${contract_result.value}`
        });
      }
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ API 7. 댓글 작성
exports.post_comm_write = async (req, res, next) => {
  try {
    const { address, post_id, content } = req.body;
    console.log(address, post_id, content);
    if (!(address && post_id && content))
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);
    const result = await comment.setCommentWrite(content, post_id, id);

    if (result === "success") {
      // 회원 address로 보상 토큰 전송
      //const contract_result = await contract.transmit_Token(address);
    }
    return res.status(200).json({
      data: "success",
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ API 8. 좋아요 반응 작성
exports.get_comm_like = async (req, res, next) => {
  try {
    const { address, post_id } = req.params;
    console.log(address, post_id);
    if (!(post_id && address))
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);
    if (!id) return res.status(404).json({ data: "fail error = 없는 유저입니다." });
    const result = await post.setPostLike(id, post_id);

    // 회원이 좋아요를 클릭히고 토큰을 보상받는 함수 구현 필요
    // 단.같은 post id에 같은 address가 중복으로 오면 다시 좋아요를 차감 하여 클라이언트에 전송

    return res.status(200).json({
      data: { like_num: result },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ advance API 9. 클럽 생성
exports.post_make_club = async (req, res, next) => {
  try {
    const { address, title, img } = req.body;
    console.log(address, title, img);
    if (!address)
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);
    await club.createClub(id, title, img);
    return res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// advance API 10. 카테고리 생성
exports.post_make_category = async (req, res, next) => {
  try {
    const { address, title, club_id, depth } = req.body;
    console.log(address, title, img);
    if (!address)
      return res.status(404).json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);

    return res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      data: `fail error = ${err}`
    });
  }
};

// ✅ API 16. 클럽 가입신청
exports.post_apply = async function (req, res, next) {
  try {
    const { address, club_id } = req.params;
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const { id } = await user.getUserId(address);
    if (!id)
      return res.status(404).json({ data: "fail error = 없는 유저입니다." });

    await user.setUserClub(id, club_id);
    console.log("MyPage나의 정보조회", id, club_id);
    return res.status(200).json({
      data: "success",
    });
  } catch (error) {
    console.log(error);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};
