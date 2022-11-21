const { Comment } = require("#src/models/index.js");

// 댓글 내용을 추가하는 쿼리 
exports.setCommentWrite = async (
  address,
  post_id,
  content,
  user_id,
  club_id,
  category_id
) => { 
  const result = await Comment.create({
    content,
    Commenter: user_id,
    PostId: post_id,
  });
  if (result !== "error") {
    // 회원에게 보상토큰을 전송하는 함수 구현 필요
    //const contract_result = contract_proc.transmit_Token(address);
  }

  return result;
};

// 댓글 내용 수정
exports.updateCommentWrite = async (comment_id, user_id, content) => {
    const data = await Comment.findOne({
      where: { id: comment_id, Commenter: user_id },
    });
    return await data.update({
      //update 날짜는 자동으로 변경
      content,
    });
  };

// 댓글 리스트 가져오기
exports.getCommentList = async (post_id) => {
  const result = await Comment.findAll({ 
    where: { post_id },
    order: [["id", "DESC"]],
  });
  return result;
};
