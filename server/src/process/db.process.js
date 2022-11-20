//const db = require("../models/index");
//const { User } = db;

// const { db } = require("#src/models/index.js");
// const { User, Post, PostLike, Comment, CommentLike } = db;

exports.query_signin = async(account, password, nickname, address)=> {
  /*  
  return await User.findOne({
  
    where: { address, password },
    include: [
      { model: User, attributes: ["id", "email", "nickname"], as: "Followers" },
      {
        model: User,
        attributes: ["id", "email", "nickname"],
        as: "Followings",
      },
    ],
  });
  */
    return; 
}

exports.query_signup = async(profileurl, password, nickname, address)=> {

    return; 
}

exports.query_Allclub = async () => {

}

exports.query_ContentIndex = async (club_id, category_id) =>{

}

exports.query_ContentWrite = async(address, title, content, club_id, category_id)=>{

}

exports.query_CommentWrite = async(address, post_id, content, club_id, category_id)=>{

}

exports.query_MyDetail = async (address) =>{

}

exports.query_MyContents = async (address) =>{

}

exports.query_MyNFTs = async (address) =>{

}

exports.query_MyClubs = async (address) =>{

}

exports.query_AdminInfo = async(address) =>{
    
}