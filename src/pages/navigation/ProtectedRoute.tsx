import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import type { RootState } from "../../api/store";

const ProtectedRoute = () => {
  const { token } = useSelector((state: RootState) => state.admin);

  if (!token) {
    return <Navigate to="/app/admin" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
