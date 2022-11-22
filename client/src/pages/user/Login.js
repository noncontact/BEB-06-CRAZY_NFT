import React from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button,Layout,Form, Input } from "antd";
import {SketchOutlined} from "@ant-design/icons";
const {Sider,Content}=Layout;
const Login =()=>{
    const navigate=useNavigate();
    const dispatch=useDispatch();

    const onFinish = (values) => {
        console.log('Success:', values);
      };
      const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
      };
    return (
        <Layout>
            <Sider align="center" style={{height:"100vh",background:"white"}}>
            <div onClick={()=>navigate("/")}>home</div>

            </Sider>
            <Layout>
                
                <Content align="center" >
                <Form
                    name="basic"
                    labelCol={{
                        span: 8,
                    }}
                    wrapperCol={{
                        span: 16,
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <Button  type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
                            Kaikas
                        </Button>
                        
                    </Form.Item>

                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your password!',
                        },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item
                        wrapperCol={{
                        offset: 8,
                        span: 16,
                        }}
                    >
                        <Button type="primary" htmlType="submit">
                        Submit
                        </Button>
                    </Form.Item>
                    </Form>
                    
                    <Button onClick={()=>navigate("/signup")}>회원가입</Button>
                </Content>
                
            </Layout>
        </Layout>
    ); 
};
export default Login;