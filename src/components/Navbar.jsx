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

    const languages = [
        { code: 'en', flag: '🇬🇧', label: 'English' },
        { code: 'fr', flag: '🇫🇷', label: 'Français' },
        { code: 'ar', flag: '🇸🇦', label: 'العربية' },
    ];

    return (
        <header className="border-b border-card-border bg-page-bg text-text-primary">
            <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8">
                <Link to="/" className="text-2xl font-extrabold tracking-tight flex items-center gap-2">
                    <span>Grow</span>
                    <span className="text-primary">Up</span>
                </Link>
                <nav className="hidden items-center gap-6 md:flex">
                    {navLinks.map((link) => (
                        <NavLink
                            key={link.to}
                            to={link.to}
                            className={({ isActive }) =>
                                isActive ? 'text-primary font-semibold' : 'text-text-secondary hover:text-text-primary'
                            }
                        >
                            {link.label}
                        </NavLink>
                    ))}
                </nav>
                <div className="flex items-center gap-3">
                    <div className="hidden sm:flex items-center gap-2 bg-white rounded-full p-1 border border-card-border">
                        {languages.map(({ code, flag }) => (
                            <button
                                key={code}
                                type="button"
                                onClick={() => setLocale(code)}
                                className={`px-3 py-1 text-sm rounded-full transition ${locale === code ? 'bg-primary text-white' : 'text-text-primary'}`}
                                aria-label={code}
                            >
                                {flag}
                            </button>
                        ))}
                    </div>
                    <button
                        onClick={toggleTheme}
                        type="button"
                        className="rounded-xl border border-card-border px-3 py-2 text-lg"
                        aria-label="Toggle theme"
                    >
                        {theme === 'dark' ? '☀️' : '🌙'}
                    </button>
                    {user ? (
                        <button
                            onClick={handleLogout}
                            className="rounded-xl bg-white/90 px-4 py-2 text-sm font-semibold text-text-primary border border-card-border"
                        >
                            {t('logout')}
                        </button>
                    ) : (
                        <>
                            <Link to="/login" className="text-sm font-semibold text-text-primary hover:text-primary">
                                {t('signIn')}
                            </Link>
                            <Link to="/register" className="rounded-xl bg-primary px-4 py-2 text-sm font-semibold text-white hover:bg-primary-hover">
                                {t('joinNow')}
                            </Link>
                        </>
                    )}
                </div>
            </div>
        </header>
    );
}