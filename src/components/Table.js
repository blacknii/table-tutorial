import { useState } from "react";
import BasicTable from "./BasicTable";
import InfoPanel from "./InfoPanel";
import "../style/table.css";

import { useParams } from "react-router-dom";
import { useBooksData } from "./useBooksData";

function Table() {
  const params = useParams();
  const author = params.author;
  const pageId = params.pageId;
  const bookId = params.bookId;

  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };
  //J. R. R. Tolkien
  const BooksData = useBooksData(author);

  return (
    <div className="table">
      <BasicTable
        getInfo={handleRowClick}
        page={pageId}
        book={bookId}
        author={author}
        BooksData={BooksData}
      />
      <InfoPanel data={data} BooksData={BooksData} />
    </div>
  );
}

export default Table;
