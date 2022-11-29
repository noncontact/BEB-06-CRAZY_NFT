import React, { useState } from 'react';
import { Button, message,Steps,Input } from 'antd';
import { Deploy1,Deploy2,Deploy3,Deploy4,Deploy5 } from '../../component';
import { nftDeploy } from '../../api/nft';
import { useSelector } from 'react-redux';
const steps = [
  <Deploy1 />,
  <Deploy2 />,
  <Deploy3 />,
  <Deploy4 />,
  <Deploy5 />,
    
  ];
const NftMint =()=>{
  
  const clubId=useSelector((state) => {
    return state.club.clubId;
  });
    const [current, setCurrent] = useState(0);
    const [done, setDone] = useState(false);
    const next = () => {
      setCurrent(current + 1);
    };
    
    const deployNft=async(e)=>{
      e.preventDefault();
      console.log(e.target.nft_name.value);
      await nftDeploy({
        club_id:clubId,
        nft_name: e.target.nft_name.value,
        nft_symbol:e.target.nft_symbol.value,
        nft_desc: e.target.nft_desc.value,
        nft_price: Number(e.target.nft_price.value) , // 100 PCT
        deploy_count: Number(e.target.deploy_count.value),
      });
    };
    return (
      <>
        <Steps current={current} items={steps} />
        <div style={{
          minHeight: "200px",
          marginTop: "16px",
          paddingTop: "80px",
          textAlign: "center",
          background: "#fafafa",
          border: "1px dashed #e9e9e9",
          borderRadius: "2px"}} >
            {steps[current]}
          </div>
        <div className="steps-action">
          {current < steps.length - 1 && (
            <Button type="primary" onClick={() => next()}>
              Next
            </Button>
          )}
          {current === steps.length - 1 && (
            <Button type="primary" onClick={() => setDone(true)}>
              Done
            </Button>
          )}
          
        </div>
        {done&&(<form encType='multipart/form-data' onSubmit={deployNft}>
            
            nft_name:<input type='text' name='nft_name' />
            nft_symbol:<input type='text' name='nft_symbol' />
            nft_desc:<input type='text' name='nft_desc' />
            nft_price:<input type='number' name='nft_price' />
            deploy_count:<input type='number' name='deploy_count' />
            {/* <button type='submit'>업로드</button> */}
            <button type='submit'>
              업로드
            </button>
        </form>
        )}
        <br></br>
        <br></br>
      </>
    );
};
export default NftMint;