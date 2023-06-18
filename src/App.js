import "./style/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./components/Home";
import Table from "./components/Table";
import Breadcrumbs from "./components/Breadcrumbs";
import { useEffect, useState } from "react";
import NotFound from "./components/NotFound";
// import Books from "./components/useBooksData";
// import Authors from "./components/Auhors";

function App() {
  const [arr, setArr] = useState([
    ["/", "Search"],
    [undefined, undefined],
    [undefined, undefined],
    [undefined, undefined],
  ]);

  // function App() {
  //   const [arr, setArr] = useState([
  //     ["/", "Search"],
  //     ["/table/Andrzej Sapkowski/1", undefined],
  //     ["/table/Andrzej Sapkowski/1", undefined],
  //     ["/table/Andrzej Sapkowski/1/dDigzwEACAAJ", undefined],
  //   ]);

  const breadcrumbsNavigation = (value, index) => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index][1] = value;
      console.log("----------------");
      newArr.forEach((e, i) => {
        console.log(e, i);
        if (i === 1 && e[1] !== undefined) {
          console.log((e[0] = "/table/" + newArr[1][1] + "/" + "1"));
        } else if (i === 2 && e[1] !== undefined) {
          console.log((e[0] = "/table/" + newArr[1][1] + "/" + newArr[2][1]));
        } else if (i === 3 && e[1] !== undefined) {
          console.log(
            (e[0] =
              "/table/" +
              newArr[1][1] +
              "/" +
              newArr[2][1] +
              "/" +
              newArr[3][1])
          );
        }
      });
      console.log(newArr);
      // console.log(value, index);
      // console.log(newArr);
      return newArr;
    });
  };

  useEffect(() => {
    // console.log(arr);
  }, [arr]);

  return (
    <BrowserRouter>
      <main>
        <Breadcrumbs arr={arr} />
        <Routes>
          <Route index element={<Home />} />
          <Route
            path="/table"
            element={<Navigate to="/table/J. R. R. Tolkien/1" />}
          />
          <Route
            path="/table/:author/"
            element={<Table breadcrumbsNavigation={breadcrumbsNavigation} />}
          />
          <Route
            path="/table/:author/:pageId/"
            element={<Table breadcrumbsNavigation={breadcrumbsNavigation} />}
          />
          <Route
            path="/table/:author/:pageId/:bookId"
            element={<Table breadcrumbsNavigation={breadcrumbsNavigation} />}
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      {/* <Books author={"James Brennan"} /> */}
      {/* <Authors /> */}
    </BrowserRouter>
  );
}

export default App;
