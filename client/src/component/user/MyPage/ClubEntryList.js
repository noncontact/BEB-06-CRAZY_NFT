import { List, Avatar, message } from "antd";
import { useSelector } from "react-redux";
import { clubEntry, clubEntryList } from "../../../api/my"; //
import React, { useState, useEffect } from "react"; //,

const ClubEntryList = () => {
  const [entry, setEntry] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      try {
        const contents = await clubEntryList(address, 1);
        setEntry(contents.data.data.signup_list);
        console.log(contents.data.data.signup_list);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, []);
  const acceptEntry = async () => {
    try {
      await clubEntry(address, 1);
      message.success("승인 됐습니다");
    } catch (error) {
      message.error("승인이 실패 했습니다");
    }
  };
  return (
    <List
      size="large"
      dataSource={entry}
      renderItem={(item) => (
        <List.Item style={{ border: "1px solid gray" }}>
          <List.Item.Meta
            avatar={<Avatar src={item.profileurl} />}
            title={<p>{item.nickname}</p>}
            description={item.createdAt}
          />
          <button onClick={acceptEntry}>승인</button>
        </List.Item>
      )}
    />
  );
};
export default ClubEntryList;
