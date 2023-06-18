import { useLocation, Link } from "react-router-dom";
import "../style/breadcrumbs.css";

function Breadcrumbs(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div className="breadcrumbs">
      {location.pathname !== "/" &&
        props.arr.map(
          (e, i) =>
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
