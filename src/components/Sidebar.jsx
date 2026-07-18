import { BarChart3, Bot, CreditCard, LayoutDashboard, LogOut, Settings, Sparkles, Users, BookOpen } from 'lucide-react';
import { NavLink } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

export default function Sidebar({ onLogout }) {
    const { theme, toggleTheme } = useTheme();
    const { t } = useLocale();

    const links = [
        { to: '/admin/dashboard', label: t('dashboard'), icon: LayoutDashboard },
        { to: '/admin/users', label: t('users'), icon: Users },
        { to: '/admin/courses', label: t('courses'), icon: BookOpen },
        { to: '/admin/payments', label: t('payments'), icon: CreditCard },
        { to: '/admin/statistics', label: t('statistics'), icon: BarChart3 },
        { to: '/admin/ai', label: t('aiInsights'), icon: Bot },
        { to: '/admin/settings', label: t('settings'), icon: Settings },
    ];

    return (
        <aside className="w-full rounded-[32px] border border-slate-200 bg-white/80 p-6 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.22)] backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 lg:w-72">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{t('admin')}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{t('growUpConsole')}</h2>
                </div>
                <button onClick={toggleTheme} className="rounded-full border border-slate-300 p-2 text-slate-600 transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-300" aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
            <div className="mt-6 rounded-[24px] border border-cyan-100 bg-cyan-50/70 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/30">
                <div className="flex items-center gap-2 text-sm font-semibold text-cyan-700 dark:text-cyan-300"><Sparkles size={16} /> {t('operationalOverview')}</div>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{t('everythingYourTeamNeeds')}</p>
            </div>
            <nav className="mt-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium transition ${isActive
                                    ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20'
                                    : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                                }`
                            }
                        >
                            <Icon size={16} />
                            {link.label}
                        </NavLink>
                    );
                })}
            </nav>
            <button onClick={onLogout} className="mt-8 flex w-full items-center justify-center gap-2 rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-300">
                <LogOut size={16} /> {t('logout')}
            </button>
        </aside>
    );
}
