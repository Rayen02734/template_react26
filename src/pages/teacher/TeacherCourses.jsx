import React, { useEffect, useState } from 'react';
import { getCourses, createCourse, updateCourse, deleteCourse, uploadMaterial } from '../../data/teacherStore';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherCourses() {
    const { t } = useLocale();
    const [courses, setCourses] = useState([]);
    const [editing, setEditing] = useState(null);
    const [form, setForm] = useState({ title: '', description: '', level: 'Beginner', duration: '10h', category: 'Technology' });
    const [pendingDeletionId, setPendingDeletionId] = useState(null);

    useEffect(() => setCourses(getCourses()), []);

    const refresh = () => setCourses(getCourses());

    const handleCreate = (e) => {
        e.preventDefault();
        if (!form.title.trim()) return;
        createCourse({ ...form, instructor: 'Teacher Demo' });
        setForm({ title: '', description: '', level: 'Beginner', duration: '10h', category: 'Technology' });
        refresh();
    };

    const startEdit = (c) => {
        setEditing(c.id);
        setForm({ title: c.title, description: c.description, level: c.level, duration: c.duration, category: c.category || 'Technology' });
    };

    const saveEdit = (e) => {
        e.preventDefault();
        updateCourse(editing, form);
        setEditing(null);
        setForm({ title: '', description: '', level: 'Beginner', duration: '10h', category: 'Technology' });
        refresh();
    };

    const handleDelete = (id) => setPendingDeletionId(id);

    const proceedDelete = () => {
        if (!pendingDeletionId) return;
        deleteCourse(pendingDeletionId);
        setPendingDeletionId(null);
        refresh();
    };

    const handleUpload = (e, courseId) => {
        const file = e.target.files?.[0];
        if (!file) return;
        uploadMaterial(courseId, { name: file.name, size: file.size, type: file.type });
        refresh();
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('courseManagement')}
                title={t('myCourses')}
                description={t('coursesDescription')}
            />

            {pendingDeletionId ? (
                <div className="rounded-2xl border border-rose-200 bg-rose-50 p-4 text-sm text-rose-700 dark:border-rose-900/60 dark:bg-rose-950/30 dark:text-rose-300">
                    <p className="font-semibold">{t('deleteCourseQuestion')}</p>
                    <p className="mt-1">{t('deleteCourseWarning')}</p>
                    <div className="mt-3 flex gap-2">
                        <button onClick={proceedDelete} className="rounded-full bg-rose-600 px-4 py-2 font-semibold text-white">{t('delete')}</button>
                        <button onClick={() => setPendingDeletionId(null)} className="rounded-full border border-rose-300 px-4 py-2">{t('cancel')}</button>
                    </div>
                </div>
            ) : null}

            <div className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <h3 className="text-lg font-semibold text-slate-900 dark:text-white">{editing ? t('editCourse') : t('createNewCourse')}</h3>
                    <form onSubmit={editing ? saveEdit : handleCreate} className="mt-4 space-y-3">
                        <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} placeholder={t('courseTitle')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <div className="grid gap-3 md:grid-cols-2">
                            <input value={form.duration} onChange={(e) => setForm({ ...form, duration: e.target.value })} placeholder={t('duration')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                            <select value={form.level} onChange={(e) => setForm({ ...form, level: e.target.value })} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900">
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                            </select>
                        </div>
                        <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} placeholder={t('category')} className="w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <textarea value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder={t('description')} className="min-h-28 w-full rounded-2xl border border-slate-300 bg-white px-3 py-2 text-sm dark:border-slate-700 dark:bg-slate-900" />
                        <div className="flex flex-wrap gap-2">
                            <button className="rounded-full bg-cyan-500 px-4 py-2 text-sm font-semibold text-slate-950">{editing ? t('saveChanges') : t('createCourse')}</button>
                            {editing ? <button type="button" onClick={() => { setEditing(null); setForm({ title: '', description: '', level: 'Beginner', duration: '10h', category: 'Technology' }); }} className="rounded-full border border-slate-300 px-4 py-2 text-sm">{t('cancel')}</button> : null}
                        </div>
                    </form>
                </div>

                <div className="space-y-4">
                    {courses.map((course) => (
                        <div key={course.id} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-slate-800 dark:bg-slate-900">
                            <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                        <span className="rounded-full bg-cyan-50 px-2.5 py-1 text-xs font-semibold text-cyan-700 dark:bg-cyan-950/40 dark:text-cyan-300">{course.level}</span>
                                    </div>
                                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{course.description}</p>
                                    <p className="mt-3 text-sm text-slate-500">{course.category} · {course.duration}</p>
                                </div>
                                <div className="flex flex-wrap gap-2">
                                    <label className="cursor-pointer rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-cyan-400 hover:text-cyan-500 dark:border-slate-700 dark:text-slate-300">
                                        <input type="file" onChange={(e) => handleUpload(e, course.id)} className="hidden" />
                                        {t('uploadMaterial')}
                                    </label>
                                    <button onClick={() => startEdit(course)} className="rounded-full border border-slate-300 px-3 py-2 text-sm font-medium text-slate-700 dark:border-slate-700 dark:text-slate-300">{t('edit')}</button>
                                    <button onClick={() => handleDelete(course.id)} className="rounded-full border border-rose-300 px-3 py-2 text-sm font-medium text-rose-700 dark:border-rose-900/60 dark:text-rose-300">{t('delete')}</button>
                                </div>
                            </div>
                            <div className="mt-4 flex flex-wrap gap-4 text-sm text-slate-500 dark:text-slate-400">
                                <span>{course.materials?.length || 0} {t('learningMaterials')}</span>
                                <span>{course.quizzes?.length || 0} {t('quizzesCount')}</span>
                                <span>{course.students?.length || 0} {t('learnersCount')}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
