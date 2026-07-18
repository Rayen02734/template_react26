import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';
import { generateOTP } from '../data/otpStore';

export default function RegisterPage() {
    const [form, setForm] = useState({ name: '', email: '', password: '' });
    const [message, setMessage] = useState('');
    const { t } = useLocale();
    const { } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        const existing = mockUsers.some((user) => user.email === form.email);
        if (existing) {
            setMessage(t('accountExists'));
            return;
        }

        const newUser = {
            id: Date.now(),
            name: form.name,
            email: form.email,
            password: form.password,
            role: 'student',
            verified: false,
        };

        mockUsers.push(newUser);
        const code = generateOTP(newUser.email);
        // navigate to verification page
        navigate(`/verify?email=${encodeURIComponent(newUser.email)}`);
        setMessage(`${t('otpSent')} ${newUser.email} — (${t('devPreviewCode')} ${code})`);
    };

    return (
        <div className="flex min-h-[80vh] items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl shadow-slate-200/70 dark:border-slate-800 dark:bg-slate-900 dark:shadow-slate-950/40">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{t('joinGrowUp')}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{t('createAccount')}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('startJourney')}</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('fullName')}</label>
                        <input
                            value={form.name}
                            onChange={(event) => setForm({ ...form, name: event.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="Alicia Tran"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('email')}</label>
                        <input
                            value={form.email}
                            onChange={(event) => setForm({ ...form, email: event.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="you@example.com"
                        />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('password')}</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(event) => setForm({ ...form, password: event.target.value })}
                            className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                            placeholder="••••••••"
                        />
                    </div>
                    {message ? <p className="text-sm text-cyan-500">{message}</p> : null}
                    <button className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400">{t('createAccountButton')}</button>
                </form>
                <p className="mt-6 text-center text-sm text-slate-600 dark:text-slate-400">
                    {t('alreadyHaveAccount')}{' '}
                    <Link to="/login" className="text-cyan-500 hover:text-cyan-400">
                        {t('signInHere')}
                    </Link>
                </p>
            </div>
        </div>
    );
}
