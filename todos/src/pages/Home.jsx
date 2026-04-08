import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="grid grid-cols-1">
      <div className="p-3 font-extrabold text-2xl ">
        <h1>This is Home</h1>
      </div>
      <div className=" flex mx-2 gap-4 font-bold ">
        <Link to={"/todos"} className="border rounded p-3">
          Todos
        </Link>

        <Link to={"/signup"} className="border rounded p-3">
          SignUp
        </Link>

        <Link to={"/login"} className="border rounded p-3">
          Login
        </Link>
      </div>
      {/* <LogoutButton /> */}
    </div>
  );
}
export default Home;
