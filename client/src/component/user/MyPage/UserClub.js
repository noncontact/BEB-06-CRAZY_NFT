import {List} from "antd";
import { useSelector } from 'react-redux';
import { myClub } from "../../../api/my";
import React,{ useState,useEffect } from 'react';

const UserClub =()=>{
    const [clubs,setClubs]=useState([]);
    const {address}=useSelector((state) =>{
        return state.account;
      });
    useEffect(() => {

        const fetchData = async () => {
        const contents=await myClub(address);
        setClubs(contents.data.data.my_club);
        console.log(contents.data.data.my_club);
        };

        fetchData();
    }, []);
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    return (
        <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        
        dataSource={data}
        renderItem={(item) => <List.Item style={{border:"1px solid gray"}}>{item}</List.Item>}
        />
    );    
};
export default UserClub;