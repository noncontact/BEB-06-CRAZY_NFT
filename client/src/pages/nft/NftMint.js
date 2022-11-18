import React, { useState } from 'react';
import { Button, message,Steps,Input } from 'antd';
const steps = [
    {
      title: 'First',
      content: 'First-content',
    },
    {
      title: 'Second',
      content: 'Second-content',
    },
    {
      title: 'Last',
      content: 'Last-content',
    },
  ];
const NftMint =()=>{
    const [current, setCurrent] = useState(0);
    const next = () => {
      setCurrent(current + 1);
    };
    const prev = () => {
      setCurrent(current - 1);
    };
    const items = steps.map((item) => ({
      key: item.title,
      title: item.title,
    }));
    return (
      <>
        <Steps current={current} items={items} />
        <div style={{minHeight: "200px",marginTop: "16px",paddingTop: "80px",textAlign: "center",background: "#fafafa",border: "1px dashed #e9e9e9",borderRadius: "2px"}} >{steps[current].content}</div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => message.success('Processing complete!')}>
              Done
            </Button>
          )}
          {current > 0 && (
            <Button
              style={{
                margin: '0 8px',
              }}
              onClick={() => prev()}
            >
              Previous
            </Button>
          )}
        </div>
        <Input showCount maxLength={20} placeholder="input NFT Name" />
        <br></br>
        <br></br>
      </>
    );
};
export default NftMint;