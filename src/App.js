import "./style/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./components/Home";
import Table from "./components/Table";
import Breadcrumbs from "./components/Breadcrumbs";
import { useEffect, useState } from "react";
// import Books from "./components/useBooksData";
// import Authors from "./components/Auhors";

function App() {
  const [arr, setArr] = useState(["Search", undefined, undefined, undefined]);

  const breadcrumbsNavigation = (value, index) => {
    setArr((prevArr) => {
      const newArr = [...prevArr];
      newArr[index] = value;
      console.log(value, index);
      console.log(newArr);
      return newArr;
    });
  };

  useEffect(() => {
    console.log(arr);
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
        </Routes>
      </main>
      {/* <Books author={"James Brennan"} /> */}
      {/* <Authors /> */}
    </BrowserRouter>
  );
}

export default App;
