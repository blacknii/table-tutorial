import { Link } from "react-router-dom";
import "../style/notFound.css";

export default function NotFound() {
  return (
    <div className="notfound">
      <h2>Page not found!</h2>
      <p>
        Go to the <Link to="/">Homepage</Link>.
      </p>
    </div>
  );
}
