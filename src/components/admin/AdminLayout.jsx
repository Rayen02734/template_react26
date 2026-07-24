import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Menu, Plus } from 'lucide-react';
import Sidebar from './Sidebar';
import Header from './Header';
import SearchBar from './SearchBar';
import NotificationButton from './NotificationButton';
import Button from '../ui/Button';
import { useAuth } from '../../context/AuthContext';

const menuSections = [
    {
        title: 'APERÇU',
        items: [
            { label: 'Tableau de bord', to: '/admin/dashboard', icon: 'dashboard' },
            { label: 'Rapports', to: '/admin/statistics', icon: 'analytics' },
        ],
    },
    {
        title: 'GESTION',
        items: [
            { label: 'Utilisateurs', to: '/admin/users', icon: 'users' },
            { label: 'Cours', to: '/admin/courses', icon: 'courses' },
            { label: 'Formateurs', to: '/admin/users', icon: 'teachers' },
            { label: 'Paiements', to: '/admin/payments', icon: 'payments' },
        ],
    },
    {
        title: 'SYSTÈME',
        items: [
            { label: 'Paramètres', to: '/admin/settings', icon: 'settings' },
            { label: 'Journaux', to: '/admin/ai', icon: 'logs' },
        ],
    },
];

export default function AdminLayout({ children, title, subtitle, sections }) {
    const [mobileOpen, setMobileOpen] = useState(false);
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login', { replace: true });
    };

    return (
        <div className="min-h-screen bg-[#F6F8FC] text-[#0F172A]">
            <div className="flex min-h-screen">
                <div className="lg:hidden">
                    <button
                        type="button"
                        onClick={() => setMobileOpen(true)}
                        className="fixed left-4 top-4 z-30 rounded-2xl border border-[#E2E8F0] bg-white p-3 shadow-sm"
                        aria-label="Open sidebar"
                    >
                        <Menu className="h-5 w-5 text-[#0F172A]" />
                    </button>
                </div>

                <Sidebar mobileOpen={mobileOpen} onClose={() => setMobileOpen(false)} sections={sections || menuSections} />

                <main className="flex-1 px-4 py-4 sm:px-6 lg:px-8 lg:py-8">
                    <Header
                        title={title}
                        subtitle={subtitle}
                        actions={(
                            <div className="flex items-center gap-3">
                                <SearchBar />
                                <NotificationButton count={3} />
                                <Button className="gap-2 rounded-2xl px-4 py-3">
                                    <Plus className="h-4 w-4" />
                                    <span>+ Ajouter un cours</span>
                                </Button>
                                <Button variant="ghost" className="gap-2 rounded-2xl px-4 py-3" onClick={handleLogout}>
                                    <span>Déconnexion</span>
                                </Button>
                            </div>
                        )}
                    />
                    <div className="mt-6">{children}</div>
                </main>
            </div>
        </div>
    );
}
