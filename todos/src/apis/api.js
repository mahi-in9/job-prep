import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost3000",
  withCredentials: true,
});

export async function register({ username, email, password }) {
  try {
    const response = await api.post("/api/auth/register", {
      username,
      email,
      password,
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
}
export async function login({ username, password }) {
  try {
    const res = await api.post("/api/auth/login", { username, password });
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function logout() {
  try {
    const res = await api.get("/api/auth/logout");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}

export async function getMe() {
  try {
    const res = await api.get("/api/auth/");
    return res.data;
  } catch (error) {
    console.log(error);
  }
}
