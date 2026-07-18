import React from 'react';
import { CalendarDays, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getCourses, getSessions, getTeacherStats } from '../../data/teacherStore';
import MetricCard from '../../components/teacher/MetricCard';
import SectionHeader from '../../components/teacher/SectionHeader';
import Card from '../../components/ui/Card';
import { useLocale } from '../../context/LocaleContext';

const statCards = [
    { key: 'totalStudents', labelKey: 'students', accent: 'cyan', noteKey: 'acrossActiveCohorts' },
    { key: 'activeCourses', labelKey: 'courses', accent: 'violet', noteKey: 'publishedAndInProgress' },
    { key: 'liveSessions', labelKey: 'liveSessions', accent: 'emerald', noteKey: 'scheduledThisMonth' },
    { key: 'quizzes', labelKey: 'quizzes', accent: 'amber', noteKey: 'readyForLearners' },
];

export default function TeacherHome() {
    const { user } = useAuth();
    const { t } = useLocale();
    const stats = getTeacherStats();
    const sessions = getSessions().slice(0, 3);
    const courses = getCourses();
    const recentActivity = [
        { name: 'Amina Benali', action: 'Completed the React hooks quiz', time: '12 min ago', badge: 'High engagement' },
        { name: 'Liam Ortiz', action: 'Joined the live session', time: '37 min ago', badge: 'Live' },
        { name: 'Nora Chen', action: 'Submitted a portfolio reflection', time: '1 hr ago', badge: 'Needs review' },
    ];

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('teacherWorkspace')}
                title={t('welcomeBackTeacher', { name: user?.name || t('teacherDemo') })}
                description={t('teacherHomeDescription')}
                action={<div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-300">{t('nextLiveSession')}: {sessions[0]?.title || t('noSessionsYet')}</div>}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                {statCards.map((card) => (
                    <MetricCard
                        key={card.key}
                        title={t(card.labelKey)}
                        value={stats[card.key]}
                        note={t(card.noteKey)}
                        accent={card.accent}
                    />
                ))}
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('upcomingLiveSessions')}</h2>
                        <span className="rounded-full bg-cyan-500/10 px-3 py-1 text-sm font-medium text-cyan-600">{t('scheduled')}</span>
                    </div>
                    <div className="mt-4 space-y-3">
                        {sessions.map((session) => (
                            <div key={session.id} className="flex flex-col gap-3 rounded-[20px] border border-slate-200 bg-slate-50 px-4 py-3 dark:border-slate-800 dark:bg-slate-950/50 sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{session.title}</p>
                                    <p className="text-sm text-slate-500">{new Date(session.datetime).toLocaleDateString()} · {new Date(session.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                                </div>
                                <div className="text-sm text-slate-500">
                                    <p className="font-semibold text-cyan-600">{session.accessCode}</p>
                                    <p>{session.enrolled?.length || 0} enrolled</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <div className="space-y-6">
                    <Card>
                        <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('recentLearnerActivity')}</h2>
                        <div className="mt-4 space-y-3">
                            {recentActivity.map((item) => (
                                <div key={item.name} className="rounded-[20px] bg-slate-50 p-3 dark:bg-slate-950/50">
                                    <div className="flex items-center justify-between gap-3">
                                        <p className="font-medium text-slate-900 dark:text-white">{item.name}</p>
                                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">{item.badge}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{item.action}</p>
                                    <p className="mt-1 text-xs uppercase tracking-[0.2em] text-cyan-600">{item.time}</p>
                                </div>
                            ))}
                        </div>
                    </Card>

                    <Card>
                        <div className="flex items-center justify-between">
                            <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('courseProgressOverview')}</h2>
                            <TrendingUp size={18} className="text-cyan-500" />
                        </div>
                        <div className="mt-4 space-y-3">
                            {courses.slice(0, 3).map((course) => (
                                <div key={course.id}>
                                    <div className="mb-1 flex items-center justify-between text-sm">
                                        <span className="font-medium text-slate-700 dark:text-slate-300">{course.title}</span>
                                        <span className="text-cyan-600">{course.analytics?.completionRate || 0}%</span>
                                    </div>
                                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${course.analytics?.completionRate || 0}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="mt-6 flex items-center gap-3 rounded-[20px] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                            <CalendarDays size={16} className="text-cyan-500" /> {t('sessionsPendingReview')}
                        </div>
                    </Card>
                </div>
            </div>
        </div>
    );
}
