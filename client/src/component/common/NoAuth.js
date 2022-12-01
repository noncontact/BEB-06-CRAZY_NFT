import React from 'react';
import { Button, Result } from 'antd';
import { useNavigate } from 'react-router-dom';
const NoAuth = () => {
    const navigate=useNavigate();
    return(
  <Result
    status="403"
    title="403"
    subTitle="Sorry, you are not authorized to access this page."
    extra={<Button onClick={()=>navigate('/login')} type="primary">Go To Login</Button>}
  />
)};
export default NoAuth;