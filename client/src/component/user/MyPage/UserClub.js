import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Card, List } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import styled from "styled-components";
import { myClub } from "api/my";
const { Meta } = Card;

const UserClub = () => {
  const [clubs, setClubs] = useState([]);
  const navigate = useNavigate();
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const contents = await myClub(address);

      setClubs(contents.data.data.my_club);
      console.log(contents.data.data.my_club);
    };

    fetchData();
  }, [address]);

  const clickclub = (name) => {
    if (!!name) {
      let clubName = name.replace(/\s+/g, "");
      navigate(`/clubmain/${clubName}`);
    }
  };

  return (
    <>
      <List
        size="large"
        grid={{ column: 4 }}
        header={<h1>가입된 클럽</h1>}
        dataSource={clubs}
        renderItem={(item) => (
          <>
            <List.Item onClick={() => clickclub(item.title)}>
              <ClubCard hoverable cover={<img alt="club" src={item.img} />}>
                <Meta title={item.title} description={item.createdAt} />
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
