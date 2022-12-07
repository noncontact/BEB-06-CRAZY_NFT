const contract = require("../process/contract.process");
const { club, post, comment, user } = require("#src/services/index");

// ✅ API 3. 모든 클럽 목록
exports.get_allclub = async (req, res, next) => {
  try {
    // 모든 클럽의 목록을 가져와서 클라이언트에 json 포멧으로 전송 하는 함수 구현 필요
    const result_data = await club.getAllClub();
    console.log(result_data.value)
    if(result_data.msg === "success") {
      return res.status(200).json({
        data: result_data.value,
      });
    }
    else {
      return res.status(404).json({
        data: `fail error = ${result_data.value}`,
      });
    }

  } catch (err) {
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 4. 클럽 게시글 목록
exports.get_index = async (req, res, next) => {
  try {
    const { club_id, category_id } = req.params;
    if (!(club_id && category_id))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });
    console.log(club_id, category_id);

    const result_data = await post.getContentIndex(club_id, category_id);
    if(result_data.msg === "success") {
      return res.status(200).json({
        data: result_data.value,
      });
    }
    else {
      return res.status(404).json({
        data: `fail error = ${result_data.value}`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};
// ✅ API 5. 게시글 상세보기
exports.get_detail = async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    if (!post_id)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });
    console.log(post_id);

    const result_post = await post.getContentDetail(post_id);
    if (result_post.msg !== "success"){
      return res.status(404).json({
        data: `fail error = ${result_post.value}`,
      });
    }
    const result_comment = await comment.getCommentList(post_id);
    let comment_data;
    if (result_comment.msg !== "success")
      comment_data = [];
    else 
      comment_data = result_comment.value;

    const result_postLike = await post.getPostLike(post_id);

    return res.status(200).json({
      data: {
        id: result_post.value.dataValues.id,
        title: result_post.value.dataValues.title,
        content: result_post.value.dataValues.content,
        img: result_post.value.dataValues.img,
        createdAt: result_post.value.dataValues.createdAt,
        user: result_post.value.dataValues.User,
        comment: comment_data,
        like_num: result_postLike.value
      },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 6. 게시글 작성
exports.post_write = async (req, res, next) => {
  try {
    const { address, title, content, img, club_id, category_id } = req.body;
    console.log(address, title, content, club_id, category_id);
    if (!(address && title && content && club_id && category_id))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    console.log("post write id: ", result_user.value.dataValues.id)
    if (result_user.msg !== "success"){
      return res.status(404).json({
        data: `fail error = ${result_user.value}`,
      });
    }

    const result = await post.setPostWrite(
      result_user.value.dataValues.id,
      title,
      content,
      img,
      club_id,
      category_id
    );

    if (result.msg === "success") {
      // 회원 address로 보상 토큰 전송
      const contract_result = await contract.transmit_Token(address);
      if (contract_result.msg === "success") {
        return res.status(200).json({
          data: { tx_hash: contract_result.value },
        });
      } else {
        return res.status(404).json({
          data: `fail error = ${contract_result.value}`,
        });
      }
    }
    else {
      return res.status(404).json({
        data: `fail error = ${result.value}`,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 7. 댓글 작성
exports.post_comm_write = async (req, res, next) => {
  try {
    const { address, post_id, content } = req.body;
    console.log(address, post_id, content);
    if (!(address && post_id && content))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if (result_user.msg !== "success"){
      return res.status(404).json({
        data: `fail error = ${result_user.value}`,
      });
    }
    const result = await comment.setCommentWrite(content, post_id, result_user.value.dataValues.id);
    if (result.msg === "success") {
      // 회원 address로 보상 토큰 전송
      const contract_result = await contract.transmit_Token(address);
      if (contract_result.msg !== "success"){
        return res.status(404).json({
          data: `fail error = ${contract_result.value}`,
        });
      }
      return res.status(200).json({
        data: "success",
      });
    }

    return res.status(404).json({
      data: `fail error = ${result.value}`,
    });

  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ API 8. 좋아요 반응 작성
exports.get_comm_like = async (req, res, next) => {
  try {
    const { address, post_id } = req.params;
    console.log(address, post_id);
    if (!(post_id && address))
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success")
      return res.status(404).json({
        data: `fail error = ${result_user.value}`,
      });

    // 회원이 좋아요를 클릭히고 토큰을 보상받는 함수 구현 필요
    // 단.같은 post id에 같은 address가 중복으로 오면 다시 좋아요를 차감 하여 클라이언트에 전송
    const result = await post.setPostLike(result_user.value.dataValues.id, post_id);
    console.log(result)
    if (result.msg !== "success"){
      return res.status(404).json({
        data: `fail error = ${result.value}`,
      });
    }
    return res.status(200).json({
      data: { like_num: result.value },
    });
  } catch (err) {
    console.log(err);
    return res.status(404).json({
      data: `fail error = ${err}`,
    });
  }
};

// ✅ advance API 9. 클럽 생성
exports.post_make_club = async (req, res, next) => {
  try {
    const { address, title, img } = req.body;
    console.log(" 클럽 생성 ", address, title, img);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if(result_user.msg !== "success") {
      return res.status(404).json({
        data: `fail error = ${result_user.value}`
      });
    }

    const result = await club.getClub(result_user.value.dataValues.id, title);
    console.log(result)
    if(result.msg === "success") {
      return res.status(404).json({
        data: "fail error = 이미 등록된 클럽입니다.",
      });
    }

    const result_data = await club.createClub(result_user.value.dataValues.id, title, img);
    if(result_data.msg !== "success") {
      return res.status(404).json({
        data: `fail error = ${result_data.value}`
      });
    }

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

// advance API 10. 카테고리 생성
exports.post_make_category = async (req, res, next) => {
  try {
    const { address, title, club_id, depth } = req.body;
    console.log(address, title, img);
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    //const { id } = await user.getUserId(address);

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

// ✅ API 16. 클럽 가입신청
exports.post_apply = async function (req, res, next) {
  try {
    const { address, club_id } = req.body;
    console.log(address, club_id)
    if (!address)
      return res
        .status(404)
        .json({ data: "fail error = 입력정보가 부족합니다" });

    const result_user = await user.getUserId(address);
    if (result_user.msg !== "success")
      return res.status(404).json({
        data: `fail error = ${result_user.value}`
    });

    //const react_chk = await club.getClubUser(result_user.value.dataValues.id, club_id);
    //console.log(react_chk.value.dataValues.use);
    // if (react_chk.msg === "success" && react_chk.value.dataValues.use)
    //   return res.status(404).json({
    //     data: "fail error = 이미 가입이된 클럽입니다."
    //   });

    const result = await user.setUserClub(result_user.value.dataValues.id, club_id);
    if (result.msg !== "success")
      return res.status(404).json({
        data: `fail error = ${result.value}`
      });

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
