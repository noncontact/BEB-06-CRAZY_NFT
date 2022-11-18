import { Button,Layout } from "antd";
import {SketchOutlined} from "@ant-design/icons";
const {Sider,Content}=Layout;
const Login =()=>{

    return (
        <Layout>
            <Sider align="center" style={{height:"100vh",background:"white"}}>Sider destriptionSider destriptionSider destriptionSider destriptionSider destriptionSider destriptionSider destriptionSider destriptionSider destription</Sider>
            <Layout>
                
                <Content align="center" >
                    <Button type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
                        Kaikas
                    </Button>
                    <Button>회원가입</Button>
                </Content>
                
            </Layout>
        </Layout>
    ); 
};
export default Login;