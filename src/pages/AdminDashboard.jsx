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
        <div className="min-h-screen bg-slate-50 px-6 py-8 text-slate-900 transition-colors dark:bg-slate-950 dark:text-slate-100 lg:px-8">
            <div className="mx-auto flex max-w-7xl flex-col gap-6 lg:flex-row">
                <Sidebar onLogout={handleLogout} />
                <section className="flex-1 rounded-3xl border border-slate-200 bg-white/80 p-6 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/40">
                    <Outlet />
                </section>
            </div>
        </div>
    );
}
