import { useContext } from "react";
import { AuthContext } from "../../store/Auth-Context";
import { Navigate, Outlet } from "react-router-dom";

export const ProtectedRoutes = () => {
    const { isAuthenticated } = useContext(AuthContext);
    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }
    return <Outlet />
}