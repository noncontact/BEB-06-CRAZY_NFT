import { List } from "antd";
import { useSelector } from "react-redux";
import { clubEntryList } from "../../../api/my"; //clubEntry
import React, { useEffect } from "react"; //useState, 

const ClubEntryList = () => {
  // const [entry, setEntry] = useState([]);
  const { address } = useSelector((state) => {
    return state.account;
  });
  useEffect(() => {
    const fetchData = async () => {
      const contents = await clubEntryList(address, 1);
      // setEntry(contents.data.data.signup_list);
      console.log(contents.data.data.signup_list);
    };

    fetchData();
  }, []);
  const data = [
    "Racing car sprays burning fuel into crowd.",
    "Japanese princess to wed commoner.",
    "Australian walks 100km after outback crash.",
    "Man charged over missing wedding girl.",
    "Los Angeles battles huge wildfires.",
  ];
  return (
    <List
      size="large"
      header={<div>Header</div>}
      footer={<div>Footer</div>}
      dataSource={data}
      renderItem={(item) => (
        <List.Item style={{ border: "1px solid gray" }}>{item}</List.Item>
      )}
    />
  );
};
export default ClubEntryList;
