import { AppstoreOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { Menu } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
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
  getItem('전체글', 'all', <UserOutlined /> ),
  getItem('공지사항', 'notice',  <SolutionOutlined />),
  getItem('Q&A', 'qna', <AppstoreOutlined />, ),
  getItem('자유게시판', 'free', <AppstoreOutlined />, ),
  getItem('클럽활동', 'club', <AppstoreOutlined />, ),
  getItem('레어글', 'rare', <AppstoreOutlined />, ),
  getItem('슈퍼레어글', 'superrare', <AppstoreOutlined />, )
];

const Catagory =({selectCatagory})=>{
    const navigate=useNavigate();
    const onClick = (e) => {
      selectCatagory(e.key);
      navigate("/clubmain/socker/");
    };
    return (
      <>
      <Menu
        onClick={onClick}
        style={{
          background:"#9747FF",
          
        }}
        defaultSelectedKeys={['all']}
        mode="inline"
        items={items}
      />
      </>
    );
};
export default Catagory;