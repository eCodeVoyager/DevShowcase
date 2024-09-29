import { Route, Routes } from "react-router-dom";
import { routeNames } from "../routes/route.data";
import RequireAuth from "./Layouts/AuthRequire";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import ForgotPassword from "./pages/Auth/ResetPassword";
import OtpVerification from "./pages/Auth/Verify";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import { NotFoundImage } from "./pages/NotFound";
import Profile from "./pages/profile";
import DashboardLayout from "./Layouts/DashboardLayout";
import ResetPassword from "./pages/Auth/SetPassword";

const App = () => {
  return (
    <Routes>
      <Route path="/">
        {/* public routes */}
        <Route path={routeNames.home} element={<Home />} />
        <Route path={routeNames.profile} element={<Profile />} />
        <Route path={routeNames.login} element={<Login />} />
        <Route path={routeNames.register} element={<Register />} />
        <Route path={routeNames.verify} element={<OtpVerification />} />
        <Route path={routeNames.forgotPassword} element={<ForgotPassword />} />
        {/* projected routes */}
        <Route
          path={routeNames.forgotSetPassword}
          element={<ResetPassword />}
        />
        {/* projected routes */}
        <Route element={<RequireAuth />}>
          <Route element={<DashboardLayout />}>
            <Route path={routeNames.dashboard} element={<Dashboard />} />
          </Route>
        </Route>
        <Route path="*" element={<NotFoundImage />} />
      </Route>
    </Routes>
  );
};
export default App;
