import { NavLink } from 'react-router-dom';
import { BookOpen, BrainCircuit, CalendarDays, CreditCard, LayoutGrid, MessageCircleMore, Bell, Settings, UserCircle2, LogOut } from 'lucide-react';

const sections = [
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

export default function StudentSidebar({ userName, onSignOut }) {
    return (
        <aside className="w-full rounded-[30px] border border-slate-200 bg-white/90 p-6 shadow-xl shadow-slate-200/50 backdrop-blur dark:border-slate-800 dark:bg-slate-900/90 dark:shadow-slate-950/40 lg:w-72 lg:sticky lg:top-8 lg:self-start">
            <div className="flex items-center gap-3 rounded-2xl border border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 px-4 py-3 dark:border-cyan-900/40 dark:from-cyan-950/30 dark:to-blue-950/30">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-sm font-bold text-white shadow-lg shadow-cyan-500/20">
                    S
                </div>
                <div>
                    <p className="text-sm font-semibold text-slate-900 dark:text-white">{userName || 'Student'}</p>
                    <p className="text-xs text-cyan-600 dark:text-cyan-400">GrowUp learner</p>
                </div>
            </div>

            <nav className="mt-6 space-y-1">
                {sections.map((section) => {
                    const Icon = section.icon;
                    return (
                        <NavLink
                            key={section.to}
                            to={section.to}
                            className={({ isActive }) => `flex items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium transition-all ${isActive ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/25' : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-100'}`}
                        >
                            <Icon className="h-4 w-4" />
                            {section.label}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-6 border-t border-slate-200 pt-6 dark:border-slate-800">
                <button
                    type="button"
                    onClick={onSignOut}
                    className="flex w-full items-center gap-3 rounded-2xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-rose-50 hover:text-rose-600 dark:text-slate-400 dark:hover:bg-rose-950/30 dark:hover:text-rose-400"
                >
                    <LogOut className="h-4 w-4" />
                    Sign Out
                </button>
            </div>
        </aside>
    );
}
