import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";
import useSWR from "swr";
import Spinner from "../components/common/Spinner";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useLocalStorage("token", null);
  const [role, setRole] = useLocalStorage("role", null);
  const smallScreen = useMediaQuery("(max-width: 350px)");

  const notificationcss = {
    root: { backgroundColor: "#01233e" },
    description: { color: "lightgray", fontSize: "0.75rem", fontWeight: "600" },
  };

  const instance = axios.create({
    withCredentials: true,
    baseURL: `${process.env.REACT_APP_SERVER}/`,
    headers: {
      Authorization: `Bearer ${user ? token : ""}`,
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
      "Content-Type": "application/x-www-form-urlencoded",
    },
  });

  const { data, error, isLoading } = useSWR(`/user/profile/${user}`, instance.get);

  const loggedUser = data?.data;

  if (isLoading) return <Spinner />;
  if (error) return console.log(error);

  return (
    <AuthContext.Provider
      value={{ role, setRole, notificationcss, smallScreen, user, setUser, setToken, loggedUser, instance }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
