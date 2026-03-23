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
    <div>
      <h1>Login</h1>

      <form action="submit" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            value={userData.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            value={userData.password}
            onChange={handleChange}
          />
          <button type="submit">Login</button>
        </div>
      </form>
    </div>
  );
}

export default Login;
