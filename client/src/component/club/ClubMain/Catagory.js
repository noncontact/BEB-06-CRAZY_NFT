
import { AppstoreOutlined, UserOutlined, SolutionOutlined } from '@ant-design/icons';
import { Button, Menu,message } from 'antd';
import { useNavigate } from 'react-router-dom';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { clubSignup } from '../../../api/club';

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
  getItem("전체글", "all", <UserOutlined />),
  getItem("공지사항", "notice", <SolutionOutlined />),
  getItem("Q&A", "qna", <AppstoreOutlined />),
  getItem("자유게시판", "free", <AppstoreOutlined />),
  getItem("클럽활동", "club", <AppstoreOutlined />),
  getItem("레어글", "rare", <AppstoreOutlined />),
  getItem("슈퍼레어글", "superrare", <AppstoreOutlined />),
];

const cataId = {
  all: 0,
  notice: 1,
  qna: 2,
  free: 3,
  club: 4,
  rare: 5,
  superrare: 6,
}
const Catagory =()=>{
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const {clubName,clubId,catagory}=useSelector((state) =>{
      return state.club;
    });
    const address=useSelector((state) =>{
      return state.account.address;
    });
    const entry=async()=>{
      try {
        await clubSignup({
          address:address,
          club_id:clubId
        });
        message.success("가입신청을 하였습니다.");
      } catch (error) {
        message.error("가입신청에 실패 하였습니다.");
      }
      
    }
    const onClick = (e) => {
      
      dispatch({type:"clubSlice/selectCatagory",payload:{catagory:e.key,catagoryId:cataId[e.key]}});
      navigate(`/clubmain/${clubName}`);
    };
    return (
      <>
      <Button onClick={entry}>가입신청</Button>
      <Menu
        onClick={onClick}
        style={{
          background: "#9747FF",
        }}

        defaultSelectedKeys={[catagory]}

        mode="inline"
        items={items}
      />
    </>
  );
};
export default Catagory;
