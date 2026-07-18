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
        <div>
            <h1 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('liveCoursesTitle')}</h1>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{t('onlyAuthenticated')}</p>
            <div className="mt-4 grid gap-4">
                {sessions.map((s) => {
                    const course = getCourse(s.courseId);
                    const purchased = isStudent ? isCoursePurchased(studentEmail, s.courseId) : true;
                    return (
                        <div key={s.id} className="rounded-2xl border border-slate-200 p-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <p className="font-medium">{s.title}</p>
                                <p className="text-sm text-slate-500">{course.title} · {new Date(s.datetime).toLocaleString()} · {s.instructor}</p>
                                <p className="mt-2 text-sm text-slate-500">Enrolled: {s.enrolled?.length || 0}</p>
                            </div>
                            <div className="flex flex-wrap items-center gap-2">
                                {isStudent && !purchased ? (
                                    <button onClick={() => handlePurchase(s.courseId)} className="rounded-full bg-cyan-500 px-4 py-2 text-white">{t('payAndUnlock')}</button>
                                ) : (
                                    <button onClick={() => openJoin(s)} className="rounded-full bg-cyan-500 px-4 py-2 text-white">{t('join')}</button>
                                )}
                                <a href={s.meetLink} target="_blank" rel="noreferrer" className="text-sm text-cyan-500">{t('previewLink')}</a>
                            </div>
                        </div>
                    );
                })}
            </div>

            {selected ? (
                <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5">
                    <h2 className="font-semibold">{t('join')} {selected.title}</h2>
                    <form onSubmit={handleJoin} className="mt-3 flex flex-col gap-3 sm:flex-row">
                        <input value={code} onChange={(e) => setCode(e.target.value)} placeholder={t('enterMeetingKey')} className="rounded border px-3 py-2 flex-1" />
                        <button className="rounded-full bg-cyan-500 px-4 py-2 text-white">{t('enterAndJoin')}</button>
                    </form>
                    {message ? <p className="mt-2 text-sm text-rose-500">{message}</p> : null}
                    <p className="mt-3 text-sm text-slate-500">{t('linkOpens')}</p>
                </div>
            ) : null}
        </div>
    );
}
