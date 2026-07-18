import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import SectionHeader from '../../components/teacher/SectionHeader';
import { useLocale } from '../../context/LocaleContext';

export default function TeacherProfile() {
    const { user, login } = useAuth();
    const { t } = useLocale();
    const [form, setForm] = useState({
        name: user?.name || 'Raczky Katalin',
        email: user?.email || 'teacher@growup.com',
        headline: user?.headline || 'Senior develloper and educator with a passion for teaching.',
        bio: user?.bio || 'Creating practical, engaging courses for ambitious learners.',
        availability: user?.availability || 'Mon-Fri · 8am-6pm',
    });
    const [saved, setSaved] = useState(false);

    const handleSave = (e) => {
        e.preventDefault();
        login({ ...(user || {}), ...form });
        setSaved(true);
    };

    return (
        <div className="space-y-6">
            <SectionHeader
                eyebrow={t('profile')}
                title={t('instructorProfile')}
                description={t('teacherProfileDescription')}
                action={saved ? <div className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-semibold text-emerald-700 dark:bg-emerald-950/40 dark:text-emerald-300">{t('saved')}</div> : null}
            />
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
                <div className="rounded-3xl border border-slate-200 bg-slate-50 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-950/50">
                    <p className="text-sm font-semibold uppercase tracking-[0.25em] text-cyan-500">{t('coachProfile')}</p>
                    <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{form.name}</h2>
                    <p className="mt-2 text-sm text-slate-600 dark:text-slate-400">{form.headline}</p>
                    <p className="mt-4 text-sm text-slate-600 dark:text-slate-400">{form.bio}</p>
                    <div className="mt-4 rounded-2xl bg-white p-3 text-sm text-slate-600 dark:bg-slate-900 dark:text-slate-400">{t('availability')}: {form.availability}</div>
                </div>
                <form onSubmit={handleSave} className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
                    <div className="grid gap-4 md:grid-cols-2">
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('name')}
                            <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
                        </label>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('email')}
                            <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
                        </label>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('headline')}
                            <input value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
                        </label>
                        <label className="text-sm font-medium text-slate-700 dark:text-slate-300">
                            {t('availability')}
                            <input value={form.availability} onChange={(e) => setForm({ ...form, availability: e.target.value })} className="mt-2 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
                        </label>
                    </div>
                    <label className="mt-4 block text-sm font-medium text-slate-700 dark:text-slate-300">
                        {t('bio')}
                        <textarea value={form.bio} onChange={(e) => setForm({ ...form, bio: e.target.value })} className="mt-2 min-h-28 w-full rounded-2xl border border-slate-300 bg-slate-50 px-3 py-2 dark:border-slate-700 dark:bg-slate-950" />
                    </label>
                    <button className="mt-5 rounded-full bg-cyan-500 px-4 py-2 font-semibold text-slate-950">{t('saveProfile')}</button>
                </form>
            </div>
        </div>
    );
}
