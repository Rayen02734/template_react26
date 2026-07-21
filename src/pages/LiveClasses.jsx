import React, { useEffect, useState } from 'react';
import { getCourses, getSessions, enrollInSession, getSessionById } from '../data/teacherStore';
import { isCoursePurchased, purchaseCourse } from '../data/studentStore';
import { useAuth } from '../context/AuthContext';
import { useLocale } from '../context/LocaleContext';

export default function LiveClasses() {
    const [sessions, setSessions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selected, setSelected] = useState(null);
    const [code, setCode] = useState('');
    const [message, setMessage] = useState('');
    const { user } = useAuth();
    const { t } = useLocale();

    useEffect(() => {
        setSessions(getSessions());
        setCourses(getCourses());
    }, []);

    const studentEmail = user?.email || '';
    const isStudent = user?.role === 'student';

    const openJoin = (s) => { setSelected(s); setCode(''); setMessage(''); };

    const handlePurchase = (courseId) => {
        if (!studentEmail) return;
        purchaseCourse(studentEmail, courseId);
        setMessage(t('coursePurchased'));
    };

    const handleJoin = (e) => {
        e.preventDefault();
        if (!selected) return;
        const s = getSessionById(selected.id);
        if (!s) return setMessage(t('sessionNotFound'));
        if (s.accessCode !== code.trim().toUpperCase()) return setMessage(t('invalidAccessKey'));
        enrollInSession(s.id, studentEmail);
        window.open(s.meetLink, '_blank');
    };

    const getCourse = (courseId) => courses.find((c) => c.id === courseId) || { title: 'Unknown course' };

    return (
        <div className="min-h-screen bg-slate-50 dark:bg-slate-950 px-6 py-8 text-slate-900 dark:text-slate-100">
            <div className="mx-auto max-w-4xl">
                <h1 className="text-3xl font-semibold text-slate-950 dark:text-white">{t('liveCoursesTitle')}</h1>
                <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('onlyAuthenticated')}</p>
                <div className="mt-6 space-y-4">
                    {sessions.map((s) => {
                        const course = getCourse(s.courseId);
                        const purchased = isStudent ? isCoursePurchased(studentEmail, s.courseId) : true;
                        return (
                            <div key={s.id} className="rounded-2xl border border-slate-200 bg-white p-4 dark:border-slate-700 dark:bg-slate-900 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between transition hover:shadow-md dark:hover:shadow-slate-900/50">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{s.title}</p>
                                    <p className="text-sm text-slate-600 dark:text-slate-400">{course.title} · {new Date(s.datetime).toLocaleString()} · {s.instructor}</p>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">Enrolled: {s.enrolled?.length || 0}</p>
                                </div>
                                <div className="flex flex-wrap items-center gap-2">
                                    {isStudent && !purchased ? (
                                        <button onClick={() => handlePurchase(s.courseId)} className="rounded-full bg-cyan-500 px-4 py-2 text-white font-semibold transition hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-500">{t('payAndUnlock')}</button>
                                    ) : (
                                        <button onClick={() => openJoin(s)} className="rounded-full bg-cyan-500 px-4 py-2 text-white font-semibold transition hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-500">{t('join')}</button>
                                    )}
                                    <a href={s.meetLink} target="_blank" rel="noreferrer" className="text-sm text-cyan-600 hover:text-cyan-700 dark:text-cyan-400 dark:hover:text-cyan-300">{t('previewLink')}</a>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {selected ? (
                    <div className="mt-6 rounded-2xl border border-slate-200 bg-white p-6 dark:border-slate-700 dark:bg-slate-900">
                        <h2 className="font-semibold text-slate-950 dark:text-white">{t('join')} {selected.title}</h2>
                        <form onSubmit={handleJoin} className="mt-4 flex flex-col gap-3 sm:flex-row">
                            <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('enterMeetingKey')} className="rounded-lg border border-slate-300 bg-slate-50 px-4 py-2 text-slate-900 dark:border-slate-700 dark:bg-slate-950 dark:text-white flex-1 outline-none" />
                            <button className="rounded-full bg-cyan-500 px-6 py-2 text-white font-semibold transition hover:bg-cyan-400 dark:bg-cyan-600 dark:hover:bg-cyan-500">{t('enterAndJoin')}</button>
                        </form>
                        {message ? <p className="mt-3 text-sm text-rose-500">{message}</p> : null}
                        <p className="mt-3 text-sm text-slate-600 dark:text-slate-400">{t('linkOpens')}</p>
                    </div>
                ) : null}
            </div>
        </div>
    );
}
