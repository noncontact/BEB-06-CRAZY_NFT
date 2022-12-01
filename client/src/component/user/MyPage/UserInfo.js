import { Descriptions } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myDetail } from "../../../api/my";
import Caver from'caver-js';
const caver = new Caver('https://api.baobab.klaytn.net:8651/');

const UserInfo = () => {
  const [info, setInfo] = useState({
    id: 0,
    nickname: "test",
    profileurl: "http://",
    address: "0x0315eebae95017773c65e55fe83d4ef260de0f0d",
    createdAt: "2022-11-24T16:59:25.000Z",
    token:""
  });
  const { address,ca } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const info = await myDetail(address);
      const myInfo=info.data.data.my_info;
      console.log(ca);
      const kip7Instance =new caver.klay.KIP7(ca);
      
      var balance=await kip7Instance.balanceOf(address);
      console.log(balance.toNumber());
      setInfo({...myInfo,token:balance.toNumber()});
    };

    fetchData();
  }, []);
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">{info.nickname}</Descriptions.Item>
      <Descriptions.Item label="Address">{info.address}</Descriptions.Item>
      <Descriptions.Item label="CreatedAt">{info.createdAt}</Descriptions.Item>
      <Descriptions.Item label="token">{info.token}</Descriptions.Item>
      <Descriptions.Item label="profileurl">
        {info.profileurl}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default UserInfo;
