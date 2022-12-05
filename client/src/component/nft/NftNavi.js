import React from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Input } from "antd";
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
const items = [getItem("DEPLOY", "deploy"), getItem("LogOut", "logout")];
const Navi = ({ search }) => {
  const navigate = useNavigate();
  const selectKey = {
    deploy: () => {
      navigate("nftmint");
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
          float: "left",
          padding: "15px",
        }}
      />

      <Menu
        onClick={onMenu}
        style={{
          minWidth: 0,
          flex: "auto",
          display: "flex",
          justifyContent: "right",
        }}
        theme="dark"
        mode="horizontal"
        items={items}
      />
    </div>
  );
};
export default Navi;
