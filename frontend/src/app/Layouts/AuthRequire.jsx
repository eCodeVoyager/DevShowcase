import { Outlet, Navigate, useLocation } from "react-router-dom";
import Cookie from "js-cookie";
import { routeNames } from "../../routes/route.data";
const RequireAuth = () => {
  const token = Cookie.get("token");
  const location = useLocation();
  return token ? (
    <Outlet />
  ) : (
    <Navigate to={routeNames.login} replace state={{ from: location }} />
  );
};
export default RequireAuth;
