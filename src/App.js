import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./Pages/Layout";
import Chart from "./Pages/Chart";
import Students from "./Pages/Students";
import StudentDetail from "./Components/StudentDetail";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Chart />} />
          <Route path="students" element={<Students />} />
          <Route path=":studentName" element={<Chart />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));

export default App;
