import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import { routeNames } from "../routes/route.data";
import Profile from "./pages/profile";
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";
import RequireAuth from "./Layouts/AuthRequire";
import Dashboard from "./pages/Dashboard";
import { NotFoundImage } from "./pages/NotFound";
import ForgotPassword from "./pages/Auth/ResetPassword";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/">
          {/* public routes */}
          <Route path={routeNames.home} element={<Home />} />
          <Route path={routeNames.profile} element={<Profile />} />
          <Route path={routeNames.login} element={<Login />} />
          <Route path={routeNames.register} element={<Register />} />
          <Route
            path={routeNames.forgotPassword}
            element={<ForgotPassword />}
          />
          {/* projected routes */}
          <Route element={<RequireAuth />}>
            <Route path={routeNames.dashboard} element={<Dashboard />} />
          </Route>
          <Route path="*" element={<NotFoundImage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};
export default App;
