import React,{useState,useRef} from 'react';
import { useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button,Layout,Form, Input ,message} from "antd";
import {SketchOutlined,CheckCircleTwoTone} from "@ant-design/icons";
import { loginUser } from '../../api/user';

const {Sider,Content}=Layout;

const Login =()=>{
    const formRef = useRef();
    const [isClick,setIsClick]=useState(true);
    const navigate=useNavigate();
    const dispatch=useDispatch();
    
    const loadAccountInfo = async () => {
        const { klaytn } = window
        
        if (klaytn) {
          try {
            await klaytn.enable()
            setAccountInfo(klaytn)
            klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
          } catch (error) {
            message.error('User denied account access')
          }
        } else {
            message.error('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }
    };
    
    const setAccountInfo = async () => {
        try {
            const { klaytn } = window
            if (klaytn === undefined) return
            
            const account = await klaytn.selectedAddress;
            await formRef.current.setFieldsValue({
                address: account
            });
            setIsClick(false);
        } catch (error) {
            console.log(error);
        }
        
      };

    const onFinish = async ({address,password}) => {
        const info=await loginUser({address,password});
        console.log(info.data.data);
        
        dispatch({type:"accountSlice/login",payload:info.data.data});
         window.location.replace("/");
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
                    ref={formRef}
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
                        label="Address"
                        name="address"
                        rules={[
                        {
                            required: true,
                            message: 'Please input your username!',
                        },
                        ]}
                    >
                        <CheckCircleTwoTone twoToneColor="#52c41a" hidden={isClick} />
                        <Button onClick={loadAccountInfo} type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
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
                        }
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