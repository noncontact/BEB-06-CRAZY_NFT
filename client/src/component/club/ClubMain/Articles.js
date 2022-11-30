import { List, Button } from "antd";
import { EditOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { clubContents } from "../../../api/club";
import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
/**User
{id: , nickname: , profileurl:'}
content,
createdAt,
id,
img,
title
}
 */
const Articles = () => {
  const [articles, setArticles] = useState([]);
  const curLoca = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { clubId, clubName, catagoryId, catagory } = useSelector((state) => {
    return state.club;
  });

  useEffect(() => {
    const fetchData = async () => {
      const contents = await clubContents(clubId, catagoryId);

      setArticles(contents.data.data);
      console.log(contents.data.data);
    };

    fetchData();
  }, [catagoryId]);

  const selectArticle = (id) => {
    dispatch({ type: "clubSlice/selectPost", payload: { post_id: id } });
    navigate(curLoca.pathname + `/articledetail/${id}`);
  };

  return (
    <List
      size="large"
      header={
        <div style={{ fontSize: "32px" }}>
          {catagory}{" "}
          <Button
            onClick={() => navigate(`/clubmain/${clubName}/createarticle`)}
            icon={<EditOutlined />}
          >
            새 글 쓰기
          </Button>
        </div>
      }
      pagination={{
        onChange: (page) => {
          console.log(page);
        },
        pageSize: 10,
      }}
      dataSource={articles}
      renderItem={(item) => (
        <List.Item
          onClick={() => selectArticle(item.id)}
          style={{ border: "1px solid gray" }}
        >
          title{item.title} nickname{item.User.nickname}
        </List.Item>
      )}
    />
  );
};
export default Articles;
