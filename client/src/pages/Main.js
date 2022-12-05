import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navi } from "component";
import { allClubsList } from "api/club";
import { Layout, List, Card, Skeleton } from "antd";
import { useDispatch } from "react-redux";
const { Header, Content } = Layout;
const data = [<Skeleton active />, <Skeleton active />, <Skeleton active />];

const Main = () => {
  const [clubs, setClubs] = useState(data);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const clublist = await allClubsList();
      setClubs(clublist.data.data);
      console.log(clublist.data.data);
    };

    fetchData();
  }, []);

  const clickclub = (clubId, name, clubImg) => {
    if (name) {
      let clubName = name.replace(/\s+/g, "");
      dispatch({
        type: "clubSlice/selectClub",
        payload: { clubId, clubName, clubImg },
      });
      navigate(`/clubmain/${clubName}`);
    }
  };

  return (
    <Layout>
      <Header>
        <Navi />
      </Header>
      <Content>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
          }}
          pagination={{
            onChange: (page) => {
              console.log(page);
            },
            pageSize: 12,
          }}
          dataSource={clubs}
          renderItem={(item) => (
            <List.Item>
              <Card
                onClick={() => clickclub(item.id, item.title, item.img)}
                title={item.title}
              >
                {item.createdAt ? item.createdAt : item}
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
};
export default Main;
