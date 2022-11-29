const { Op } = require("sequelize");
const { Post, User } = require("#src/models/index.js");

// 나의 작성글 목록 가져오기
exports.getMyContents = async (UserId) => {
  return await Post.findAll({
    where: { UserId },
  });
};

exports.getPostLike = async (PostId) => {
  return await Post.count({
    attributes: [], 
    where: {
      id: PostId,
    },
    include: [
      {
        model: User,
        attributes: ["nickname", "profileurl", "createdAt"],
        as: "LikeUser",
        through: {
          attributes: [],
        },
      },
    ],
  });
};

// PostId 에 따른 작성글 상세내용 가져오기
exports.getContentDetail = async (PostId) => {
  return await Post.findOne({
    attributes: ["id", "title", "content","img", "createdAt"],
    where: {
      id: PostId,
    },
    include: [
      {
        attributes: ["nickname", "profileurl", "createdAt"],
        model: User,
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

// PostId 좋아요 반응을 추가
exports.setPostLike = async (UserId, PostId) => {
  // UserId => 회원 지갑 주소 입니다.
  const post = await Post.findOne({
    where: { id: PostId },
  });
  if (post) {
    const check = await post.hasLikeUser(parseInt(UserId, 10));
    // 존재할경우 삭제
    if (check) {
      await post.removeLikeUser(parseInt(UserId, 10));
    } else {
      await post.addLikeUser(parseInt(UserId, 10));
    }
  }
  //카운터 구현
  return post.countLikeUser();
};

// category id에 따라 해당 클럽의 게시글 목록
exports.getContentIndex = async (clubId, categoryId) => {
  // 0일경우 전체글,
  let category =
    parseInt(categoryId, 10) === 0 ? [1, 2, 3, 4, 5] : [categoryId];

  return await Post.findAll({
    attributes: ["id", "title", "content", "img", "createdAt"],
    include: [
      {
        model: User,
        attributes: ["id", "nickname", "profileurl"],
      },
    ],
    where: { ForumId: { [Op.in]: category } },
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
