import React, { useState } from "react";
import styled from "styled-components";
import { Button, message } from "antd";
import Icon, { CheckCircleTwoTone } from "@ant-design/icons";
import KaikasSvg from "component/common/KaikasImage";

const KaikasIcon = (props) => <Icon component={KaikasSvg} {...props} />;

const ButtonKaikas = styled(Button)`
  height: 45px;
`;

const Account = ({ address, setAddress }) => {
  const [flagAccount, setFlagAccount] = useState(false);

  const connectAccounts = async () => {
    const { klaytn } = window;
    if (klaytn.isKaikas) {
      try {
        await klaytn.enable();
        const accounts = klaytn.selectedAddress;
        const networkVersion = klaytn.networkVersion;
        setAddress(accounts);
        setFlagAccount(true);

        // 지갑 변경
        klaytn.on("accountsChanged", (accounts) => {
          console.log("accountChanged", accounts, accounts.networkVersion);
          setAddress(accounts);
        });

        klaytn.on("disconnected", function () {
          console.log("연결해제");
          setFlagAccount(false);
        });
      } catch (error) {
        message.error("User denied account access");
      }
    } else {
      message.error(
        "Non-Kaikas browser detected. You should consider trying Kaikas!"
      );
    }
  };

  return (
    <>
      <CheckCircleTwoTone twoToneColor="#52c41a" hidden={!flagAccount} />
      <ButtonKaikas
        onClick={connectAccounts}
        type="primary"
        shape="round"
        height="300px"
      >
        <KaikasIcon />
        {!!address ? address : "Connect to Kaikas"}
      </ButtonKaikas>
    </>
  );
};

export default Account;
