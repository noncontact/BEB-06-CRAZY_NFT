import {Layout,Descriptions,List,Card} from "antd";
import { UserMenu } from "../../component";
import React,{ useState } from 'react';
const { Meta } = Card;
const { Header, Footer, Sider, Content } = Layout;

const Info =()=>{

    return (
        <Descriptions title="User Info">
            <Descriptions.Item label="UserName">Zhou Maomao</Descriptions.Item>
            <Descriptions.Item label="Telephone">1810000000</Descriptions.Item>
            <Descriptions.Item label="Live">Hangzhou, Zhejiang</Descriptions.Item>
            <Descriptions.Item label="Remark">empty</Descriptions.Item>
            <Descriptions.Item label="Address">
                No. 18, Wantang Road, Xihu District, Hangzhou, Zhejiang, China
            </Descriptions.Item>
        </Descriptions>
    );    
};
const Articles =()=>{
    const data = [
        'Racing car sprays burning fuel into crowd.',
        'Japanese princess to wed commoner.',
        'Australian walks 100km after outback crash.',
        'Man charged over missing wedding girl.',
        'Los Angeles battles huge wildfires.',
      ];
    return (
        <List
        size="large"
        header={<div>Header</div>}
        footer={<div>Footer</div>}
        
        dataSource={data}
        renderItem={(item) => <List.Item style={{border:"1px solid gray"}}>{item}</List.Item>}
        />
    );    
};
const Nfts =()=>{

    return (
        <Card
            hoverable
            style={{
            width: 240,
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );    
};

const MyPage =()=>{
    const [menu,setMenu]=useState("info");
    const statusIcon = {
        info: <Info></Info>,
        articles: <Articles></Articles>,
        nfts: <Nfts></Nfts>,
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