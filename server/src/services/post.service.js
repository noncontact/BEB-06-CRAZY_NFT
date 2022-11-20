const { db } = require("#src/models/index.js");
const { Forum, Post } = db;
const contract_proc = require("#src/process/contract.process");

// 카테고리에 따라 모든 작성글 목록 정보 가져오기
exports.getPostIndex = async (club_id, category_id) => {
  return await Forum.findAll({
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
};

// post_id 에 따른 작성글 내용 가져오기
exports.getPostDetail = async (post_id) => {
  return await Post.findOne({
    where: {
        id: post_id
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

// 좋아요 반응을 추가
exports.setPostLike = async (address, user_id, post_id) => {
  const user = await User.findOne({ 
    where: { id: user_id }
  });
  if (user) { 
    const checkFollow = await user.hasLikePost(parseInt(post_id, 10)); 
    // 존재할경우 삭제
    if(checkFollow){
      await user.removeLikePost(parseInt(post_id, 10));
    }else{
      await user.addLikePost(parseInt(post_id, 10));
    }
  }

  if (result !== "error") {
    // 회원에게 보상토큰을 전송하는 함수 구현 필요
    //const contract_result = contract_proc.transmit_Token(address);
  }
  
  return result;
};
