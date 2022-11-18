import { Layout } from 'antd';
import {  Route, Routes } from 'react-router-dom';
import {ArticleDetail,CreateArticle} from "../../pages";
const { Header, Footer, Sider, Content } = Layout;
const ClubMain =()=>{

    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider style={{height:"80vh",background:"#9747FF"}}>
                <li>전체글</li>
                <li>공지사항</li>
                <li>Q&A</li>
                <li>자유게시판</li>
                <li>카페활동</li>
                <li>레어글</li>
                <li>슈퍼레어글</li>
                </Sider>
                <Routes>
                    <Route path="*" element={<Content>Content</Content>} />
                    <Route path="articledetail/:id" element={<ArticleDetail />} />
                    <Route path="createarticle" element={<CreateArticle />} />
                </Routes>
            </Layout>
            <Footer>Footer</Footer>
        </Layout>
    );
};
export default ClubMain;