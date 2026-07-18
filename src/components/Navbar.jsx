import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import { useLocale } from '../context/LocaleContext';

export default function Navbar() {
    const { user, logout } = useAuth();
    const { theme, toggleTheme } = useTheme();
    const { locale, setLocale, t } = useLocale();
    const navigate = useNavigate();

    const navLinks = [
        { to: '/', label: t('home') },
        { to: '/courses', label: t('courses') },
        { to: '/about', label: t('about') },
        ...(user?.role === 'student' ? [{ to: '/student/dashboard', label: 'Student Workspace' }] : []),
        ...(user ? [{ to: '/live-classes', label: t('liveClasses') }] : []),
    ];

    const handleLogout = async () => {
        logout();
        setTimeout(() => navigate('/'), 100);
    };

    return (
        <header className="border-b border-slate-200 bg-white/80 text-slate-900 backdrop-blur dark:border-slate-800 dark:bg-slate-950/90 dark:text-white">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <Link to="/" className="text-xl font-semibold tracking-wide">
                    GrowUp
                </Link>
                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? 'text-cyan-500' : 'text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="flex items-center gap-2">
                    {['fr', 'ar'].map((lang) => (
                        <button
                            key={lang}
                            type="button"
                            onClick={() => setLocale(lang)}
                            className={`rounded-full border px-3 py-2 text-lg transition ${locale === lang
                                ? 'border-cyan-500 bg-cyan-500 text-white'
                                : 'border-slate-300 bg-white text-slate-700 hover:border-slate-400 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-950 dark:text-white dark:hover:border-slate-500 dark:hover:bg-slate-900'
                                }`}
                            aria-label={lang === 'fr' ? 'Français' : 'العربية'}
                        >
                            {lang === 'fr' ? '🇫🇷' : '🇸🇦'}
                        </button>
                    ))}
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="rounded-full border border-slate-300 px-3 py-2 text-lg dark:border-slate-700"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-700 dark:bg-cyan-500 dark:text-slate-950 dark:hover:bg-cyan-400"
                        >
                            {t('logout')}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-cyan-500 dark:text-slate-300">
                                {t('signIn')}
                            </Link>
                            <Link to="/register" className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950 transition hover:bg-cyan-400">
                                {t('joinNow')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}
