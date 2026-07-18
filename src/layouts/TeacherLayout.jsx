import { Outlet, useNavigate } from 'react-router-dom';
import TeacherSidebar from '../components/TeacherSidebar';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

export default function TeacherLayout() {
    const { user, logout } = useAuth();
    const { t } = useLocale();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-4 py-4 text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] dark:text-slate-100 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/80 px-6 py-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-500">{t('teacherWorkspace')}</p>
                        <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">{t('teacherHub')}</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                            {user?.name || 'Teacher Demo'} · {t('liveTeaching')}
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                            {t('premiumLmsView')}
                        </div>
                    </div>
                </header>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <TeacherSidebar onLogout={handleLogout} />
                    <main className="flex-1 min-w-0 rounded-[30px] border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30 lg:p-8">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    );
}
