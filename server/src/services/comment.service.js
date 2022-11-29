const { Comment, User } = require("#src/models/index.js");

// 댓글 내용을 추가하는 쿼리
exports.setCommentWrite = async (content, PostId, UserId) => {
  await Comment.create({
    content,
    Commenter: UserId,
    PostId,
  });

  return "success";
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
exports.getCommentList = async (PostId) => {
  return await Comment.findAll({
    where: { PostId },
    attributes: ["content", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["nickname", "profileurl"],
      },
    ],
    order: [["createdAt", "ASC"]],
  });
};
