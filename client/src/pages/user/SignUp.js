import React,{ useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Button,Layout } from "antd";
import {SketchOutlined} from "@ant-design/icons";
import Caver from 'caver-js'

const {Sider,Content}=Layout;

const SignUp =()=>{
    const navigate=useNavigate();
    const [account,setAccount]=useState({
        txType: null,
        account: '',
        balance: 0,
        network: null,
    });

    const loadAccountInfo = async () => {
        const { klaytn } = window
    
        if (klaytn) {
          try {
            await klaytn.enable()
            setAccountInfo(klaytn)
            setNetworkInfo();
            klaytn.on('accountsChanged', () => setAccountInfo(klaytn))
          } catch (error) {
            console.log('User denied account access')
          }
        } else {
          console.log('Non-Kaikas browser detected. You should consider trying Kaikas!')
        }
      }
    
    const setAccountInfo = async () => {
        const { klaytn } = window
        if (klaytn === undefined) return
        const caver = new Caver(klaytn)
        const account = klaytn.selectedAddress
        const balance = await caver.klay.getBalance(account)
        setAccount({
          account,
          balance: caver.utils.fromPeb(balance, 'KLAY'),
        })
      }
    
    const  setNetworkInfo = () => {
        const { klaytn } = window
        if (klaytn === undefined) return
    
        setAccount({ network: klaytn.networkVersion })
        klaytn.on('networkChanged', () => setNetworkInfo(klaytn.networkVersion))
      }

    return (
        <Layout>
            <Sider align="center" style={{height:"100vh",background:"white"}}>
              <div onClick={()=>navigate("/")}>home</div>
            </Sider>
            <Layout>
                
                <Content style={{border:"1px solid violet"}} align="center">
                    <Button onClick={loadAccountInfo} type="primary" shape="round" icon={<SketchOutlined />} style={{minHeight:"44px",minWidth:"280px"}}>
                    Kaikas
                    </Button>
                    <div>{account.account}</div>
                    <div>{account.balance}</div>
                    <div>{account.network}</div>
                </Content>
                
            </Layout>
        </Layout>
    );
};
export default SignUp;