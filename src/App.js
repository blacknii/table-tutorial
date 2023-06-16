import "./style/App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

//pages
import Home from "./components/Home";
import Table from "./components/Table";

function App() {
  return (
    <BrowserRouter>
      <main>
        <Routes>
          <Route index element={<Home />} />
          <Route path="/table" element={<Table />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
