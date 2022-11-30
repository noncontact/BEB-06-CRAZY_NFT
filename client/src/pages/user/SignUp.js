import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import {
  Col,
  Row,
  Button,
  Layout,
  Upload,
  Form,
  Input,
  Image,
  message,
} from "antd";
import Icon, {
  CheckCircleTwoTone,
  PlusOutlined,
  LoadingOutlined,
  UserOutlined,
  KeyOutlined,
} from "@ant-design/icons";
import styled from "styled-components";
import Caver from "caver-js";
import { registerUser } from "../../api/user";
import Logo from "../../img/logo.png";
import KaikasSvg from "../../component/common/KaikasButton";
import rule from "../../util/rule.json";

const KaikasIcon = (props) => <Icon component={KaikasSvg} {...props} />;

const upload = {};
//upload.action = "https://www.mocky.io/v2/5cc8019d300000980a055e76";
upload.action = "https://api.nft.storage/upload";
upload.header = {
  withCredentials: true,
  Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
};
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
// 이미지 업로드전 이미지타입 확인
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

const SignUp = () => {
  const formRef = useRef();
  const dispatch = useDispatch();

  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };

  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  const [account, setAccount] = useState({
    isTrue: true,
    txType: null,
    account: "",
    balance: 0,
    network: null,
  });

  const loadAccountInfo = async () => {
    const { klaytn } = window;

    if (klaytn) {
      try {
        await klaytn.enable();
        setAccountInfo(klaytn);
        setNetworkInfo();
        klaytn.on("accountsChanged", () => setAccountInfo(klaytn));
      } catch (error) {
        console.log("User denied account access");
      }
    } else {
      console.log(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };

  const setAccountInfo = async () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;
    const caver = new Caver(klaytn);
    const account = await klaytn.selectedAddress;
    const balance = await caver.klay.getBalance(account);
    await formRef.current.setFieldsValue({
      address: account,
    });
    setAccount({
      account,
      balance: caver.utils.fromPeb(balance, "KLAY"),
      isTrue: false,
    });
  };

  const setNetworkInfo = () => {
    const { klaytn } = window;
    if (klaytn === undefined) return;

    setAccount({ network: klaytn.networkVersion });
    klaytn.on("networkChanged", () => setNetworkInfo(klaytn.networkVersion));
  };

  const onFinish = async ({ address, password, upload, nickname }) => {
    const profileurl =
      "https://" +
      upload.file.response.value.cid +
      ".ipfs.nftstorage.link/" +
      upload.file.name;
    await registerUser({ address, password, profileurl, nickname });
    dispatch({
      type: "accountSlice/login",
      payload: { address, profileurl, nickname },
    });
    setTimeout(function () {
      window.location.href = "/";
    }, 1000);
  };

  return (
    <Layout>
      <SignUpForm ref={formRef} onFinish={onFinish}>
        <SignUpRow gutter={24} justify="space-around" align="middle">
          <SignUpCol span={24}>
            <Image src={Logo} height={400} preview={false} />
          </SignUpCol>
          <SignUpCol span={24}>
            <SignUpFormItem name="address" rules={[rule.address]}>
              <CheckCircleTwoTone
                twoToneColor="#52c41a"
                hidden={account.isTrue}
              />
              <ButtonWrapper
                onClick={loadAccountInfo}
                type="primary"
                shape="round"
              >
                <KaikasIcon style={{ fontSize: "32px" }} />
                Connect to Kaikas
              </ButtonWrapper>
              {account.account}
            </SignUpFormItem>
          </SignUpCol>
          <SignUpCol span={24}>
            <SignUpFormItem name="nickname" rules={[rule.nickname]}>
              <SignUpInput placeholder="Nickname" prefix={<UserOutlined />} />
            </SignUpFormItem>
          </SignUpCol>
          <SignUpCol span={24}>
            <SignUpFormItem
              name="password"
              rules={[
                rule.password,
                () => ({
                  validator(_, value) {
                    const special_pattern = /[~!@#$%^&*()_+|<>?:{}]/;
                    if (
                      !value ||
                      (special_pattern.test(value) === true && value.length > 7)
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error(
                        "비밀번호는 8자리 이상이고 특수 문자를 가져야합니다."
                      )
                    );
                  },
                }),
              ]}
            >
              <SignUpInputPassword
                placeholder="Password"
                prefix={<KeyOutlined />}
              />
            </SignUpFormItem>
          </SignUpCol>
          <SignUpCol span={24}>
            <SignUpFormItem name="upload">
              <SignUpUpload
                maxCount={1}
                beforeUpload={beforeUpload}
                action={upload.action}
                headers={upload.header}
                listType="picture-card"
                onChange={handleChange}
                showUploadList={false}
              >
                {imageUrl ? (
                  <div style={{ overflow: "hidden", height: "100px" }}>
                    <Image src={imageUrl} height={100} preview={true} />
                  </div>
                ) : (
                  uploadButton
                )}
              </SignUpUpload>
            </SignUpFormItem>
          </SignUpCol>
          <SignUpCol span={24}>
            <Form.Item>
              <ButtonWrapper type="primary" shape="round" htmlType="submit">
                가입
              </ButtonWrapper>
            </Form.Item>
          </SignUpCol>
        </SignUpRow>
      </SignUpForm>
    </Layout>
  );
};

const ButtonWrapper = styled(Button)`
  width: 90%;
  height: 45px;
`;
const SignUpForm = styled(Form)`
  width: 60%;
  height: 800px;
  align-self: center;
  background: #f1eee4;
`;
const SignUpRow = styled(Row)`
  text-align: center;
`;
const SignUpCol = styled(Col)`
  height: 10%;
`;
const SignUpFormItem = styled(Form.Item)`
  height: 100%;
  width: 100%;
`;
const SignUpUpload = styled(Upload)`
  .ant-upload-select-picture-card {
    width: 90%;
    margin: 0px;
  }
`;
const SignUpInput = styled(Input)`
  height: 45px;
  width: 90%;
  border-radius: 5px;
`;
const SignUpInputPassword = styled(Input.Password)`
  height: 45px;
  width: 90%;
  border-radius: 5px;
`;

export default SignUp;
