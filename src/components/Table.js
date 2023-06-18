import { useEffect, useState } from "react";
import BasicTable from "./BasicTable";
import InfoPanel from "./InfoPanel";
import "../style/table.css";

import { useParams } from "react-router-dom";
import { useBooksData } from "./useBooksData";

function Table(props) {
  const params = useParams();
  const author = params.author;
  const pageId = params.pageId;
  const bookId = params.bookId;

  console.log(params, author, pageId, bookId);

  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };
  //J. R. R. Tolkien
  const BooksData = useBooksData(author);

  // console.log(author);

  useEffect(() => {
    // console.log(author);
    props.breadcrumbsNavigation(author, 1);
    props.breadcrumbsNavigation(pageId, 2);
    props.breadcrumbsNavigation(bookId, 3);
  }, [author, pageId, bookId]);

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
