import { createContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";
import { useMediaQuery } from "@mantine/hooks";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useLocalStorage("user", null);
  const smallScreen = useMediaQuery("(max-width: 350px)");

  const loggedUser = {
    avatar:
      "https://www.rollingstone.com/wp-content/uploads/2018/06/r1289_fea_cornell_a-c8f5ec1b-7823-4cf3-8d90-a6efb330d280.jpg",
    name: " Sky2Run",
    email: "somerandommail@mail.com",
  };

  // const userData = user !== null ? loggedUser : null;

  return <AuthContext.Provider value={{ smallScreen, user, setUser, loggedUser }}>{children}</AuthContext.Provider>;
};

export default AuthContext;
