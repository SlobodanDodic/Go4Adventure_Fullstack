import { useState, useContext } from "react";
import { AppShell, Navbar, Header, MediaQuery, Burger, useMantineTheme } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Topbar from "./Topbar";
import Leftbar from "./Leftbar/Leftbar";

export default function PrivateRoutes() {
  const { user } = useContext(AuthContext);

  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  return !!user ? (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 175, lg: 300 }}
          bg="gray.0"
          gap="lg"
          direction="column"
          sx={{ justifyContent: "space-between" }}
        >
          <Leftbar setOpened={setOpened} />
        </Navbar>
      }
      header={
        <Header height={{ base: 50, md: 70 }} p="md" bg="dark-blue">
          <div style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => setOpened((o) => !o)}
                size="sm"
                color={theme.colors.gray[0]}
                mr="xl"
              />
            </MediaQuery>
            <Topbar />
          </div>
        </Header>
      }
    >
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/login" />
  );
}
