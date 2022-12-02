import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Button, Layout, Form, Input, Image, message } from "antd";
import styled from "styled-components";

import { loginUser } from "api/user";
import { getCA } from "api/nft";
import rule from "util/rule.json";
import Logo from "img/logo.png";
import Account from "component/common/KaikasButton";

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

const onFinishFailed = (errorInfo) => {
  return console.log("Failed:", errorInfo);
};

const Login = () => {
  const [address, setAddress] = useState("");
  const dispatch = useDispatch();

  const onFinish = async ({ password }) => {
    console.log("login Data", address, password);
    if (!!address && !!password) {
      const { data } = await loginUser({ address, password });
      const sev = await getCA();
      const serverInfo = sev.data.data;
      const accountInfo = {
        ...data,
        server: serverInfo.address,
        ca: serverInfo.ca,
      };
      dispatch({ type: "accountSlice/login", payload: accountInfo });
       
      window.location.replace("/");
    } else {
      message.error("address 및 비밀번호를 입력해주세요.");
    }
  };

  return (
    <Layout>
      <LoginForm
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="on"
        justify="space-around"
        align="middle"
      >
        <Image src={Logo} height={400} preview={false} />
        <Form.Item rules={[rule.address]}>
          <Account address={address} setAddress={setAddress} />
        </Form.Item>
        <Form.Item name="password" rules={[rule.password]}>
          <SignUpInputPassword placeholder="Password" />
        </Form.Item>
        <Form.Item>
          <ButtonWrapper type="primary" htmlType="submit">
            Submit
          </ButtonWrapper>
        </Form.Item>
        <div>
          <span>계정이 없으신가요? </span>
          <Link to="/signup">가입하기</Link>
        </div>
      </LoginForm>
    </Layout>
  );
};
export default Login;
