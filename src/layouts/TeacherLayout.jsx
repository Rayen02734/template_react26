import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';
import SearchBar from '../components/admin/SearchBar';
import NotificationButton from '../components/admin/NotificationButton';
import { LayoutDashboard, BookOpen, CalendarDays, Users, MessageCircleMore, Settings, Bot, UserCircle2 } from 'lucide-react';

const teacherLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/teacher/courses', label: 'Mes cours', icon: BookOpen },
    { to: '/teacher/live-courses', label: 'Sessions en direct', icon: CalendarDays },
    { to: '/teacher/students', label: 'Étudiants', icon: Users },
    { to: '/teacher/quizzes', label: 'Quiz & Exercices', icon: MessageCircleMore },
    { to: '/teacher/calendar', label: 'Calendrier', icon: CalendarDays },
    { to: '/teacher/ai-assistant', label: 'Assistant IA', icon: Bot },
    { to: '/teacher/profile', label: 'Profil', icon: UserCircle2 },
    { to: '/teacher/settings', label: 'Paramètres', icon: Settings },
];

export default function TeacherLayout() {
    const sections = [{ title: 'ESPACE', items: teacherLinks }];

    return (
        <AdminLayout
            title="Tableau de bord"
            subtitle="Espace formateur"
            sections={sections}
            actions={(
                <div className="flex items-center gap-3">
                    <SearchBar />
                    <NotificationButton count={4} />
                </div>
            )}
        >
            <Outlet />
        </AdminLayout>
    );
}
