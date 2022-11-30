import React from "react";
import { Layout } from "antd";
import { Route, Routes } from "react-router-dom";
import { ArticleDetail, CreateArticle } from "../../pages";
import { Catagory, Articles } from "../../component";


const { Header, Sider, Content } = Layout;

const ClubMain = () => {

  return (
    <Layout>
      <Header>Header</Header>
      <Layout>
        <Sider style={{ height: "80vh", background: "#9747FF" }}>
          <Catagory />
        </Sider>
        <Content>
          <Routes>
            <Route path="*" element={<Articles />} />
            <Route path="articledetail/:id" element={<ArticleDetail />} />
            <Route path="createarticle" element={<CreateArticle />} />
          </Routes>
        </Content>
      </Layout>
    </Layout>
  );
};
export default ClubMain;
