import { Avatar, List, Tabs, Space, Divider } from "antd";
import { LikeOutlined, MessageOutlined, StarOutlined } from "@ant-design/icons";
import InfiniteScroll from "react-infinite-scroll-component";
import { useSelector } from "react-redux";
import { myContent } from "api/my";
import React, { useState, useEffect } from "react";

const UserArticles = () => {
  const [articles, setArticles] = useState([]);
  const { address, nickname, profileurl } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const contents = await myContent(address);
      setArticles(contents.data.data.my_contents);
      console.log("게시글 찾기", contents.data.data.my_contents);
    };

    fetchData();
  }, [address]);

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

  return (
    <>
      <Tabs centered>
        <Tabs.TabPane
          tab="게시글"
          key="item-1"
          style={{ textAlign: "-webkit-center" }}
        >
          <div
            id="scrollableDiv"
            style={{
              width: "80%",
              height: "700px",
              overflow: "auto",
              padding: "0 16px",
              background: "white",
            }}
          >
            <InfiniteScroll
              dataLength={articles.length}
              hasMore={articles.length < 50}
              endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
              scrollableTarget="scrollableDiv"
            >
              <List
                size="large"
                dataSource={articles}
                renderItem={(item) => (
                  <List.Item
                    key={item.id}
                    actions={[
                      <IconText
                        icon={StarOutlined}
                        text="156"
                        key="list-vertical-star-o"
                      />,
                      <IconText
                        icon={LikeOutlined}
                        text="156"
                        key="list-vertical-like-o"
                      />,
                      <IconText
                        icon={MessageOutlined}
                        text="2"
                        key="list-vertical-message"
                      />,
                    ]}
                  >
                    <h1>
                      <a href={item.href}>{item.title}</a>
                    </h1>
                    <Divider />
                    <List.Item.Meta
                      avatar={<Avatar src={profileurl} />}
                      title={nickname}
                      description={item.createdAt}
                      style={{ textAlign: "left" }}
                    />
                    {!!item.img ? <img alt="posting" src={item.img} /> : <></>}
                    <br />
                    {item.content}
                    <br />
                  </List.Item>
                )}
              />
            </InfiniteScroll>
          </div>
        </Tabs.TabPane>
        <Tabs.TabPane tab="댓글" key="item-2">
          Content 2
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default UserArticles;
