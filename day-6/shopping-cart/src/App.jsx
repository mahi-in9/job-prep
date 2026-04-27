import { Routes, Route } from "react-router-dom";
import "./App.css";
import Products from "./pages/Products";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Products />} />
      </Routes>
    </>
  );
}

export default App;
