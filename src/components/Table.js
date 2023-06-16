import { useState } from "react";
import BasicTable from "./BasicTable";
import InfoPanel from "./InfoPanel";
import "../style/table.css";

import { useParams } from "react-router-dom";

function Table() {
  const params = useParams();
  const pageId = params.pageId;
  const bookId = params.bookId;

  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };

  return (
    <div className="table">
      <BasicTable getInfo={handleRowClick} page={pageId} book={bookId} />
      <InfoPanel data={data} />
      <p>page = {pageId}</p>
      <p>book = {bookId}</p>
    </div>
  );
}

export default Table;
