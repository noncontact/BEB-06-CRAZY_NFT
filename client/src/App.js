import React from "react";
import styled from "styled-components";
import { Calendar } from "antd";
import { InstagramOutlined } from "@ant-design/icons";

const StyledButton = styled.button`
  padding: 6px 12px;
  border-radius: 8px;
  font-size: 1rem;
  line-height: 1.5;
  border: 1px solid lightgray;
  color: gray;
  background: white;
`;

function App() {
  return (
    <div>
      <p>
        <InstagramOutlined />
      </p>
      <Calendar />
    </div>
  );
}

export default App;
