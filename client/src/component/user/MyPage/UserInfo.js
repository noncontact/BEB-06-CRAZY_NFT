import { Descriptions } from "antd";
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { myDetail } from "api/my";
const UserInfo = () => {
  const [info, setInfo] = useState({
    id: 0,
    nickname: "test",
    profileurl: "http://",
    address: "0x0315eebae95017773c65e55fe83d4ef260de0f0d",
    createdAt: "2022-11-24T16:59:25.000Z",
  });
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const info = await myDetail(address);
      setInfo(info.data.data.my_info);
    };

    fetchData();
  }, []);
  return (
    <Descriptions title="User Info">
      <Descriptions.Item label="UserName">{info.nickname}</Descriptions.Item>
      <Descriptions.Item label="Address">{info.address}</Descriptions.Item>
      <Descriptions.Item label="CreatedAt">{info.createdAt}</Descriptions.Item>
      <Descriptions.Item label="profileurl">
        {info.profileurl}
      </Descriptions.Item>
    </Descriptions>
  );
};
export default UserInfo;
