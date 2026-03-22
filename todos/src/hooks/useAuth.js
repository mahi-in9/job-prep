import { useEffect, useContext } from "react";
import { AuthContext } from "../context/authContext";
import { login, logout, getMe, register } from "../apis/api";

export const useAuth = () => {
  const context = useContext();
  const { setUser, user, setLoading, loading } = context;

  const handleRegister = async ({ username, email, password }) => {
    setLoading(true);
    try {
      const data = await register({ username, email, password });
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async ({ username, password }) => {
    setLoading(true);
    try {
      const data = await login({ username, password });
      setUser(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const data = await logout();
      setUser(null);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const getAndSetUser = async () => {
      try {
        const data = await getMe();
        setUser(data);
      } catch (error) {
        console.log(error);
      }
    };
    getAndSetUser();
  }, []);

  return [user, loading, handleLogin, handleRegister, handleLogout];
};
