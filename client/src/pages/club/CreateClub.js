import React from "react";
import { useSelector } from "react-redux";
import { makeClub } from "api/club";
import { Layout, Form, Button, Input, message, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
const { Dragger } = Upload;

const props = {
  name: "file",
  max: 1,
  multiple: true,
  action: "https://api.nft.storage/upload",
  headers: {
    withCredentials: true,
    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
  },
  onChange(info) {
    const { status } = info.file;
    if (status !== "uploading") {
      console.log(info.file, info.fileList);
    }
    if (status === "done") {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === "error") {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log("Dropped files", e.dataTransfer.files);
  },
};

const CreateClub = () => {
  const navigate = useNavigate();
  const { address } = useSelector((state) => {
    return state.account;
  });

  const onFinish = async ({ title, upload }) => {
    let img = "";
    if (!!upload) {
      img =
        "https://" +
        upload.file.response.value.cid +
        ".ipfs.nftstorage.link/" +
        upload.file.name;
    }
    console.log("createclub", img, upload, address);
    try {
      const data = await makeClub({
        address,
        title,
        img,
      });
      message.success("생성에 성공 했습니다.");
      window.location.replace("/");
    } catch (error) {
      message.error("생성에 실패 했습니다.");
    }
  };

  return (
    <>
      <Layout>
        <img
          alt="site_name"
          src="/crazyNFT.png"
          onClick={() => navigate("/")}
          className="logo"
        ></img>
        <Form onFinish={onFinish}>
          <h2>클럽 이름</h2>
          <Form.Item name="title">
            <Input placeholder="클럽 이름 입력" size="large" />
          </Form.Item>
          <h2>클럽 이미지 업로드 칸</h2>
          <Form.Item name="upload">
            <Dragger {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">
                Click or drag file to this area to upload
              </p>
              <p className="ant-upload-hint">
                클럽이름과 사진은 개설 후에도 변경할 수 있어요
              </p>
            </Dragger>
          </Form.Item>
          <Form.Item style={{ textAlign: "center" }}>
            <Button>취소</Button>
            <Button htmlType="submit">완료</Button>
          </Form.Item>
        </Form>
      </Layout>
    </>
  );
};

export default CreateClub;
