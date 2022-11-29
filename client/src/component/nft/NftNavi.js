import React from 'react';
import { useNavigate } from "react-router-dom";
import { Menu,Input } from 'antd';
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
  const items = [
    getItem("DEPLOY", "deploy"),
    getItem("LogOut", "logout"),
  ];
const Navi =()=>{
    const onSearch = (value) => console.log(value);
    const navigate = useNavigate();
    const selectKey = {
        deploy: () => {
          navigate("/nftmint");
        },
        logout: () => {
          persistor.purge();
          window.location.replace("/");
        },
    };
    const onMenu = (e) => {
      selectKey[e.key]();
    };
    return (
        <div>
            <div style={{float: "left",width: "120px",height: "31px",margin: "16px 24px 16px 0",background: "rgba(255, 255, 255, 0.3)"}} />
            
            <Search
            placeholder="input search text"
            onSearch={onSearch}
            style={{
                width: 600,
                float: "left",
                padding:"15px"
            }}
            />
            
            <Menu
                onClick={onMenu}
                style={{display: "flex",justifyContent:"end"}}
                theme='dark'
                mode="horizontal"
                items={items}
            />
        </div>
    );
};
export default Navi;