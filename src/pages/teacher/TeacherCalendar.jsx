import React from 'react';
import { getSessions } from '../../data/teacherStore';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherCalendar() {
    const { t } = useLocale();
    const sessions = getSessions();

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('calendar')}
                title={t('scheduledLiveSessions')}
                description={t('teacherCalendarDescription')}
            />

            <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
                {sessions.map((session) => (
                    <div key={session.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <p className="text-sm font-semibold text-cyan-600">{new Date(session.datetime).toLocaleDateString()}</p>
                        <p className="mt-2 font-semibold text-slate-900 dark:text-white">{session.title}</p>
                        <p className="mt-1 text-sm text-slate-500">{new Date(session.datetime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t('meetingCode')}: {session.accessCode}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
