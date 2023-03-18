import { Navigate, Outlet, useLocation } from "react-router-dom";
import useUsersStore from "./features/users/useUsersStore";
const ProtectedRoutes = () => {
  const currentUser = useUsersStore((state) => state.currentUser);
  const location = useLocation();

  return currentUser?.user_uid ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default ProtectedRoutes;
