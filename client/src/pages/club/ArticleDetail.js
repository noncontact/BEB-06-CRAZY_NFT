import { Button, Divider,Form, List,Input,Avatar } from 'antd';
import React, { useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getDetail,getCommLike,postCommWrite } from '../../api/club';
const { TextArea } = Input;
const initArti={
    id: 0,
    title: "",
    content: "",
    img: "",
    createdAt: "",
    user: "",
    comment: [],
    like_num: 0,
};
const ArticleDetail =()=>{
    const [article,setArticle]=useState(initArti);
    const {address,isLogin}=useSelector((state) =>{
        return state.account;
    });
    const {post_id}=useSelector((state) =>{
        return state.club;
    });
    const fetchData = async () => {
        try {
            const contents=await getDetail(post_id);
            setArticle(contents.data.data);
            console.log(contents.data.data);
        } catch (error) {
            console.log(error);
        }
    
    };
    useEffect(() => {
        fetchData();
    }, []);

    const clickLike=async()=>{
        try {
            const data=await getCommLike(post_id,address);
            console.log(data);
        } catch (error) {
            console.log(error);
        }
        
    };
    const onFinish = async(values) => {
        try {
            await postCommWrite({ address, post_id, content:values.content });
            await fetchData();
        } catch (error) {
            console.log(error);
        }
        
        
      };

    return (
        <div>
            {/*글정보 범위*/}
            <div>{article.title}</div>
            <Divider />
            {/*콘탠츠 범위*/}
            <div>{article.content}</div>
            <button onClick={clickLike}>좋아요</button>
            <Divider />
            {/**댓글 범위 */}
            <List
                itemLayout="horizontal"
                dataSource={article.comment}
                renderItem={(item) => (
                <List.Item>
                    <List.Item.Meta
                    avatar={<Avatar src={item.User.profileurl} />}
                    title={<p>{item.User.nickname}</p>}
                    description={item.content}
                    />
                </List.Item>
                )}
            />
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                onFinish={onFinish}
                autoComplete="off"
                disabled={!isLogin}
            >
            <Form.Item
                name="content"
                rules={[
                {
                    required: true,
                },
                ]}
            >
            <TextArea
                showCount
                maxLength={100}
                placeholder="댓글 작성"
                rows={4}
            />
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
        </div>   
        
    );
};
export default ArticleDetail;
