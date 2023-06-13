import { useState, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { AppShell } from "@mantine/core";
import { Navigate, Outlet } from "react-router-dom";
import Topbar from "../navbars/Topbar";
import LeftbarOperators from "../navbars/LeftbarOperators";

export default function PrivateRoutesOperators() {
  const { user } = useContext(AuthContext);
  const [opened, setOpened] = useState(false);

  return !!user ? (
    <AppShell
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={<LeftbarOperators setOpened={setOpened} opened={opened} />}
      header={<Topbar opened={opened} setOpened={setOpened} />}
    >
      <Outlet />
    </AppShell>
  ) : (
    <Navigate to="/auth" />
  );
}
