import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuthStore from "./features/auth/useAuthStore";
const ProtectedRoutes = () => {
  const currentUser = useAuthStore((state) => state.currentUser);
  const location = useLocation();

  return currentUser?.accessToken ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
