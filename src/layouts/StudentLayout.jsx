import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import SearchBar from '../components/admin/SearchBar';
import NotificationButton from '../components/admin/NotificationButton';
import { BookOpen, BrainCircuit, CalendarDays, CreditCard, LayoutGrid, MessageCircleMore, Bell, Settings, UserCircle2 } from 'lucide-react';

const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/student/learning', label: 'Mon apprentissage', icon: BookOpen },
    { to: '/student/live-courses', label: 'Cours en direct', icon: CalendarDays },
    { to: '/student/quizzes', label: 'Quiz & Exercices', icon: MessageCircleMore },
    { to: '/student/calendar', label: 'Calendrier', icon: CalendarDays },
    { to: '/student/assistant', label: 'Assistant IA', icon: BrainCircuit },
    { to: '/student/payments', label: 'Paiements', icon: CreditCard },
    { to: '/student/notifications', label: 'Notifications', icon: Bell },
    { to: '/student/profile', label: 'Profil', icon: UserCircle2 },
    { to: '/student/settings', label: 'Paramètres', icon: Settings },
];

export default function StudentLayout() {
    const sections = [{ title: 'ESPACE', items: studentLinks }];

    return (
        <AdminLayout
            title="Tableau de bord"
            subtitle="Espace étudiant"
            sections={sections}
            actions={(
                <div className="flex items-center gap-3">
                    <SearchBar />
                    <NotificationButton count={2} />
                </div>
            )}
        >
            <Outlet />
        </AdminLayout>
    );
}
