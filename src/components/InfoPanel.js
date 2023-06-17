import React from "react";
// import MOCK_DATA from "./MOCK_DATA.json";
import "../style/info.css";

const InfoPanel = (props) => {
  const showInfo = (index) => {
    // console.log(props.BooksData);
    return JSON.stringify(
      props.BooksData.filter((row) => {
        // console.log(row.id, row.description, index, row.id === index);
        // console.log(row.id);
        return row.id === index;
      }),
      null,
      2
    );
  };

  return (
    <div className="info">
      <p>{showInfo(props.data)}</p>
    </div>
  );
};

export default InfoPanel;
