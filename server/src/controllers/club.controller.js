//const jwt = require("jsonwebtoken");
const contract = require("../process/contract.process");
const club = require("../services/club.service");
const post = require("../services/post.service");
const comment = require("../services/comment.service");
const user = require("../services/user.service");

// API 3. 모든 클럽 목록
exports.get_allclub = async (req, res, next) => {
    try {
        // 모든 클럽의 목록을 가져와서 클라이언트에 json 포멧으로 전송 하는 함수 구현 필요
        const result_data = await service.getAllclub();
///////////////////test code ////////////////
        const json_obj = {
            "title": "club title",
            "club_id": "1111",
            "create_at": "2022-11-23 13:34:55",
            "club_img_url": "ipfs://rrrrrrrr"
        }
        return res.status(200).json({
            "data": json_obj
          });
///////////////////test code ////////////////          
    }
    catch (err) {
        return res.status(404).json({
          "data": "fail"
        });
    }
}

// API 4. 클럽 게시글 목록
exports.get_index = async (req, res, next) => {
  try {
    const club_id = req.params.club_id;
    const category_id = req.params.category_id;
    if (!(club_id && category_id))
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    console.log(club_id, category_id);

    // 카테고리의 id에 따라 해당 클럽의 개시글 목록을 json 포멧으로 전송 하는 함수 구현 필요
    const result_data = await service.getContentIndex(club_id, category_id);

    ///////////////////test code ////////////////
    const list_obj = [
      {
        title: "post title",
        post_id: "3333333",
        content: "<글내용>",
        create_at: "2022-11-23 13:34:55",
        nickname: "<회원 nick name>",
      },
      {
        title: "post title",
        post_id: "3333333",
        content: "<글내용>",
        create_at: "2022-11-23 13:34:55",
        nickname: "<회원 nick name>",
      },
    ];

    return res.status(200).json({
      data: {
        club_img_uri: "ipfs://rrrrrrrr",
        list: list_obj,
      },
    });
    ///////////////////////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 5. 게시글 상세보기
exports.get_detail = async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    if (!post_id)
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    console.log(post_id);
    // post_id에 따라 게시글 의 내용을 json 포멧으로 전송 하는 함수 구현 필요
    const result_data = await service.getContentDetail(post_id);
    ///////////////////test code ////////////////
    const list_obj = [
      {
        content: "<댓글내용>",
        create_at: "2022-11-23 13:34:55",
        nickname: "<회원 nick name>",
      },
      {
        content: "<댓글내용>",
        create_at: "2022-11-23 13:34:55",
        nickname: "<회원 nick name>",
      },
    ];

    return res.status(200).json({
      data: {
        title: "post title",
        content: "<글내용>",
        create_at: "2022-11-23 13:34:55",
        nickname: "<회원 nick name>",
        like_num: "<좋아요 카운트>",
        comment: list_obj,
      },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
// API 6. 게시글 작성
exports.post_write = async (req, res, next) => {
  try {
    const { address, title, content, club_id, category_id } = req.body;
    console.log(address, title, content, club_id, category_id);
    if (!(address && title && content && club_id && category_id))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 회원이 작성한 게시글 정보를 DB에 insert 함수 구현 필요
    const result = await post.setPostWrite(
      address,
      title,
      content,
      club_id,
      category_id
    );

    if(result === "success") {
        // 회원 address로 보상 토큰 전송
        const contract_result = await contract.transmit_Token(address);
    }
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
// API 7. 댓글 작성
exports.post_comm_write = async (req, res, next) => {
  try {
    const { address, post_id, content, club_id, category_id } = req.body;
    console.log(address, post_id, content, club_id, category_id);
    if (!(address && title && content && club_id && category_id))
      return res.status(404).json({ data: "입력정보가 부족합니다" });

    // 회원이 댓글을 작성하고 토큰을 보상받는 함수 구현 필요
    const result = await comment.setCommentWrite(
      address,
      post_id,
      content,
      club_id,
      category_id
    );

    if(result === "success") {
        // 회원 address로 보상 토큰 전송
        const contract_result = await contract.transmit_Token(address);
    }
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
// API 8. 좋아요 반응 작성
exports.get_comm_like = async (req, res, next) => {
  try {
    const post_id = req.params.post_id;
    const address = req.params.address;
    console.log(address, post_id);
    if (!(post_id && address))
      return res.status(404).json({ data: "입력정보가 부족합니다" });
    
    // 좋아요 반응을 위한 Database 연동 함수 구현 필요
    const result = await user.setPostLike(address, post_id)// 회원이 좋아요를 클릭히고 토큰을 보상받는 함수 구현 필요 단.같은 post id에 같은 address가 중복으로 오면 다시 좋아요를 차감 하여 클라이언트에 전송
      
    ///////////////////test code ////////////////
    return res.status(200).json({
      data: { like_num: 555 },
    });
    ///////////////////test code ////////////////
  } catch (err) {
    return res.status(404).json({
      data: "fail",
    });
  }
};
