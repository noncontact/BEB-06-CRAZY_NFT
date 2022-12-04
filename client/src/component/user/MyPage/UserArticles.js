import { List, Tabs } from "antd";
import { useSelector } from "react-redux";
import { myContent } from "api/my";
import React, { useState, useEffect } from "react";

const UserArticles = () => {
  const [articles, setArticles] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const contents = await myContent(address);
      setArticles(contents.data.data.my_contents);
      console.log(contents.data.data.my_contents);
    };

    fetchData();
  }, [address]);

  const data = [
    {
      title: "TWICE 팬클럽",
      content: "안녕하세요",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "BTS 팬클럽",
      content: "안녕하세요",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "블랙핑크 팬클럽",
      content: "안녕하세요",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "뉴진스 팬클럽",
      content: "안녕하세요",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
    {
      title: "르세라핌 팬클럽",
      content: "안녕하세요",
      img: "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png",
    },
  ];

  return (
    <>
      <Tabs centered>
        <Tabs.TabPane tab="게시글" key="item-1">
          <List
            size="large"
            dataSource={data}
            renderItem={(item) => (
              <List.Item style={{ border: "1px solid gray" }}>
                title:{item.title} content:{item.content}
              </List.Item>
            )}
          />
        </Tabs.TabPane>
        <Tabs.TabPane tab="댓글" key="item-2">
          Content 2
        </Tabs.TabPane>
      </Tabs>
    </>
  );
};

export default UserArticles;
