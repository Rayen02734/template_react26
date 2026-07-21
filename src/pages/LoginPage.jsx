import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { mockUsers } from '../data/mockUsers';

export default function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useLocale();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const foundUser = mockUsers.find((user) => user.email === email && user.password === password);

        if (!foundUser) {
            setError(t('invalidCredentials'));
            return;
        }

        if (!foundUser.verified) {
            setError(t('pleaseVerifyEmail'));
            return;
        }

        login(foundUser);
        if (foundUser.role === 'admin') {
            navigate('/admin/dashboard');
        } else if (foundUser.role === 'teacher') {
            navigate('/teacher/dashboard');
        } else {
            navigate('/student/dashboard');
        }
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{t('welcomeBack')}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{t('loginTitle')}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('demoCredentials')}</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('email')}</label>
                        <input
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('password')}</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(event) => setPassword(event.target.value)}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>
                    {error ? <p className="text-sm text-rose-500">{error}</p> : null}
                    <button className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">{t('continueButton')}</button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    No account yet?{' '}
                    <Link to="/register" className="text-cyan-500 hover:text-cyan-400">
                        Create one
                    </Link>
                </p>
            </div>
        </div>
    );
}