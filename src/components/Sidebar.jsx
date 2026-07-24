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
        <aside className="w-full rounded-2xl bg-sidebar-bg text-white p-6 lg:w-72">
            <div className="flex items-center justify-between">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-text-secondary">{t('admin')}</p>
                    <h2 className="mt-2 text-2xl font-semibold text-white">{t('growUpConsole')}</h2>
                </div>
                <button onClick={toggleTheme} className="rounded-xl p-2 text-sm bg-white/5" aria-label="Toggle theme">
                    {theme === 'dark' ? '☀️' : '🌙'}
                </button>
            </div>
            <div className="mt-6 rounded-xl bg-white/4 p-4">
                <div className="flex items-center gap-2 text-sm font-semibold text-white/90"><Sparkles size={16} /> {t('operationalOverview')}</div>
                <p className="mt-2 text-sm text-white/70">{t('everythingYourTeamNeeds')}</p>
            </div>
            <nav className="mt-6 space-y-2">
                {links.map((link) => {
                    const Icon = link.icon;
                    return (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition ${isActive
                                    ? 'bg-primary/10 text-white'
                                    : 'text-white/80 hover:bg-white/5'
                                }`
                            }
                        >
                            <div className="w-8 h-8 shrink-0 rounded-md bg-white/6 flex items-center justify-center text-sm text-white/90">
                                <Icon size={16} />
                            </div>
                            <span className="flex-1">{link.label}</span>
                        </NavLink>
                    );
                })}
            </nav>
            <button onClick={onLogout} className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 px-4 py-2 text-sm font-semibold text-white">
                <LogOut size={16} /> {t('logout')}
            </button>
        </aside>
    );
}
