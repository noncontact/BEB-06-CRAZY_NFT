const { Op } = require("sequelize");
const { Post, User} = require("#src/models/index.js");
const { return_function, return_err } = require("#src/process/error.process.js");
// 나의 작성글 목록 가져오기
exports.getMyContents = async (UserId) => {
  try {
    const result = await Post.findAll({
      where: { UserId },
    });
    return return_function (result, false)
  }
  catch (err) {
    return return_err(err)
  }
};

exports.getPostLike = async (PostId) => {
  try {
    const result = await Post.count({
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
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
};

// PostId 에 따른 작성글 상세내용 가져오기
exports.getContentDetail = async (PostId) => {
  try {
    const result = await Post.findOne({
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
    return return_function (result)
  }
  catch (err) {
    return return_err(err)
  }
};

// PostId 좋아요 반응을 추가
exports.setPostLike = async (UserId, PostId) => {
  // UserId => 회원 지갑 주소 입니다.
  try {
    const post = await Post.findOne({
      where: { id: PostId },
    });
    if (post !== null) {
      const check = await post.hasLikeUser(parseInt(UserId, 10));
      // 존재할경우 삭제
      if (check) {
        await post.removeLikeUser(parseInt(UserId, 10));
      } else {
        await post.addLikeUser(parseInt(UserId, 10));
      }
          //카운터 구현
      const count = await post.countLikeUser();    
      return return_function (count)
    }
    return return_function (post)
  }
  catch (err) {
    return return_err(err)
  }
};

// category id에 따라 해당 클럽의 게시글 목록
exports.getContentIndex = async (ClubId, categoryId) => {
  // 0일경우 전체글,
  try {
    let category =
      parseInt(categoryId, 10) === 0 ? [1, 2, 3, 4, 5] : [categoryId];

    const result = await Post.findAll({
      attributes: ["id", "title", "content", "img", "createdAt"],
      include: [
        {
          model: User,
          attributes: ["id", "nickname", "profileurl"],
        },
      ],
      where: { ForumId: { [Op.in]: category },  ClubId},
    });
    return return_function (result, false)
  }
  catch (err) {
    return return_err(err)
  }
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
  try {
    await Post.create({
      UserId,
      title,
      content,
      img,
      ForumId: categoryId,
      ClubId : clubId
    });
    
    return return_function ("insert")
  }
  catch (err) {
    return return_err(err)
  }
};
