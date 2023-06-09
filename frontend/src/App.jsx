import { BrowserRouter, Routes, Route } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { theme } from "./theme";
// Logged Out Pages
import AuthPage from "./pages/logged-out/AuthPage";
import ForgotenPassword from "./pages/logged-out/ForgotenPassword";
import Activation from "./pages/logged-out/Activation";
import ResetPassword from "./pages/logged-out/ResetPassword";
// Logged In Pages
import PrivateRoutes from "./components/PrivateRoutes";
import PrivateRoutesOperators from "./components/PrivateRoutesOperators";
import Home from "./pages/logged-in/users/Home";
import Tours from "./pages/logged-in/operators/Tours";
import Activity from "./pages/logged-in/operators/Activity";
import Finance from "./pages/logged-in/operators/Finance";
import ProfilePage from "./pages/logged-in/users/ProfilePage";
import AddEditTours from "./pages/logged-in/operators/AddEditTours";
import Tour from "./pages/logged-in/operators/Tour";
import Dashboard from "./pages/logged-in/operators/Dashboard";
import ToursUsers from "./pages/logged-in/users/TourUsers";
import ActivityUsers from "./pages/logged-in/users/ActivityUsers";

export default function App() {
  return (
    <MantineProvider withGlobalStyles withNormalizeCSS theme={theme}>
      <Notifications position="top-right" autoClose={3000} containerWidth="20rem" zIndex={2077} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/reset" element={<ForgotenPassword />} />
          <Route path="activate/:token" element={<Activation />} />
          <Route path="/reset-password/:token" element={<ResetPassword />} />
          <Route element={<PrivateRoutesOperators />}>
            <Route path="/operators" element={<Dashboard />} />
            <Route path="/operators/tours" element={<Tours />} />
            <Route path="/operators/tours/:title" element={<Tour />} />
            <Route path="/operators/tours/add-edit-tours" element={<AddEditTours />} />
            <Route path="/operators/activity" element={<Activity />} />
            <Route path="/operators/finance" element={<Finance />} />
            <Route path="/operators/profile" element={<ProfilePage />} />
          </Route>
          <Route element={<PrivateRoutes />}>
            <Route path="/home" element={<Home />} />
            <Route path="/home/:title" element={<ToursUsers />} />
            <Route path="/:title" element={<ToursUsers />} />
            <Route path="/activity" element={<ActivityUsers />} />
            <Route path="/profile" element={<ProfilePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
}
