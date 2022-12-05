import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Login,
  SignUp,
  MyPage,
  ClubMaster,
  Main,
  ClubMain,
  NftAllList,
  ErrorPage,
  CreateClub,
} from "./pages";
import { Footer } from "./component";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mypage" element={<MyPage />} />
          <Route path="/clubmaster" element={<ClubMaster />} />
          <Route path="/clubmain/:name/*" element={<ClubMain />} />
          <Route path="/createclub" element={<CreateClub />} />
          <Route path="/nftmint" element={<NftMint />} />
          <Route path="/nftalllist/*" element={<NftAllList />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
