import React, { useEffect, useMemo, useState } from 'react';
import { createAssessment, deleteAssessment, getCourses, updateAssessment } from '../../data/teacherStore';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherQuizzes() {
    const { t } = useLocale();
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [kind, setKind] = useState('quiz');
    const [form, setForm] = useState({ title: '', due: '', description: '', published: false });

    useEffect(() => {
        const allCourses = getCourses();
        setCourses(allCourses);
        if (allCourses.length) setSelectedCourse(allCourses[0].id);
    }, []);

    const activeCourse = useMemo(() => courses.find((course) => course.id === selectedCourse), [courses, selectedCourse]);

    const refresh = () => setCourses(getCourses());

    const handleCreate = (e) => {
        e.preventDefault();
        if (!selectedCourse || !form.title) return;
        createAssessment(selectedCourse, kind === 'exercise' ? 'exercise' : 'quiz', { title: form.title, due: form.due, description: form.description, published: form.published });
        setForm({ title: '', due: '', description: '', published: false });
        refresh();
    };

    const togglePublish = (assessmentId, assessmentKind, published) => {
        updateAssessment(selectedCourse, assessmentKind, assessmentId, { published: !published });
        refresh();
    };

    const handleDelete = (assessmentId, assessmentKind) => {
        deleteAssessment(selectedCourse, assessmentKind, assessmentId);
        refresh();
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('assessments')}
                title={t('quizzesExercises')}
                description={t('teacherQuizzesDescription')}
            />

            <div className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <h2 className="font-semibold text-slate-900 dark:text-white">{t('createNewAssessment')}</h2>
                    <form onSubmit={handleCreate} className="mt-4 space-y-3">
                        <select value={selectedCourse} onChange={(e) => setSelectedCourse(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                            {courses.map((course) => <option key={course.id} value={course.id}>{course.title}</option>)}
                        </select>
                        <select value={kind} onChange={(e) => setKind(e.target.value)} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                            <option value="quiz">{t('quizzes')}</option>
                            <option value="exercise">{t('exercises')}</option>
                        </select>
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t('assessmentTitle')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <input type="date" value={form.due} onChange={(e) => setForm({ ...form, due: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t('instructions')} className="min-h-24 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <label className="flex items-center gap-2 text-sm text-slate-700 dark:text-slate-300">
                            <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
                            {t('publishImmediately')}
                        </label>
                        <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">{t('create')} {kind === 'exercise' ? t('exercises').toLowerCase() : t('quizzes').toLowerCase()}</button>
                    </form>
                </div>

                <div className="space-y-4">
                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="font-semibold text-slate-900 dark:text-white">{activeCourse?.title || t('course')}</h2>
                        <div className="mt-4 space-y-3">
                            {(activeCourse?.quizzes || []).map((quiz) => (
                                <div key={quiz.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{quiz.title}</p>
                                            <p className="text-sm text-slate-500">{t('due')} {quiz.due || 'TBD'}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => togglePublish(quiz.id, 'quiz', quiz.published)} className="rounded-full border border-slate-300 px-3 py-2 text-sm">{quiz.published ? t('unpublish') : t('publish')}</button>
                                            <button onClick={() => handleDelete(quiz.id, 'quiz')} className="rounded-full border border-slate-300 px-3 py-2 text-sm">{t('delete')}</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                        <h2 className="font-semibold text-slate-900 dark:text-white">{t('exercises')}</h2>
                        <div className="mt-4 space-y-3">
                            {(activeCourse?.exercises || []).map((exercise) => (
                                <div key={exercise.id} className="rounded-2xl border border-slate-200 p-3 dark:border-slate-800">
                                    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                                        <div>
                                            <p className="font-medium text-slate-900 dark:text-white">{exercise.title}</p>
                                            <p className="text-sm text-slate-500">{t('due')} {exercise.due || 'TBD'}</p>
                                        </div>
                                        <div className="flex flex-wrap gap-2">
                                            <button onClick={() => togglePublish(exercise.id, 'exercise', exercise.published)} className="rounded-full border border-slate-300 px-3 py-2 text-sm">{exercise.published ? t('unpublish') : t('publish')}</button>
                                            <button onClick={() => handleDelete(exercise.id, 'exercise')} className="rounded-full border border-slate-300 px-3 py-2 text-sm">{t('delete')}</button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
