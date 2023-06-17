// useBooksData.js
import { useEffect, useState } from "react";

export function useBooksData(author) {
  const [books, setBooks] = useState([]);
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      const response = await fetch(
        `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&startIndex=${startIndex}&maxResults=40&langRestrict=en`
      );
      const data = await response.json();

      if (data.items && data.items.length > 0) {
        data.items.sort((a, b) => {
          if (a.volumeInfo.publishedDate < b.volumeInfo.publishedDate) {
            return 1;
          }
          if (a.volumeInfo.publishedDate > b.volumeInfo.publishedDate) {
            return -1;
          }
          return 0;
        });

        const processedBooks = data.items.map((book) => {
          return {
            id: book.id,
            title: book.volumeInfo.title,
            description: book.volumeInfo.description,
            categories: book.volumeInfo.categories
              ? book.volumeInfo.categories.join(", ")
              : "N/A",
            publisher: book.volumeInfo.publisher,
            publishedDate: book.volumeInfo.publishedDate,
            pageCount: book.volumeInfo.pageCount,
            snippet: book.searchInfo && book.searchInfo.textSnippet,
            thumbnail:
              book.volumeInfo.imageLinks &&
              book.volumeInfo.imageLinks.thumbnail,
          };
        });

        setBooks((prevBooks) => [...prevBooks, ...processedBooks]);
        setStartIndex((prevStartIndex) => prevStartIndex + data.items.length);
      }
    };

    fetchBooks();
  }, [startIndex, author]);

  return books;
}
