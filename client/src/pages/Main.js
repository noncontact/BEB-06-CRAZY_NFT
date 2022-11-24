import React from 'react';
import { Navi } from "../component";
import {Layout,List,Card } from 'antd';
const { Header, Content } = Layout;
const data = Array.from({
  length: 23,
}).map((_, i)=>({
  title: `Title ${i+1}`,
}));
const Main =()=>{

    return (
        <Layout>
            <Header><Navi /></Header>
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
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Card content</Card>
                </List.Item>
                )}
            />
            </Content>
            
        </Layout>
    );
};
export default Main;