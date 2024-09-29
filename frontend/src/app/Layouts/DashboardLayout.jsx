import { Navigate, Outlet, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { routeNames } from "../../routes/route.data";
import { useEffect } from "react";
import AuthService from "../../services/AuthService";
import { toast } from "sonner";
import Cookie from "js-cookie";
import { Loader } from "@mantine/core";

const DashboardLayout = () => {
  const { isAuthenticated, loadUser, logOut, isLoadingUser, setIsLoadingUser } =
    useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      setIsLoadingUser(true);
      try {
        const token = Cookie.get("token");
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
        logOut();
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
    <Navigate to={routeNames.login} replace />
  );
};
export default DashboardLayout;
