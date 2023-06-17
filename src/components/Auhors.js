import React, { useEffect, useState } from "react";

function Authors() {
  const [authors, setAuthors] = useState([]);

  useEffect(() => {
    const fetchAuthors = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor&maxResults=40`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        const newAuthors = data.items.flatMap((item) =>
          item.volumeInfo.authors ? item.volumeInfo.authors : []
        );

        setAuthors((prevAuthors) => [
          ...new Set([...prevAuthors, ...newAuthors]),
        ]);
      }
    };

    fetchAuthors();
  }, []);

  return (
    <div>
      {authors.map((author, index) => (
        <div key={index}>
          <h2>{author}</h2>
        </div>
      ))}
    </div>
  );
}

export default Authors;
