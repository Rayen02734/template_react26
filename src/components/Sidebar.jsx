import { BarChart3, Bot, CreditCard, LayoutDashboard, LogOut, Settings, Users, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';

const defaultLinks = [
    { to: '/admin/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { to: '/admin/users', label: 'Users', icon: Users },
    { to: '/admin/courses', label: 'Courses', icon: BookOpen },
    { to: '/admin/payments', label: 'Payments', icon: CreditCard },
    { to: '/admin/statistics', label: 'Statistics', icon: BarChart3 },
    { to: '/admin/ai', label: 'AI Insights', icon: Bot },
    { to: '/admin/settings', label: 'Settings', icon: Settings },
];

export default function Sidebar({
    title = 'Admin Panel',
    subtitle = 'GrowUp Console',
    label = 'Admin',
    description,
    links = defaultLinks,
    onLogout,
    logoutLabel = 'Logout',
}) {
    const { theme, toggleTheme } = useTheme();

    return (
        <aside className="w-full rounded-3xl border border-card-border bg-sidebar-bg text-white p-6 shadow-sm lg:w-72">
            <div className="flex items-center justify-between gap-4">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{label}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{subtitle}</h2>
                </div>
                <button onClick={toggleTheme} className="rounded-xl border border-white/10 bg-white/10 px-2 py-2 text-sm text-white transition hover:bg-white/20" aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
            {description ? (
                <div className="mt-6 rounded-2xl bg-surface p-4 text-sm text-text-secondary">
                    {description}
                </div>
            ) : null}
            <nav className="mt-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-2xl px-3 py-3 text-sm font-medium transition ${isActive
                                    ? 'bg-primary/10 text-primary'
                                    : 'text-text-secondary hover:bg-surface hover:text-text-primary'
                                }`
                            }
                        >
                            <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-surface text-text-primary">
                                <Icon className="h-5 w-5" />
                            </div>
                            <span className="flex-1">{link.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
            {onLogout ? (
                <button
                    onClick={onLogout}
                    className="mt-8 flex w-full items-center justify-center gap-2 rounded-2xl bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary-hover"
                >
                    <LogOut className="h-4 w-4" />
                    {logoutLabel}
                </button>
            ) : null}
        </aside>
    );
}
