import { useState, useEffect } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { mockUsers } from '../data/mockUsers';
import { verifyOTP, peekOTP } from '../data/otpStore';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

export default function VerifyPage() {
    const [searchParams] = useSearchParams();
    const email = searchParams.get('email');
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { login } = useAuth();
    const { t } = useLocale();
    const navigate = useNavigate();

    useEffect(() => {
        if (!email) setMessage(t('missingEmail'));
    }, [email, t]);

    const handleVerify = (e) => {
        e.preventDefault();
        if (!email) return;
        const ok = verifyOTP(email, code);
        if (!ok) {
            setMessage(t('invalidCode'));
            return;
        }
        // mark user as verified
        const user = mockUsers.find((u) => u.email === email);
        if (user) user.verified = true;
        setMessage(t('emailVerified'));
        login(user);
        setTimeout(() => navigate('/'), 900);
    };

    return (
        <div className="flex min-h-[70vh] items-center justify-center bg-slate-50 px-6 py-16 dark:bg-slate-950">
            <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-xl dark:border-slate-800 dark:bg-slate-900">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">{t('verifyEmail')}</p>
                <h1 className="mt-3 text-2xl font-semibold text-slate-900 dark:text-white">{t('enterCode')}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('codeSent')} <strong>{email}</strong>.</p>
                <form onSubmit={handleVerify} className="mt-6 space-y-4">
                    <input
                        value={code}
                        onChange={(e) => setCode(e.target.value)}
                        className="w-full rounded-xl border border-slate-300 bg-slate-50 px-4 py-3 text-slate-900 outline-none dark:border-slate-700 dark:bg-slate-950 dark:text-white"
                        placeholder="Enter code"
                    />
                    {message ? <p className="text-sm text-rose-500">{message}</p> : null}
                    <button className="w-full rounded-full bg-cyan-500 px-4 py-3 font-semibold text-slate-950 transition hover:bg-cyan-400 dark:bg-cyan-600 dark:text-white dark:hover:bg-cyan-500">{t('verify')}</button>
                </form>
                <p className="mt-4 text-sm text-slate-500">{t('checkSpam')} <Link to="/register" className="text-cyan-500">{t('restartSignUp')}</Link>.</p>
                <div className="mt-4 text-xs text-slate-400">{t('devPreviewCode')} <code className="rounded bg-slate-100 px-2 py-1 dark:bg-slate-800">{peekOTP(email)}</code></div>
            </div>
        </div>
    );
}
