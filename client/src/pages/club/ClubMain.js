import React from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ArticleDetail, CreateArticle } from "../../pages";
import { Catagory, Articles } from "../../component";
import "../../style/club.css"
import { useSelector } from "react-redux";

const ClubMain = () => {
  const navigate=useNavigate();
  const {clubImg,clubName} = useSelector((state) => {
    return state.club;
  });
  const handleImgError = (e)=>{
    e.target.src ='/No-image-found.jpg'
  }
  return (
    <div className="main">
      <div className="head"><img alt="site_name" src="/crazyNFT.png"  onClick={()=>navigate('/')} className="head-text"></img></div>
      
      <div className="front">
        <div className="front-text">{clubName}</div>
        <img alt="club_front" src={clubImg} onError={handleImgError} className="front-image"></img>
        
      </div>
        <div className="row">
        <div className="side">
          <Catagory />
        </div>
        <div className="content">
          <Routes>
            <Route path="*" element={<Articles />} />
            <Route path="articledetail/:id" element={<ArticleDetail />} />
            <Route path="createarticle" element={<CreateArticle />} />
          </Routes>
        </div>
        </div>
    </div>
  );
};
export default ClubMain;
