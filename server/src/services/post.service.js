const { db } = require("#src/models/index.js");
const { Post } = db;

// 나의 작성글 목록 가져오기
exports.getMyContents = async (user_id, address) => {
  // 각 클럽별로 글 나의 작성글 구현 필요
  return await Post.findAll({
    where: { UserId: user_id },
  });
};

// post_id 에 따른 작성글 내용 가져오기
exports.getPostDetail = async (post_id) => {
  return await Post.findOne({
    where: {
      id: post_id,
    },
    order: [["createdAt", "DESC"]],
  });
};

// 작성글 내용을 추가
exports.setPostWrite = async (
  address,
  title,
  content,
  img,
  club_id,
  category_id
) => {
  // 1. 클럽id로 카테고리 찾기 없으면 생성
  //   const find = await findCreateFind({

  //   })
  // 2. 카테고리 id로 게시글 생성
  const result = await Post.create({
    title,
    content,
    img,
    category_id,
  });
  if (result !== "error") {
    // 회원에게 보상토큰을 전송하는 함수 구현 필요
    //const contract_result = contract_proc.transmit_Token(address);
  }
  return result;
};

