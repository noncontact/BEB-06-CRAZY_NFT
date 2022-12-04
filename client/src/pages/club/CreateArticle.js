import React from "react";
import { Button, Form, Input, Select,message,Divider } from "antd";
import { publishArticle } from "../../api/club";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { NoAuth } from "../../component";

const CreateArticle = () => {
  const navigate = useNavigate();
  const {address,isLogin} = useSelector((state) => {
    return state.account;
  });
  const { clubId, clubName } = useSelector((state) => {
    return state.club;
  });
  const onFinish = async (values) => {
    try {
      const newArti = { ...values, address: address, club_id: clubId };
      await publishArticle(newArti);
      message.success("작성이 완료되었습니다.");
      navigate(`/clubmain/${clubName}`);
    } catch (error) {
      message.error("작성이 실패 했습니다.");
    }
    
  };
  return (
    <div>
      <div style={{ fontSize: "25px",marginBottom:"10px" }}>클럽 글쓰기</div>
      <Divider />
    {isLogin?
    <Form  name="nest-messages" onFinish={onFinish}>
      <Form.Item name="category_id">
        <Select placeholder="카테고리를 정하세요.">
          <Select.Option value={1}>공지사항</Select.Option>
          <Select.Option value={2}>Q&A</Select.Option>
          <Select.Option value={3}>자유게시판</Select.Option>
          <Select.Option value={4}>클럽 활동</Select.Option>
          <Select.Option value={5}>레어글</Select.Option>
          <Select.Option value={6}>슈퍼레어글</Select.Option>
        </Select>
      </Form.Item>
      <Form.Item
        name="title"
        rules={[
          {
            required: true,
          },
        ]}
      >
        <Input placeholder="제목을 입력해 주세요" />
      </Form.Item>
      
      <Form.Item name={"content"}>
        <Input.TextArea autoSize={{minRows: 14,maxRows: 14}} placeholder="내용을 입력해 주세요"/>
      </Form.Item>
      <Form.Item
        
      >
        <Button type="primary" htmlType="submit">
          등록
        </Button>
      </Form.Item>
    </Form>:<NoAuth />}
    </div>
  );
};
export default CreateArticle;
