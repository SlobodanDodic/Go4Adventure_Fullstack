import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
// Logged Out Pages
import AuthPage from "./pages/logged-out/AuthPage";
import ForgotPassword from "./pages/logged-out/ForgotPassword";
// Logged In Pages
import PrivateRoutes from "./components/PrivateRoutes";
import Dashboard from "./pages/logged-in/Dashboard";
import Tours from "./pages/logged-in/Tours";
import Activity from "./pages/logged-in/Activity";
import Finance from "./pages/logged-in/Finance";
import ProfilePage from "./pages/logged-in/ProfilePage";
import AddEditTours from "./pages/logged-in/AddEditTours";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications position="top-right" />
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/reset" element={<ForgotPassword />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<Dashboard />} />
            <Route path="/tours" element={<Tours />} />
            <Route path="/add-edit-tours" element={<AddEditTours />} />
            <Route path="/activity" element={<Activity />} />
            <Route path="/finance" element={<Finance />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}