import { useState } from "react";
import BasicTable from "./BasicTable";
import InfoPanel from "./InfoPanel";
import "../style/table.css";

function Table() {
  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };

  return (
    <div className="table">
      <BasicTable getInfo={handleRowClick} />
      <InfoPanel data={data} />
    </div>
  );
}

export default Table;
