import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Button, Layout, Form, Input, Image, message } from "antd";
import Icon, { CheckCircleTwoTone } from "@ant-design/icons";
import { loginUser } from "../../api/user";
import KaikasSvg from "../../component/common/KaikasButton";
import rule from "../../util/rule.json";
import styled from "styled-components";
import Logo from "../../img/logo.png";

const KaikasIcon = (props) => <Icon component={KaikasSvg} {...props} />;

const LoginForm = styled(Form)`
  width: 60%;
  height: 800px;
  align-self: center;
  background: #f1eee4;
`;

const SignUpInputPassword = styled(Input.Password)`
  height: 45px;
  width: 90%;
  border-radius: 5px;
`;

const ButtonWrapper = styled(Button)`
  width: 90%;
  height: 45px;
`;

const Login = () => {
  const formRef = useRef();
  const [isClick, setIsClick] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        klaytn.on("accountsChanged", () => setAccountInfo(klaytn));
      } catch (error) {
        message.error("User denied account access");
      }
    } else {
      message.error(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };
  const setAccountInfo = async () => {
    try {
      const { klaytn } = window;
      if (klaytn === undefined) return;

      const account = await klaytn.selectedAddress;
      await formRef.current.setFieldsValue({
        address: account,
      });
      setIsClick(false);
    } catch (error) {
      console.log(error);
    }
  };
  const onFinish = async ({ address, password }) => {
    const info = await loginUser({ address, password });
    console.log(info.data.data);

    dispatch({ type: "accountSlice/login", payload: info.data.data });
    window.location.replace("/");
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <Layout>
      <LoginForm
        ref={formRef}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        justify="space-around"
        align="middle"
      >
        <Image src={Logo} height={400} preview={false} />
        <Form.Item name="address" rules={[rule.address]}>
          <CheckCircleTwoTone twoToneColor="#52c41a" hidden={isClick} />
          <ButtonWrapper onClick={loadAccountInfo} type="primary" shape="round">
            <KaikasIcon />
            Connect to Kaikas
          </ButtonWrapper>
        </Form.Item>
        <Form.Item name="password" rules={[rule.password]}>
          <SignUpInputPassword placeholder="Password" />
        </Form.Item>
        <Form.Item name="submit">
          <ButtonWrapper type="primary" htmlType="submit">
            Submit
          </ButtonWrapper>
        </Form.Item>
        <div>
          <span>계정이 없으시간요? </span>
          <a href={() => navigate("/signup")}>가입하기</a>
        </div>
      </LoginForm>
    </Layout>
  );
};
export default Login;
