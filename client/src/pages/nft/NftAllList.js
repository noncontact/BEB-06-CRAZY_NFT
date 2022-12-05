import { NftNavi } from "component";
import NftDetail from "./NftDetail";
import NftMint from "./NftMint";
import { Layout, List, Card ,Skeleton} from "antd";
import { Route, Routes, useNavigate } from "react-router-dom";
import React, { useState ,useEffect} from "react";
import { getClubNfts } from "api/nft";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const { Header, Content } = Layout;
const { Meta } = Card;

const data = [
  <Skeleton active />,
  <Skeleton active />,
  <Skeleton active />,
  
];
const NftAllList = () => {
  const [nftList,setNftList]=useState(data);
  const [filtered,setFiltered]=useState([]);
  const navigate = useNavigate();
  const dispatch= useDispatch();
  const {clubId}=useSelector((state) =>{
    return state.club;
  });
  useEffect(() => {

    const fetchData = async () => {
      try {
        const result = await getClubNfts(clubId);
        const nfts = result.data.data;
        const jsondata=[];
        for(const nft of nfts){
          try {
            let meta=await axios(`https://ipfs.io/ipfs/${nft.token_uri}/${nft.token_id}.json`);
            let img=meta.data.image.replace("ipfs://","https://ipfs.io/ipfs/");
            console.log(img);
            jsondata.push({...meta.data,address:nft.address,image:img});
          } catch (err) {
            console.log(err);
          }
          
        }
        setNftList(jsondata);
        console.log(jsondata);
      } catch (error) {
        console.log(error);
      }
      
    };

    fetchData();
  }, []);

  const selectnft=(meta)=>{
    dispatch({type:"nftSlice/selectNft",payload:{meta}});
    navigate(`/nftalllist/nftdetail/${meta.name}`);
  };
  const handleImgError = (e)=>{
    e.target.src ='/No-image-found.jpg'
  }
  const search = (value)=>{
    const newFilterd=nftList.filter((data)=>data.name.includes(value));

    setFiltered(newFilterd);
  }

  return (
    <Layout>
      <Header>
        <NftNavi search={search}/>
      </Header>
      <Content className="main-content">
        <Routes>
          <Route
            path="*"
            element={
              
              <List
                grid={{
                  gutter: 16,
                  column: 4,
                }}
                pagination={{
                  pageSize: 12,
                }}
                dataSource={nftList}
                renderItem={(item) => (
                  <List.Item>
                    <Card 
                    hoverable
                    onClick={item.address&&(()=>selectnft(item))}
                    style={{width:"275px"}}
                    cover={<img alt="example" src={item.image} onError={handleImgError}/>}
                    >
                      <Meta title={item.name} description={item.image?item.image:item} />
                    </Card>
                  </List.Item>
                )}
              />
            }
          />
          <Route path="nftdetail/:id" element={<NftDetail />} />
          <Route path="nftmint" element={<NftMint />} />
        </Routes>
      </Content>
    </Layout>
  );
};
export default NftAllList;
