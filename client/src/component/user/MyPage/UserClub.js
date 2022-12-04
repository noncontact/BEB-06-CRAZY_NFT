import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Card, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { myClub } from "api/my";
const { Meta } = Card;

const UserClub = () => {
  // const [clubs, setClubs] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const contents = await myClub(address);

      // setClubs(contents.data.data.my_club);
      console.log(contents.data.data.my_club);
    };

    fetchData();
  }, [address]);
  const data = [
    {
      title: "TWICE 팬클럽",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "BTS 팬클럽",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "블랙핑크 팬클럽",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "뉴진스 팬클럽",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "르세라핌 팬클럽",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ];

  return (
    <>
      <List
        size="large"
        grid={{ column: 5 }}
        header={<h1>가입된 클럽</h1>}
        dataSource={data}
        renderItem={(item) => (
          <>
            <List.Item>
              <ClubCard hoverable cover={<img alt="club" src={item.img} />}>
                <Meta title={item.title} description="www.instagram.com" />
              </ClubCard>
            </List.Item>
          </>
        )}
      />
    </>
  ); //
};

const ClubCard = styled(Card)`
  border-radius: 20px;
`;
const MakeCard = styled(Card.Grid)`
  width: 20%;
  text-align: center;
  background-color: pink;
  border-radius: 30px;
  margin: 10px;
`;
const gridStyle = {
  width: "20%",
  textAlign: "center",
  backgroundColor: "pink",
  borderRadius: "30px",
};

export default UserClub;
