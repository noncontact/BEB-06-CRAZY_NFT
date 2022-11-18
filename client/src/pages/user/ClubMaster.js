import {Layout} from "antd";
const { Header, Footer, Sider, Content } = Layout;
const ClubMaster =()=>{

    return (
        <Layout>
            <Sider style={{background:"#9747FF",height:"100vh"}}>
                <li>내정보</li>
                <li>클럽 가입정보</li>
                <li>내가 쓴글</li>
                <li>내 NFT</li>
            </Sider>
            <Layout>
                <Header style={{background:"white"}}>Header</Header>
                <Content>Content</Content>
                <Footer>Footer</Footer>
            </Layout>
        </Layout>
    );
};
export default ClubMaster;