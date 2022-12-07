import {
  AppstoreOutlined,
  UserOutlined,
  SolutionOutlined,
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
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
  getItem("클럽 가입 허용", "entry", <AppstoreOutlined />),
];

const AdminMenu = ({ selectMenu }) => {
  const onClick = (e) => {
    selectMenu(e.key);
  };
  return (
    <>
      <div
        style={{
          float: "left",
          width: "120px",
          height: "31px",
          margin: "16px 24px 16px 0",
          background: "rgba(255, 255, 255, 0.3)",
        }}
      />
      <Menu
        onClick={onClick}
        style={{
          background: "#9747FF",
        }}
        defaultSelectedKeys={["info"]}
        mode="inline"
        items={items}
      />
    </>
  );
};
export default AdminMenu;
