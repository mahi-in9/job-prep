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
    <div className="flex flex-col">
      <h1 className="text-2xl m-3 font-bold">SignUp</h1>

      <form action="submit" className="flex flex-col gap-2 m-4">
        <div className="flex gap-1">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            value={userData.title}
            onChange={handleChange}
            className="border rounded"
          />
        </div>
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
        </div>
        <div>
          <button
            type="submit"
            onClick={handleSubmit}
            className="border rounded p-1 hover:bg-mist-500 "
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default SignUp;
