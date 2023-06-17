import React, { useEffect, useState } from "react";

function Books() {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [totalBooks, setTotalBooks] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:"JK Rowling"&startIndex=${startIndex}&maxResults=40&langRestrict=en`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        // Sort the fetched books by their published date
        data.items.sort((a, b) => {
          if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
            return 1;
          }
          if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
            return -1;
          }
          return 0;
        });

        setBooks((prevBooks) => [...prevBooks, ...data.items]);
        setStartIndex((prevStartIndex) => prevStartIndex + data.items.length);
        setTotalBooks(data.totalItems);
      }
    };

    fetchBooks();
  }, [startIndex]);

  if (startIndex < totalBooks) {
    return <div>Loading...</div>;
  }

  console.log(books[0]);

  return (
    <div>
      {books.map((book, index) => (
        <div key={index}>
          <h2>{book.volumeInfo.title}</h2>
          <p>{book.volumeInfo.description}</p>
          <p>ID: {book.id}</p>
          <p>
            Categories:{" "}
            {book.volumeInfo.categories
              ? book.volumeInfo.categories.join(", ")
              : "N/A"}
          </p>
          <p>Publisher: {book.volumeInfo.publisher}</p>
          <p>Published Date: {book.volumeInfo.publishedDate}</p>
          <p>Page Count: {book.volumeInfo.pageCount}</p>
          <p>Snippet: {book.searchInfo && book.searchInfo.textSnippet}</p>
          {book.volumeInfo.imageLinks &&
            book.volumeInfo.imageLinks.thumbnail && (
              <img
                src={book.volumeInfo.imageLinks.thumbnail}
                alt={book.volumeInfo.title}
              />
            )}
        </div>
      ))}
    </div>
  );
}

export default Books;
