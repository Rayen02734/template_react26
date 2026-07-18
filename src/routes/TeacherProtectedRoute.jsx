import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function TeacherProtectedRoute() {
    const { user } = useAuth();

    if (!user || user.role !== 'teacher') return <Navigate to="/teacher/login" replace />;
    return <Outlet />;
}
