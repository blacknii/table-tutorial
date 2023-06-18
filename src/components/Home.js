import { useState } from "react";
import "../style/home.css";
import { Link } from "react-router-dom";
import { useAuthorData } from "./useAuthorData"; // import the new hook

function Home() {
  const [search, setSearch] = useState("");
  const authors = useAuthorData(search); // use the new hook

  const handleKeyPress = (evt) => {
    if (evt.key === "Enter") {
      setSearch(evt.target.value);
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
      </div>
      <div className="authors">
        {authors.map((author) => (
          <Link to={`table/${author}/1`} className="authorLink" key={author}>
            <h3 className="authorName">{author}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default Home;
