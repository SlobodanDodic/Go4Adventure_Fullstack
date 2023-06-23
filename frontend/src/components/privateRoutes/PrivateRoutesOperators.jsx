import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../navbars/Topbar";
import Leftbar from "../navbars/Leftbar";

export default function PrivateRoutesOperators() {
  const { user, role } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  return !!user && role === "OPERATOR" ? (
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
