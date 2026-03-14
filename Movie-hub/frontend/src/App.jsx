import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/movie" element={<Movies />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}

export default App;
