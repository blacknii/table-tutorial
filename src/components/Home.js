// Home.js

import { useState } from "react";
import "../style/home.css";
import { Link } from "react-router-dom";
import axios from "axios";

function Home() {
  const [search, setSearch] = useState("");
  const [authors, setAuthors] = useState([]);

  const searchBook = () => {
    axios
      .get(
        "https://www.googleapis.com/books/v1/volumes?q=inauthor:" +
          search +
          "&key=AIzaSyD9AulRjx3A6ZJb7cP4e_t1r8Ow0pyfuXw"
      )
      .then((res) => {
        let authorsSet = new Set();
        for (let item of res.data.items) {
          if (item.volumeInfo.authors) {
            for (let author of item.volumeInfo.authors) {
              authorsSet.add(author);
            }
          }
        }
        setAuthors([...authorsSet]);
      })
      .catch((err) => console.log(err));
  };

  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      searchBook();
    }
  };

  return (
    <div className="home">
      <h1 className="title">AUTHORS</h1>
      <h2 className="subtitle">Search for an Author</h2>
      <div className="search">
        <input
          type="text"
          placeholder="Enter Your Author Name"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyPress={handleKeyPress} // added handleKeyPress event
        />
        <button onClick={searchBook} className="searchButton">
          search
        </button>
      </div>
      <div className="authors">
        {authors.map((author) => (
          <Link to={`table/${author}/1`} className="authorLink">
            <h3 className="authorName">{author}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
