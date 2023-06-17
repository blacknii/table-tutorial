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
        // Extract authors from the fetched books and add them to the state
        const newAuthors = data.items.flatMap((item) =>
          item.volumeInfo.authors ? item.volumeInfo.authors : []
        );

        setAuthors((prevAuthors) => [
          ...new Set([...prevAuthors, ...newAuthors]),
        ]);
      }
    };

    fetchAuthors();
  }, []); // Empty dependency array means this effect runs once on mount

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
