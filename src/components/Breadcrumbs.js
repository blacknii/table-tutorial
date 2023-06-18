import { useLocation, Link } from "react-router-dom";

function Breadcrumbs(props) {
  const location = useLocation();
  console.log(location.pathname);
  return (
    <div>
      {location.pathname !== "/" &&
        props.arr.map((e, i) => (
          <>
            <Link to={e[0]}>{e[1]}</Link>
            <br />
          </>
        ))}
    </div>
  );
}

export default Breadcrumbs;
