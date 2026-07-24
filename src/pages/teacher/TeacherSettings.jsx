import React from 'react';
import SectionHeader from '../../components/teacher/SectionHeader';
import Badge from '../../components/ui/Badge';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherSettings() {
    const { t } = useLocale();

    const preferences = [
        { title: t('emailReminders'), description: t('emailRemindersDescription'), active: true },
        { title: t('liveSessionNudges'), description: t('liveSessionNudgesDescription'), active: true },
        { title: t('automatedFollowUp'), description: t('automatedFollowUpDescription'), active: false },
    ];

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('settings')}
                title={t('instructorPreferences')}
                description={t('teacherSettingsDescription')}
            />

            <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('teachingWorkflow')}</h2>
                    <div className="mt-4 space-y-3">
                        {preferences.map((item) => (
                            <div key={item.title} className="flex items-start justify-between gap-3 rounded-2xl border border-slate-200 p-4 dark:border-slate-800">
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                    <p className="mt-1 text-sm text-slate-500">{item.description}</p>
                                </div>
                                <Badge variant={item.active ? 'success' : 'neutral'} size="sm">{item.active ? t('enabled') : t('paused')}</Badge>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">{t('suggestedDefaults')}</h2>
                    <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-400">
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                            <p className="font-semibold text-slate-900 dark:text-white">{t('sessionReminderCadence')}</p>
                            <p className="mt-1">{t('sessionReminderDescription')}</p>
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                            <p className="font-semibold text-slate-900 dark:text-white">{t('accessKeyFormat')}</p>
                            <p className="mt-1">{t('accessKeyFormatDescription')}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
