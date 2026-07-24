import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';

export default function AdminDashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-page-bg px-6 py-8 text-text-primary transition-colors lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
                <Sidebar onLogout={handleLogout} />
                <section className="flex-1 rounded-2xl border border-card-border bg-card-bg p-6 shadow-card-sm">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}
