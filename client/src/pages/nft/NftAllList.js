import { NftNavi } from '../../component';
import NftDetail from './NftDetail';
import {Layout,List,Card } from 'antd';
import {  Route, Routes } from 'react-router-dom';
import React from 'react';
const { Header, Content } = Layout;
const data = [
    {
      title: 'Title 1',
    },
    {
      title: 'Title 2',
    },
    {
      title: 'Title 3',
    },
    {
      title: 'Title 4',
    },
  ];
const NftAllList =()=>{

    return (
        <Layout>
            <Header><NftNavi /></Header>
            <Content>
            <Routes>
                <Route path="*" element={<List
                grid={{
                gutter: 16,
                column: 4,
                }}
                dataSource={data}
                renderItem={(item) => (
                <List.Item>
                    <Card title={item.title}>Card content</Card>
                </List.Item>
                )}
            />} />
                <Route path="nftdetail/:id" element={<NftDetail />} />        
            </Routes>
            </Content>
        </Layout>
    );
};
export default NftAllList;