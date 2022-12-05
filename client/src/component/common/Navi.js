import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Menu, Input } from "antd";
import React from "react";
import { persistor } from "store/store";
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
const items2 = [getItem("MyPage", "mypage"), getItem("LogOut", "logout")];

const Navi = ({ search }) => {
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
    logout: () => {
      persistor.purge();
      window.location.replace("/");
    },
  };
  const onSearch = (value) => {
    search(value);
  };
  const onMenu = (e) => {
    selectKey[e.key]();
  };
  return (
    <div className="navi">
      <img
        alt="site_name"
        src="/crazyNFT.png"
        onClick={() => navigate("/")}
        className="logo"
      ></img>
      <Search
        placeholder="input search text"
        onSearch={onSearch}
        style={{
          width: 600,
          padding: "15px",
        }}
      />

      <Menu
        onClick={onMenu}
        theme="dark"
        mode="horizontal"
        style={{
          minWidth: 0,
          flex: "auto",
          display: "flex",
          justifyContent: "right",
        }}
        items={isLogin ? items2 : items1}
      />
    </div>
  );
};
export default Navi;
