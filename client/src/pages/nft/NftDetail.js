import {Image, Col, Row } from 'antd';
import React from 'react';
const NftDetail =()=>{

    return (
            <div>
                <Row>
                <Col span={6} offset={4}>
                <Image
                    width={200}
                    src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png"
                />
                </Col>
                <Col span={6} offset={4} style={{border:"1px solid red"}}>
                    NFT 정보
                </Col>
                </Row>
                <Row>
                    <Col span={12} offset={6} style={{border:"1px solid red"}}>
                        거래 컴포넌트
                    </Col>
                </Row>
                
            </div>
    );
};
export default NftDetail;