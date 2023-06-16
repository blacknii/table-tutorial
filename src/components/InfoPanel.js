import React from "react";
import MOCK_DATA from "./MOCK_DATA.json";
import "../style/info.css";

const showInfo = (index) => {
  return JSON.stringify(
    MOCK_DATA.filter((row) => row.id === parseInt(index)),
    null,
    2
  );
};

const InfoPanel = (props) => {
  return (
    <div className="info">
      <p>{showInfo(props.data)}</p>
    </div>
  );
};

export default InfoPanel;
