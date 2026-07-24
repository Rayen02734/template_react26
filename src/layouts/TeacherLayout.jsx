import { Outlet, useNavigate } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { LayoutDashboard, BookOpen, CalendarDays, Users, MessageCircleMore, Settings, Bot, UserCircle2 } from 'lucide-react';

const teacherLinks = [
    { to: '/teacher/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/teacher/courses', label: 'My Courses', icon: BookOpen },
    { to: '/teacher/live-courses', label: 'Live Courses', icon: CalendarDays },
    { to: '/teacher/students', label: 'Students', icon: Users },
    { to: '/teacher/quizzes', label: 'Quizzes & Exercises', icon: MessageCircleMore },
    { to: '/teacher/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/teacher/ai-assistant', label: 'AI Assistant', icon: Bot },
    { to: '/teacher/profile', label: 'Profile', icon: UserCircle2 },
    { to: '/teacher/settings', label: 'Settings', icon: Settings },
];

export default function TeacherLayout() {
    const { user, logout } = useAuth();
    const { t } = useLocale();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-page-bg px-4 py-4 text-text-primary transition-colors sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-card-border bg-card-bg px-6 py-5 shadow-card-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-text-secondary">{t('teacherWorkspace')}</p>
                        <h1 className="mt-1 text-2xl font-semibold text-text-primary">{t('teacherHub')}</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-2xl border border-card-border bg-surface px-3 py-2 text-sm font-medium text-text-primary">
                            {user?.name || 'Teacher Demo'} · {t('liveTeaching')}
                        </div>
                        <div className="rounded-2xl border border-card-border bg-surface px-3 py-2 text-sm text-text-secondary">
                            {t('premiumLmsView')}
                        </div>
                    </div>
                </header>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <Sidebar
                        title="Instructor Panel"
                        subtitle={t('teacherHub')}
                        label={t('teacher')}
                        description="Manage classes, students, schedules and analytics from a unified teacher console."
                        links={teacherLinks}
                        onLogout={handleLogout}
                        logoutLabel={t('logout')}
                    />
                    <main className="flex-1 min-w-0 rounded-[30px] border border-card-border bg-card-bg p-5 shadow-card-sm lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
