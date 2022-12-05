import {
  AppstoreOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { useNavigate } from "react-router-dom";

function getItem(label, key, icon, children, type) {
  return {
    key,
    icon,
    children,
    label,
    type,
  };
}
const items = [
  getItem("내 정보", "info", <UserOutlined />),
  getItem("나의 글", "articles", <SolutionOutlined />),
  getItem("나의 클럽", "club", <SolutionOutlined />),
  getItem("나의 NFT", "nfts", <AppstoreOutlined />),
  getItem("클럽 가입요청 확인", "entry", <AppstoreOutlined />),
];

const UserMenu = ({ selectMenu }) => {
  const navigate = useNavigate();
  const onClick = (e) => {
    selectMenu(e.key);
  };
  return (
    <>
      <img 
      alt="site_name" 
      src="/crazyNFT.png"  
      onClick={()=>navigate('/')}
      style={{
        float: "left",
        width: "120px",
        height: "31px",
        margin: "16px 24px 16px 0",
        
      }}
      ></img>
      <Menu
        onClick={onClick}
        style={{
          background: "white",
        }}
        defaultSelectedKeys={["info"]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default UserMenu;
