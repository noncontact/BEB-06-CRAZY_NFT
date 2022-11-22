import { useNavigate } from 'react-router-dom';
import { Menu,Input } from 'antd';
import React from 'react';
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
  getItem('LogIn', 'login'  ),
  getItem('SignUP', 'signup'  ),
  getItem('MyPage', 'mypage'  ),
  getItem('NFT', 'nft' )
];

const Navi =()=>{
    const navigate=useNavigate();
    const selectKey={
        login:()=>{
            navigate("/login");
        },
        signup:()=>{
            navigate("/signup");
        },
        mypage:()=>{
            navigate("/mypage");
        },
        nft:()=>{
            navigate("/nftalllist");
        }
    };
    const onSearch = (value) => console.log(value);
    const onMenu = (e) => {
        selectKey[e.key]();
    };
    return (
        <div>
            <div onClick={()=>navigate("/")} style={{float: "left",width: "120px",height: "31px",margin: "16px 24px 16px 0",background: "rgba(255, 255, 255, 0.3)"}} />
            
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