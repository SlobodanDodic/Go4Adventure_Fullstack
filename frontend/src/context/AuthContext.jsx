import { createContext, useState } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMediaQuery } from "@mantine/hooks";
import axios from "axios";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const [token, setToken] = useState(null);
  const smallScreen = useMediaQuery("(max-width: 350px)");

  const notificationcss = {
    root: { backgroundColor: "#01233e" },
    description: { color: "lightgray", fontSize: "0.75rem", fontWeight: "600" },
  };

  // const role = "user";
  const role = "admin";

  const loggedUser = {
    avatar:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/r1289_fea_cornell_a-c8f5ec1b-7823-4cf3-8d90-a6efb330d280.jpg",
    name: " Sky2Run",
    email: "somerandommail@mail.com",
  };

  // const userData = user !== null ? loggedUser : null;

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

  return (
    <AuthContext.Provider value={{ role, notificationcss, smallScreen, user, setUser, setToken, loggedUser, instance }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
