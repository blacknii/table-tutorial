import "./style/App.css";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

//pages
import Home from "./components/Home";
import Table from "./components/Table";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/table" element={<Navigate to="/table/1" />} />
          <Route path="/table/:pageId/" element={<Table />} />
          <Route path="/table/:pageId/:bookId" element={<Table />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
