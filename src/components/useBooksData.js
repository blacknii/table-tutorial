import { useEffect, useState } from "react";
import axios from "axios";

export function useBooksData(author) {
  const [books, setBooks] = useState([]);
  const [bookIDs, setBookIDs] = useState(new Set());
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const fetchBooks = async () => {
      axios
        .get(
          `https://www.googleapis.com/books/v1/volumes?q=inauthor:"${author}"&startIndex=${startIndex}&maxResults=40`
        )
        .then((res) => {
          const data = res.data;
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

            const processedBooks = data.items.reduce((newBooks, book) => {
              if (!bookIDs.has(book.id)) {
                newBooks.push({
                  id: book.id,
                  title: book.volumeInfo.title,
                  description: book.volumeInfo.description,
                  categories: book.volumeInfo.categories
                    ? book.volumeInfo.categories.join(", ")
                    : "N/A",
                  publisher: book.volumeInfo.publisher,
                  publishedDate: book.volumeInfo.publishedDate,
                  pageCount: book.volumeInfo.pageCount,
                  language: book.volumeInfo.language,
                  snippet: book.searchInfo && book.searchInfo.textSnippet,
                  thumbnail:
                    book.volumeInfo.imageLinks &&
                    book.volumeInfo.imageLinks.thumbnail,
                });
                bookIDs.add(book.id);
              }

              return newBooks;
            }, []);

            setBooks((prevBooks) => [...prevBooks, ...processedBooks]);
            setBookIDs(bookIDs);
            setStartIndex(
              (prevStartIndex) => prevStartIndex + processedBooks.length
            );
          }
        })
        .catch((err) => console.log(err));
    };

    fetchBooks();
  }, [startIndex, author, bookIDs]);

  return books;
}
