import "../style/home.css";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home">
      <h1>HOME</h1>
      <Link to={"table"}>go to table</Link>
    </div>
  );
}

export default Home;
