import { NftNavi } from '../../component';
import NftDetail from './NftDetail';
import {Layout } from 'antd';
import {  Route, Routes } from 'react-router-dom';
const { Header, Content } = Layout;
const NftAllList =()=>{

    return (
        <Layout>
            <Header><NftNavi /></Header>
            <Content>
            <Routes>
                <Route path="*" element={<p>NFTLIST</p>} />
                <Route path="nftdetail/:id" element={<NftDetail />} />        
            </Routes>
            </Content>
        </Layout>
    );
};
export default NftAllList;