import { Outlet } from 'react-router-dom';
import Sidebar from '../components/Sidebar';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { BookOpen, BrainCircuit, CalendarDays, CreditCard, LayoutGrid, MessageCircleMore, Bell, Settings, UserCircle2 } from 'lucide-react';

const studentLinks = [
    { to: '/student/dashboard', label: 'Dashboard', icon: LayoutGrid },
    { to: '/student/learning', label: 'My Learning', icon: BookOpen },
    { to: '/student/live-courses', label: 'Live Courses', icon: CalendarDays },
    { to: '/student/quizzes', label: 'Quizzes & Exercises', icon: MessageCircleMore },
    { to: '/student/calendar', label: 'Calendar', icon: CalendarDays },
    { to: '/student/assistant', label: 'AI Assistant', icon: BrainCircuit },
    { to: '/student/payments', label: 'Payment History', icon: CreditCard },
    { to: '/student/notifications', label: 'Notifications', icon: Bell },
    { to: '/student/profile', label: 'Profile', icon: UserCircle2 },
    { to: '/student/settings', label: 'Settings', icon: Settings },
];

export default function StudentLayout() {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleSignOut = () => {
        logout();
        localStorage.removeItem('growup-user');
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-page-bg px-4 py-4 text-text-primary transition-colors sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-card-border bg-card-bg px-6 py-5 shadow-card-sm lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-text-secondary">Student Workspace</p>
                        <h1 className="mt-1 text-2xl font-semibold text-text-primary">Welcome back, {user?.name || 'Learner'}</h1>
                    </div>
                    <div className="rounded-2xl border border-card-border bg-surface px-3 py-2 text-sm font-medium text-text-primary">
                        Personal learning hub • Coursera-inspired experience
                    </div>
                </header>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <Sidebar
                        title="Student Panel"
                        subtitle="Learning Workspace"
                        label="Student"
                        description="Track courses, quizzes, payments, notifications, and AI support in one place."
                        links={studentLinks}
                        onLogout={handleSignOut}
                        logoutLabel="Sign Out"
                    />
                    <main className="flex-1 min-w-0 rounded-[30px] border border-card-border bg-card-bg p-5 shadow-card-sm lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
