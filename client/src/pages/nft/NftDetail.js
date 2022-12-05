import { Image, Col, Row,Descriptions, Tag } from "antd";
import React from "react";

import { useSelector } from "react-redux";
<<<<<<< HEAD
import { nftMint } from "api/nft";
=======

>>>>>>> e8bc5e7bfa52082823bc3bb81bad7f27b54ac900

const NftDetail = () => {
  const meta = useSelector((state) => {
    return state.nft.meta;
  });
  
  return (
    <div>
      <Row>
        <Col span={6} offset={2}>
          <Image width={500} src={meta.image} />
        </Col>
        <Col span={6} offset={5}>
          <Descriptions
            title={meta.name}
            layout="vertical"
            bordered
            style={{ background: "#e2b6ff" }}
          >
            <Descriptions.Item label="Owner" span={3}>
              {meta.address}
            </Descriptions.Item>
            <Descriptions.Item label="description" span={3}>
              {meta.description}
            </Descriptions.Item>
            <Descriptions.Item label="attributes" span={3}>
              {meta.attributes.map((attribute, index) => {
                return (
                  <Tag key={attribute.trait_type} color="#f50">
                    {attribute.trait_type} : {attribute.value}
                  </Tag>
                );
              })}
            </Descriptions.Item>
          </Descriptions>
        </Col>
      </Row>
    </div>
  );
};
export default NftDetail;
