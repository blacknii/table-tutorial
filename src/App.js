import { useState } from "react";
import BasicTable from "./components/BasicTable";
import InfoPanel from "./components/InfoPanel";
import "./style/App.css";

function App() {
  const [data, setData] = useState(0);

  const handleRowClick = (index) => {
    setData(index);
  };

  return (
    <div className="App">
      <BasicTable getInfo={handleRowClick} />
      <InfoPanel data={data} />
    </div>
  );
}

export default App;
