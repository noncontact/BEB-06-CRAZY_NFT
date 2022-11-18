import { Button,Layout } from "antd";
import {SketchOutlined} from "@ant-design/icons";
const {Sider,Content}=Layout;

const SignUp =()=>{

    return (
        <Layout>
            <Sider align="center" style={{height:"100vh",background:"white"}}>Sider</Sider>
            <Layout>
                
                <Content style={{border:"1px solid violet"}} align="center">
                    <Button type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
                    Kaikas
                    </Button>
                </Content>
                
            </Layout>
        </Layout>
    );
};
export default SignUp;