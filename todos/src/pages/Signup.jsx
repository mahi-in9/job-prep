import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { registerUser } from "../app/slices/authSlice";
import { useNavigate } from "react-router-dom";

function SignUp() {
  const dispatch = useDispatch();

  const [userData, setUserData] = useState({
    title: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(registerUser(userData));

    navigate("/login");

    setUserData({
      title: "",
      email: "",
      password: "",
    });
  };

  const handleChange = (e) => {
    const { value, name } = e.target;

    setUserData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <>
      <h1>SignUp</h1>

      <form action="submit">
        <div>
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={userData.title}
            onChange={handleChange}
          />
        </div>
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
        </div>
        <div>
          <button type="submit" onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

export default SignUp;
