import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Input } from "antd";
import React from "react";
import { persistor } from "../../store/store";
const { Search } = Input;
function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items1 = [getItem("LogIn", "login"), getItem("SignUP", "signup")];
const items2 = [
  getItem("MyPage", "mypage"),
  getItem("NFT", "nft"),
  getItem("LogOut", "logout"),
];

const Navi = () => {
  const navigate = useNavigate();
  const { isLogin } = useSelector((state) => {
    return state.account;
  });
  // const { isLogin, address, profileurl, nickname } = useSelector((state) => {
  //   return state.account;
  // });
  const selectKey = {
    login: () => {
      navigate("/login");
    },
    signup: () => {
      navigate("/signup");
    },
    mypage: () => {
      navigate("/mypage");
    },
    nft: () => {
      navigate("/nftalllist");
    },
    logout: () => {
      persistor.purge();
      window.location.replace("/");
    },
  };
  const onSearch = (value) => console.log(value);
  const onMenu = (e) => {
    selectKey[e.key]();
  };
  return (
    <div>
      <div
        onClick={() => navigate("/")}
        style={{
          float: "left",
          width: "120px",
          height: "31px",
          margin: "16px 24px 16px 0",
          background: "rgba(255, 255, 255, 0.3)",
        }}
      ></div>

      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 600,
          float: "left",
          padding: "15px",
        }}
      />

      <Menu
        onClick={onMenu}
        style={{ display: "flex", justifyContent: "end" }}
        theme="dark"
        mode="horizontal"
        items={isLogin ? items2 : items1}
      />
    </div>
  );
};
export default Navi;
