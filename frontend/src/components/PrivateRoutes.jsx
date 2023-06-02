import { useState, useContext } from "react";
import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import Topbar from "./Navbars/Topbar";
import Leftbar from "./Navbars/Leftbar";

export default function PrivateRoutes() {
  const { user } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  return !!user ? (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<Leftbar setOpened={setOpened} opened={opened} />}
      header={<Topbar opened={opened} setOpened={setOpened} />}
    >
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/auth" />
  );
}
