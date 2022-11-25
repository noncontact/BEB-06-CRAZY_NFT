import {Card} from "antd";
import React,{ useState,useEffect } from 'react';
import { useSelector } from 'react-redux';
import { myNft } from "../../../api/my";
const { Meta } = Card;

const UserNfts =()=>{
    const [nfts,setNfts]=useState([]);
    const {address}=useSelector((state) =>{
        return state.account;
      });
    useEffect(() => {

        const fetchData = async () => {
        const info=await myNft(address);
        setNfts(info.data.data.my_nft);
        console.log(nfts);
        };

        fetchData();
    }, []);
    return (
        <Card
            hoverable
            style={{
            width: 240,
            }}
            cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
        >
            <Meta title="Europe Street beat" description="www.instagram.com" />
        </Card>
    );    
};
export default UserNfts;