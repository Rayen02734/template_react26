import React, { useMemo } from 'react';
import { getStudentRoster } from '../../data/teacherStore';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherStudents() {
    const { t } = useLocale();
    const students = useMemo(() => getStudentRoster(), []);

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('learnerProgress')}
                title={t('students')}
                description={t('teacherStudentsDescription')}
            />

            <div className="grid gap-4">
                {students.map((student) => (
                    <div key={`${student.courseId}-${student.email}`} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex flex-wrap items-center gap-2">
                                    <p className="font-semibold text-slate-900 dark:text-white">{student.name}</p>
                                    <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{student.attendance}</span>
                                </div>
                                <p className="mt-2 text-sm text-slate-500">{student.courseTitle}</p>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{student.email}</p>
                            </div>
                            <div className="grid gap-3 sm:grid-cols-3">
                                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('progress')}</p>
                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{student.progress}%</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('quizScore')}</p>
                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{student.quizScore}%</p>
                                </div>
                                <div className="rounded-2xl bg-slate-50 p-3 dark:bg-slate-950/50">
                                    <p className="text-xs uppercase tracking-[0.25em] text-slate-500">{t('attendance')}</p>
                                    <p className="mt-1 font-semibold text-slate-900 dark:text-white">{student.attendance}</p>
                                </div>
                            </div>
                        </div>
                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-sm text-slate-500">
                            <span>{t('completion')}: {student.completion}</span>
                            <span className="rounded-full bg-cyan-50 px-3 py-1 text-cyan-700 dark:bg-cyan-950/30 dark:text-cyan-300">{t('supportRecommended')}</span>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
