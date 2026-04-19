import { useState } from "react";
import { loginUser } from "../app/slices/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

function Login() {
  const [userData, setUserData] = useState({
    email: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await dispatch(loginUser(userData));
    if (res.meta.requestStatus === "fulfilled") {
      navigate("/");
    }
    setUserData({
      email: "",
      password: "",
    });
  };

  
  return (
    <div className="flex flex-col">
      <h1 className="text-2xl m-3 font-bold">Login</h1>

      <form
        action="submit"
        onSubmit={handleSubmit}
        className="flex flex-col gap-3 m-5 "
      >
        <div className="flex gap-1">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
            className="border rounded"
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
            className="border rounded"
          />
          <button
            type="submit"
            className="border rounded p-1 hover:bg-fuchsia-100 "
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );
}

export default Login;
