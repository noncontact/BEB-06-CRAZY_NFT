import {Layout} from "antd";
import { UserMenu } from "../../component";
import React,{ useState } from 'react';
const { Header, Footer, Sider, Content } = Layout;
const MyPage =()=>{
    const [menu,setMenu]=useState("info");
    const statusIcon = {
        info: <div>info</div>,
        articles: <div>articles</div>,
        nfts: <div>nfts</div>,
    }
    const StatusIconComponent = statusIcon[menu];
    const selectMenu=(menu)=>{
        setMenu(menu);
    }
    return (
        <Layout>
            <Sider width={300} style={{background:"#9747FF",height:"100vh"}}>
                <UserMenu selectMenu={selectMenu}/>
            </Sider>
            <Layout>
                <Header style={{background:"white"}}>Header</Header>
                <Content>{StatusIconComponent}</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
export default MyPage;