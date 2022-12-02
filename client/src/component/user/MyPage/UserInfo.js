import { Image, Descriptions } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myDetail } from "api/my";
import { getBalance, getKIP7 } from "api/klaytn";
import styled from "styled-components";
import { AntDesignOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
const App = ({ url }) => (
  <Avatar
    size={{
      xs: 100,
      sm: 100,
      md: 100,
      lg: 100,
      xl: 200,
      xxl: 250,
    }}
    src={url}
    icon={<AntDesignOutlined />}
  />
);

const UserInfo = () => {
  const [info, setInfo] = useState({
    id: 0,
    nickname: "non",
    profileurl: "http://",
    address: "",
    createdAt: "",
    token: "",
  });

  const { address, ca } = useSelector((state) => {
    return state.account;
  });

  useEffect(() => {
    const fetchData = async () => {
      const info = await myDetail(address);
      const myInfo = info.data.data.my_info;
      const klayBalance = await getBalance(address);
      console.log(await getKIP7(ca));
      const KIP7 = await getKIP7(ca);
      setInfo({
        ...myInfo,
        name: KIP7.name,
        symbol: KIP7.symbol,
        totalSupply: KIP7.totalSupply,
        klayBalance,
      });
    };

    fetchData();
  }, []);
  return (
    <>
      <App url={info.profileurl} />
      <Descriptions bordered>
        <Descriptions.Item label="닉네임">{info.nickname}</Descriptions.Item>
        <Descriptions.Item label="Address">{info.address}</Descriptions.Item>
        <Descriptions.Item label="클레이 갯수">
          Klay: {info.klayBalance}
        </Descriptions.Item>
        <Descriptions.Item label="보유 토큰">
          토큰명 : {info.name}
          <br />
          심볼 : {info.symbol}
          <br />
          총발행량 : {info.totalSupply}
        </Descriptions.Item>
        <Descriptions.Item label="생성 날짜">
          {info.createdAt}
        </Descriptions.Item>
      </Descriptions>
    </>
  );
};
export default UserInfo;
