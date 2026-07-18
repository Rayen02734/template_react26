import React, { useEffect, useMemo, useState } from 'react';
import { getCourses, getSessions, scheduleSession, updateSession, deleteSession } from '../../data/teacherStore';
import { mockUsers } from '../../data/mockUsers';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

const studentOptions = mockUsers.filter((user) => user.role === 'student');

export default function TeacherSessions() {
    const { t } = useLocale();
    const [courses, setCourses] = useState([]);
    const [sessions, setSessions] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [form, setForm] = useState({ courseId: '', title: '', datetime: '', description: '', meetLink: '', accessCode: '', enrolled: [] });

    useEffect(() => {
        setCourses(getCourses());
        setSessions(getSessions());
    }, []);

    const courseOptions = useMemo(() => courses, [courses]);
    const totalStudents = useMemo(() => sessions.reduce((count, session) => count + (session.enrolled?.length || 0), 0), [sessions]);
    const nextSession = useMemo(() => sessions.find((session) => new Date(session.datetime) > new Date()) || sessions[0], [sessions]);

    const refresh = () => {
        setCourses(getCourses());
        setSessions(getSessions());
    };

    const toggleStudent = (email) => {
        setForm((current) => {
            const enrolled = current.enrolled.includes(email)
                ? current.enrolled.filter((item) => item !== email)
                : [...current.enrolled, email];
            return { ...current, enrolled };
        });
    };

    const resetForm = () => {
        setEditingId(null);
        setForm({ courseId: '', title: '', datetime: '', description: '', meetLink: '', accessCode: '', enrolled: [] });
    };

    const handleSchedule = (e) => {
        e.preventDefault();
        if (!form.courseId || !form.title || !form.datetime) return;
        if (editingId) {
            updateSession(editingId, { ...form, instructor: 'Teacher Demo' });
        } else {
            scheduleSession({ ...form, instructor: 'Teacher Demo' });
        }
        resetForm();
        refresh();
    };

    const startEdit = (session) => {
        setEditingId(session.id);
        setForm({
            courseId: session.courseId || '',
            title: session.title || '',
            datetime: session.datetime ? session.datetime.slice(0, 16) : '',
            description: session.description || '',
            meetLink: session.meetLink || '',
            accessCode: session.accessCode || '',
            enrolled: session.enrolled || [],
        });
    };

    const handleDelete = (id) => {
        deleteSession(id);
        refresh();
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('liveInstruction')}
                title={t('liveCoursesSessions')}
                description={t('sessionsDescription')}
                action={nextSession ? <div className="rounded-2xl border border-cyan-200 bg-cyan-50 px-4 py-3 text-sm font-medium text-cyan-700 dark:border-cyan-900/60 dark:bg-cyan-950/40 dark:text-cyan-300">{t('nextLiveSession')}: {nextSession.title}</div> : null}
            />

            <div className="grid gap-4 md:grid-cols-3">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('scheduledSessions')}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{sessions.length}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('invitedLearners')}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{totalStudents}</p>
                </div>
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-4 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm text-slate-500">{t('activeCourses')}</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">{courses.length}</p>
                </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <h3 className="font-semibold text-slate-900 dark:text-white">{editingId ? t('editLiveSession') : t('createLiveSession')}</h3>
                    <form onSubmit={handleSchedule} className="mt-4 space-y-3">
                        <select className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" value={form.courseId} onChange={(e) => setForm({ ...form, courseId: e.target.value })}>
                            <option value="">{t('selectCourse')}</option>
                            {courseOptions.map((course) => (
                                <option key={course.id} value={course.id}>{course.title}</option>
                            ))}
                        </select>
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t('sessionTitle')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <input type="datetime-local" value={form.datetime} onChange={(e) => setForm({ ...form, datetime: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t('sessionDescription')} className="min-h-24 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <div className="grid gap-3 sm:grid-cols-2">
                            <input value={form.meetLink} onChange={(e) => setForm({ ...form, meetLink: e.target.value })} placeholder="https://meet.google.com/demo" className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                            <input value={form.accessCode} onChange={(e) => setForm({ ...form, accessCode: e.target.value })} placeholder={t('enterMeetingKey')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-white p-3 dark:border-slate-800 dark:bg-slate-900">
                            <p className="mb-2 text-sm font-medium text-slate-700 dark:text-slate-300">{t('inviteLearners')}</p>
                            <div className="max-h-40 space-y-2 overflow-y-auto">
                                {studentOptions.map((student) => (
                                    <label key={student.email} className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                                        <input type="checkbox" checked={form.enrolled.includes(student.email)} onChange={() => toggleStudent(student.email)} />
                                        {student.name} ({student.email})
                                    </label>
                                ))}
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">{editingId ? t('saveChanges') : t('scheduleSession')}</button>
                            {editingId ? <button type="button" onClick={resetForm} className="rounded-full border border-slate-300 px-4 py-2 text-sm">{t('cancel')}</button> : null}
                        </div>
                    </form>
                </div>

                <div className="space-y-3">
                    {sessions.map((session) => (
                        <div key={session.id} className="rounded-3xl border border-slate-200 bg-white p-4 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{session.title}</p>
                                    <p className="mt-1 text-sm text-slate-500">{new Date(session.datetime).toLocaleString()} · {session.instructor}</p>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{session.description}</p>
                                </div>
                                <div className="rounded-2xl bg-cyan-50 px-3 py-2 text-sm text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">
                                    <p>{t('meetingCode')}: {session.accessCode}</p>
                                    <a className="mt-1 inline-block font-semibold underline" href={session.meetLink} target="_blank" rel="noreferrer">{t('openMeet')}</a>
                                </div>
                            </div>
                            <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-sm text-slate-500">
                                <span>{t('enrolledCount')}: {session.enrolled?.length || 0}</span>
                                <div className="flex gap-2">
                                    <button onClick={() => startEdit(session)} className="rounded-full border border-slate-300 px-3 py-1">{t('edit')}</button>
                                    <button onClick={() => handleDelete(session.id)} className="rounded-full border border-slate-300 px-3 py-1">{t('delete')}</button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
