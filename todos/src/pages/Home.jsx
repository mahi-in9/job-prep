import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
// import { logoutUser } from "../app/slices/authSlice";

// function LogoutButton() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const handleLogout = async () => {
//     try {
//       await dispatch(logoutUser()).unwrap();
//       navigate("/login");
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return <button onClick={handleLogout}>Logout</button>;
// }

function Home() {
  return (
    <div>
      <h1>This is Home</h1>
      <Link to={"/todos"}>Todos</Link>
      <br />
      <Link to={"/signup"}>SignUp</Link>
      <br />
      <Link to={"/login"}>Login</Link>
      <br />
      {/* <LogoutButton /> */}
    </div>
  );
}
export default Home;
