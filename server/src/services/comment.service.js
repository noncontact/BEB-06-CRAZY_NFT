const { Comment, User} = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");
// 댓글 내용을 추가하는 쿼리
exports.setCommentWrite = async (content, PostId, UserId) => {
  try {
    await Comment.create({
      content,
      Commenter: UserId,
      PostId,
    });
    return return_function ("insert")
  }
  catch (err) {
    return return_err(err)
  }
};

// 댓글 내용 수정
exports.updateCommentWrite = async (comment_id, user_id, content) => {
  try {
    const data = await Comment.findOne({
      where: { id: comment_id, Commenter: user_id },
    });

    if(data !== null) {
      await data.update({
        //update 날짜는 자동으로 변경
        content,
      });
      return return_function ("update")
    }
    else
      return return_function (data)
  }
  catch (err) {
    return return_err(err)
  }
};

// 댓글 리스트 가져오기
exports.getCommentList = async (PostId) => {
  try {
    const result = await Comment.findAll({
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
    return return_function (result, false)
  }
  catch (err) {
    return return_err(err)
  }
};
