import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

export default function TeacherLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { login } = useAuth();
    const { t } = useLocale();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const found = mockUsers.find((u) => u.email === email && u.password === password && u.role === 'teacher');
        if (!found) {
            setError(t('invalidTeacherCredentials'));
            return;
        }
        login(found);
        navigate('/teacher/dashboard', { replace: true });
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{t('teacherHub')}</p>
                <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">{t('instructorLogin')}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('demoCredentials')}</p>
                <form onSubmit={handleSubmit} className="mt-8 space-y-4">
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('email')}</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="teacher@growup.com" />
                    </div>
                    <div>
                        <label className="mb-2 block text-sm text-slate-700 dark:text-slate-300">{t('password')}</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white" placeholder="••••••" />
                    </div>
                    {error ? <p className="text-sm text-rose-500">{error}</p> : null}
                    <button className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">{t('signIn')}</button>
                </form>
            </div>
        </div>
    );
}
