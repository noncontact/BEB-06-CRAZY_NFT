import React,{ useState } from 'react';
import { Layout } from 'antd';
import {  Route, Routes } from 'react-router-dom';
import {ArticleDetail,CreateArticle} from "../../pages";
import { Catagory } from '../../component';
const { Header, Sider, Content } = Layout;

const ClubMain =()=>{
    const [catagory,setCatagory]=useState("all");
    const statusIcon = {
        all: <div>all</div>,
        notice: <div>notice</div>,
        qna: <div>qna</div>,
        free: <div>free</div>,
        club: <div>club</div>,
        rare: <div>rare</div>,
        superrare: <div>superrare</div>,
    }
    const StatusIconComponent = statusIcon[catagory];
    const selectCatagory=(menu)=>{
        setCatagory(menu);
    }
    return (
        <Layout>
            <Header>Header</Header>
            <Layout>
                <Sider style={{height:"80vh",background:"#9747FF"}}>
                <Catagory selectCatagory={selectCatagory} />
                </Sider>
                <Routes>
                    <Route path="*" element={<Content>{StatusIconComponent}</Content>} />
                    <Route path="articledetail/:id" element={<ArticleDetail />} />
                    <Route path="createarticle" element={<CreateArticle />} />
                </Routes>
            </Layout>
        </Layout>
    );
};
export default ClubMain;