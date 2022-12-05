import { Image, Col, Row, message, Descriptions, Tag, Button } from "antd";
import React from "react";
import Caver from "caver-js";
import { useSelector } from "react-redux";
import { nftMint } from "api/nft";

const NftDetail = () => {
  const meta = useSelector((state) => {
    return state.nft.meta;
  });
  const { address, server, ca } = useSelector((state) => {
    return state.account;
  });
  const club_id = useSelector((state) => {
    return state.club.clubId;
  });
  const trade = async () => {
    try {
      const { klaytn } = window;
      const caver = new Caver(klaytn);
      const kip7Instance = await new caver.klay.KIP7(ca);
      let mintInfo = await kip7Instance.transfer(server, "0x1000000000000", {
        from: klaytn.selectedAddress,
      });
      const tx_hash = mintInfo.transactionHash;
      console.log("d", tx_hash);
      const result = await nftMint({ address, club_id, tx_hash });
      message.success(result.data.data.token_uri);
    } catch (error) {
      console.log(error);
    }
  };
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
            <Descriptions.Item label="price" span={3}>
              100 JQS
            </Descriptions.Item>
          </Descriptions>
          <Button
            onClick={trade}
            type="primary"
            style={{ width: "293px", height: "50px" }}
          >
            구입
          </Button>
        </Col>
      </Row>
    </div>
  );
};
export default NftDetail;
