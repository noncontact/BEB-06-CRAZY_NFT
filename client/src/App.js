import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Login,SignUp,MyPage,ClubMaster,Main,ClubMain,NftAllList,NftMint } from "./pages";
import {Footer} from "./component";
import 'antd/dist/antd.min.css';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main  />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage   />} />
          <Route path="/clubmaster" element={<ClubMaster   />} />
          <Route path="/clubmain/*" element={<ClubMain />} />
         
          <Route path="/nftalllist/*" element={<NftAllList />} />
        
          <Route path="/nftmint" element={<NftMint />} />
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </div>
  );
}

export default App;
