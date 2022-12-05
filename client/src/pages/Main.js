import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Navi } from "component";
import { allClubsList } from "api/club";
import { Layout, List, Card, Skeleton, Carousel } from "antd";
import { useDispatch } from "react-redux";
import "style/main.css";
const { Header, Content } = Layout;
const { Meta } = Card;

const data = [<Skeleton active />, <Skeleton active />, <Skeleton active />];

const Main = () => {
  const [clubs, setClubs] = useState(data);
  const [filtered, setFiltered] = useState([]);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      const clublist = await allClubsList();
      setClubs(clublist.data.data);
      console.log(clublist.data.data);
    };

    fetchData();
  }, []);

<<<<<<< HEAD
  const handleImgError = (e) => {
    e.target.src = "/No-image-found.jpg";
  };
  const search = (value) => {
    const newFilterd = clubs.filter((data) => data.title.includes(value));
=======
  const handleImgError = (e)=>{
    e.target.src ='/No-image-found.jpg';
    e.target.onError=null;
  }
  const search = (value)=>{
    const newFilterd=clubs.filter((data)=>data.title.includes(value));
>>>>>>> e8bc5e7bfa52082823bc3bb81bad7f27b54ac900

    setFiltered(newFilterd);
  };
  const clickclub = (clubId, name, clubImg) => {
    if (name) {
      let clubName = name.replace(/\s+/g, "");
      dispatch({
        type: "clubSlice/selectClub",
        payload: { clubId, clubName, clubImg },
      });
      navigate(`/clubmain/${clubName}`);
    }
  };

<<<<<<< HEAD
  return (
    <Layout>
      <Header>
        <Navi search={search} />
      </Header>
      <Content className="main-content">
        <Carousel autoplay>
          <div>
            <h1 className="slide1">훌륭한 NFT!</h1>
          </div>
          <div>
            <h1 className="slide2">간단한 커뮤니티 NFT 제작</h1>
          </div>
          <div>
            <h1 className="slide3">특섹있는 커뮤니티 crazyNFT</h1>
          </div>
        </Carousel>
        <List
          grid={{
            gutter: 16,
            xs: 1,
            sm: 2,
            md: 3,
            lg: 4,
            xl: 4,
          }}
          pagination={{
            pageSize: 12,
          }}
          dataSource={filtered.length !== 0 ? filtered : clubs}
          renderItem={(item) => (
            <List.Item>
              <Card
                hoverable
                onClick={() => clickclub(item.id, item.title, item.img)}
                cover={
                  <img alt="example" src={item.img} onError={handleImgError} />
                }
              >
                <Meta
                  title={item.title}
                  description={item.createdAt ? item.createdAt : item}
                />
              </Card>
            </List.Item>
          )}
        />
      </Content>
    </Layout>
  );
=======
    return (
        <Layout>
            <Header><Navi search={search}/></Header>
            <Content className="main-content">
            <Carousel autoplay>
              <div>
                <h1 className="slide1">훌륭한 NFT!</h1>
              </div>
              <div>
                <h1 className="slide2">간단한 커뮤니티 NFT 제작</h1>
              </div>
              <div>
                <h1 className="slide3">특섹있는 커뮤니티 crazyNFT</h1>
              </div>
            </Carousel>
            <List
                grid={{
                  gutter: 16,
                  xs: 1,
                  sm: 2,
                  md: 3,
                  lg: 4,
                  xl: 4,
                }}
                pagination={{
                  pageSize: 12,
                }}
                dataSource={filtered.length!==0?filtered:clubs}
                renderItem={(item) => (
                <List.Item>
                    <Card 
                    hoverable
                    onClick={()=>clickclub(item.id,item.title,item.img)} 
                    style={{width:"275px"}}
                    cover={<img alt="example" src={item.img} onError={handleImgError}/>}
                    >
                      <Meta title={item.title} description={item.createdAt?item.createdAt:item} />
                    </Card>
                </List.Item>
                )}
            />
            </Content>
            
        </Layout>
    );

>>>>>>> e8bc5e7bfa52082823bc3bb81bad7f27b54ac900
};
export default Main;
