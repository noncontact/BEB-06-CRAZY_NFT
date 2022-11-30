const { Forum, Post } = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");
// 카테고리에 따라 모든 작성글 목록 정보 가져오기
exports.getPostIndex = async (club_id, category_id) => {
  try {
    const result =  await Forum.findAll({
      where: {
        id: club_id,
      },
      include: [
        {
          model: Post,
          where: { id: category_id },
          order: [["createdAt", "DESC"]],
          required: false, // left outer join이 되게 한다.
        },
      ],
    });
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
};