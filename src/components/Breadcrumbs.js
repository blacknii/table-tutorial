import { useState } from "react";
import { Link } from "react-router-dom";

function Breadcrumbs(props) {
  return (
    <div>
      {props.arr.map((e, i) => (
        <>
          <Link to={"/"}>{e}</Link>
          <br />
        </>
      ))}
    </div>
  );
}

export default Breadcrumbs;
