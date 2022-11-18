const db_proc = require("../process/db.process");

exports.getUserData = async (address, password) => {
  //데이터베이스에 로그인 처리 함수 구현 필요
  const result = await db_proc.proc_signin(address, password);
  return result;
};

exports.createUser = async (profileurl, password, nickname, address) => {
  //데이터베이스에 회원가입 처리 함수 구현 필요
  const result = await db_proc.proc_signup(profileurl, password, nickname, address);
  return result;
};

// const getUserPost = async (userId) => {
//   const postList = await Post.findAll({
//     attributes: [
//       ["id", "postId"],
//       "title",
//       "content",
//       "img",
//       "createdAt",
//       "updatedAt",
//     ],
//     include: [
//       { model: User, attributes: ["email", "nickname", "profileurl"] },
//       {
//         model: PostLike,
//         // attributes: [[ sequelize.fn('COUNT', 'id'), 'postLike' ]],
//         include: [
//           { model: User, attributes: ["email", "nickname", "profileurl"] },
//         ],
//         order: [["id", "DESC"]],
//       },
//       {
//         model: Comment,
//         attributes: [
//           ["id", "commentId"],
//           "content",
//           "createdAt",
//           "updatedAt",
//           "commenter",
//           "postId",
//         ],
//         include: [
//           { model: User, attributes: ["email", "nickname", "profileurl"] },
//           {
//             model: CommentLike,
//             // attributes: [[ sequelize.fn('COUNT', 'id'), 'commentLike' ]],
//             include: [
//               { model: User, attributes: ["email", "nickname", "profileurl"] },
//             ],
//             order: [["id", "DESC"]],
//           },
//         ],
//         order: [["id", "DESC"]],
//       },
//     ],
//     where: { userId: userId },
//     order: [["id", "DESC"]],
//   });
//   return postList;
// };

// const updateUser = async (profileUrl, userId) => {
//   const update = await User.update(
//     {
//       profileurl: profileUrl,
//     },
//     {
//       where: {
//         id: userId,
//       },
//     }
//   );
//   return update;
// };