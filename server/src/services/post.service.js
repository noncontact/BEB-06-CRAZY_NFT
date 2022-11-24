const { Post } = require("#src/models/index.js");

// 나의 작성글 목록 가져오기
exports.getMyContents = async (UserId) => {
  return await Post.findAll({
    where: { UserId },
  });
};

// postId 에 따른 작성글 내용 가져오기
exports.getPostDetail = async (postId) => {
  return await Post.findOne({
    where: {
      id: postId,
    },
    order: [["createdAt", "DESC"]],
  });
};

// 작성글 내용을 추가
exports.setPostWrite = async (
  UserId,
  title,
  content,
  img,
  clubId,
  categoryId
) => {
  // 1. 클럽id로 카테고리 찾기 없으면 생성
  //   const find = await findCreateFind({

  //   })
  // 2. 카테고리 id로 게시글 생성
  await Post.create({
    UserId,
    title,
    content,
    img,
    ForumId: categoryId,
  });
  return "success";
};

