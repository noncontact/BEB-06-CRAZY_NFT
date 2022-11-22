// const { db, sequelize } = require("@src/models/index.js");
// const { User, Comment, CommentLike } = db;

// const getCommentList = async (postId) => {
//   const result = await Comment.findAll({
//     attributes: [
//       ["id", "commentId"],
//       "content",
//       "createdAt",
//       "updatedAt",
//       "commenter",
//       "postId",
//     ],
//     include: [
//       { model: User, attributes: ["email", "nickname", "profileurl"] },
//       {
//         model: CommentLike,
//         // attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
//         include: [
//           { model: User, attributes: ["email", "nickname", "profileurl"] },
//         ],
//         order: [["id", "DESC"]],
//       },
//     ],
//     where: { postId },
//     order: [["id", "DESC"]],
//   });
//   return result;
// };

// const createComment = async (content, postId, id) => {
//   await Comment.create({
//     content,
//     commenter: id, //작성자
//     postId, //게시글 위치 (삭제된 게시글이면 에러발생)
//   });
// };

// const updateComment = async (commentId, id, content) => {
//   const data = await Comment.findOne({
//     where: { id: commentId, commenter: id },
//   });
//   await data.update({
//     //update 날짜는 자동으로 변경
//     content,
//   });
// };

// const deleteComment = async (commentId, id) => {
//   const data = await Comment.findOne({
//     where: { id: commentId, commenter: id },
//   });
//   data.destroy();
// };

// const countComment = async (userId, commentId) => {
//   const result = {};
//   const isLiked = await CommentLike.findAll({
//     where: { LikeUserId: userId, LikeCommentId: commentId },
//   });
//   if (isLiked.length === 0) {
//     await CommentLike.create({
//       LikeUserId: userId,
//       LikeCommentId: commentId,
//     });
//     const count = await CommentLike.findAll({
//       attributes: [[sequelize.fn("COUNT", "id"), "commentLike"]],
//       where: { LikeCommentId: commentId },
//     });
//     result.count = count;
//     result.status = true;
//   } else {
//     await CommentLike.destroy({
//       where: { LikeUserId: userId, LikeCommentId: commentId },
//     });
//     const count = await CommentLike.findAll({
//       attributes: [[sequelize.fn("COUNT", "id"), "commentLike"]],
//       where: { LikeCommentId: commentId },
//     });
//     result.count = count;
//     result.status = false;
//   }
//   return result;
// };

// module.exports = {
//   getCommentList,
//   createComment,
//   updateComment,
//   deleteComment,
//   countComment,
// };
