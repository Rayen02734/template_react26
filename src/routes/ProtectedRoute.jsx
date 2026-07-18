import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute() {
    const { user } = useAuth();

    if (!user || !['admin', 'student'].includes(user.role)) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
