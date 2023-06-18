import { useLocation, Link } from "react-router-dom";
import "../style/breadcrumbs.css";

function Breadcrumbs(props) {
  const location = useLocation();
  const len = location.pathname.split("/").length;
  console.log(len);
  return (
    <div className="breadcrumbs">
      {location.pathname !== "/" &&
        len <= 5 &&
        location.pathname.includes("/table/") &&
        props.arr.map(
          (e) =>
            e[1] && (
              <>
                <Link to={e[0]}>{e[1]}</Link>
              </>
            )
        )}
    </div>
  );
}

export default Breadcrumbs;
