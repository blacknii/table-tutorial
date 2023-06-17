import "../style/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>HOME</h1>
      <Link to={"table/J. R. R. Tolkien/1"}>go to table</Link>
    </div>
  );
}

export default Home;
