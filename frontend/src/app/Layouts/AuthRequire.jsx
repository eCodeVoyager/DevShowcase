import Cookie from "js-cookie";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import { routeNames } from "../../routes/route.data";
import useAuth from "../hooks/useAuth";
import { useEffect } from "react";
import { toast } from "sonner";
import AuthService from "../../services/AuthService";
const RequireAuth = () => {
  const location = useLocation();
  const { isAuthenticated, loadUser, logOut, isLoadingUser, setIsLoadingUser } =
    useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    const token = Cookie.get("token");
    (async () => {
      setIsLoadingUser(true);
      try {
        if (token) {
          const { data } = await AuthService.me();
          console.log(data);
          if (Array.isArray(data)) {
            loadUser(data[0]);
          } else {
            loadUser(data);
          }
        } else {
          navigate(routeNames.login);
          toast.error("Please login to access the dashboard");
        }
      } catch (error) {
        navigate(routeNames.login);
        logOut();
        toast.error("Please login to access the dashboard");
        console.log("Error while fetching user data : ", error);
      } finally {
        setIsLoadingUser(false);
      }
    })();
  }, []);
  if (isLoadingUser) {
    return (
      <div className="grid place-items-center min-h-screen">
        <h2 className="text-4xl font-semibold btn-shine">DevShowcase</h2>
      </div>
    );
  }
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={routeNames.login} replace state={{ from: location }} />
  );
};
export default RequireAuth;
