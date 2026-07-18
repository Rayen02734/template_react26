import React from 'react';
import { getAiInsights, getSessions, getTeacherStats } from '../../data/teacherStore';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherAnalytics() {
    const { t } = useLocale();
    const sessions = getSessions();
    const stats = getTeacherStats();
    const insights = getAiInsights();

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('aiAssistant')}
                title={t('dailyGuidance')}
                description={t('teacherAnalyticsDescription')}
            />

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('weeklyEngagement')}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">82%</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('averageAttendance')}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">89%</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('upcomingLiveSessionsCount')}</p>
                    <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{sessions.length}</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('detectedAbsences')}</h2>
                    <div className="mt-4 space-y-3">
                        <div className="rounded-2xl border border-amber-200 bg-amber-50 p-3 text-sm text-amber-700 dark:border-amber-900/60 dark:bg-amber-950/40 dark:text-amber-300">
                            Two learners were marked absent after the React clinic. A reminder email was queued for review.
                        </div>
                        <div className="rounded-2xl border border-slate-200 p-3 text-sm text-slate-600 dark:border-slate-800 dark:text-slate-400">
                            <p className="font-semibold text-slate-900 dark:text-white">{t('simulatedReminder')}</p>
                            <p className="mt-2">{t('emailReminderSubject')}</p>
                            <p className="mt-1">{t('emailReminderBody')}</p>
                        </div>
                    </div>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('aiRecommendations')}</h2>
                    <div className="mt-4 space-y-3">
                        {insights.map((insight) => (
                            <div key={insight.id} className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                                <p className="font-medium text-slate-900 dark:text-white">{insight.student}</p>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-400">{insight.reason}</p>
                                <p className="mt-2 text-sm text-cyan-600">Recommendation: {insight.action}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('weeklyLearningAnalytics')}</h2>
                <div className="mt-4 grid gap-3 md:grid-cols-3">
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                        <p className="text-sm text-slate-500">{t('studentsOnlineThisWeek')}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{stats.totalStudents}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                        <p className="text-sm text-slate-500">{t('averageQuizScore')}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">88%</p>
                    </div>
                    <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                        <p className="text-sm text-slate-500">{t('completionTrend')}</p>
                        <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">+7.2%</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
