import { useMemo } from 'react';
import SectionTitle from '../components/SectionTitle';
import { useLocale } from '../context/LocaleContext';

export default function AboutPage() {
    const { t } = useLocale();

    const values = useMemo(() => [
        t('valueOne'),
        t('valueTwo'),
        t('valueThree'),
    ], [t]);

    const teamHighlights = useMemo(() => [
        t('highlightOne'),
        t('highlightTwo'),
        t('highlightThree'),
    ], [t]);

    return (
        <div className="bg-slate-50 dark:bg-slate-950">
            <section className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
                <SectionTitle
                    eyebrow={t('about')}
                    title={t('aboutTitle')}
                    description={t('aboutDescription')}
                />

                <div className="mt-12 grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/20">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('ourMission')}</h3>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            {t('missionText')}
                        </p>
                    </div>
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/20">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('ourVision')}</h3>
                        <p className="mt-4 text-lg leading-8 text-slate-600 dark:text-slate-400">
                            {t('visionText')}
                        </p>
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-2">
                    <div className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-200/60 dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/20">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('ourValues')}</h3>
                        <ul className="mt-6 space-y-4">
                            {values.map((value) => (
                                <li key={value} className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 text-slate-700 dark:border-slate-800 dark:bg-slate-950/70 dark:text-slate-300">
                                    {value}
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="rounded-3xl border border-cyan-500/20 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 dark:border-cyan-900/40 dark:from-cyan-950/30 dark:to-blue-950/30">
                        <h3 className="text-2xl font-semibold text-slate-900 dark:text-white">{t('whyChooseUs')}</h3>
                        <ul className="mt-6 space-y-4">
                            {teamHighlights.map((item) => (
                                <li key={item} className="rounded-2xl border border-cyan-400/20 bg-white/50 px-4 py-3 text-slate-900 dark:border-cyan-900/50 dark:bg-slate-900/50 dark:text-slate-200">
                                    {item}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>
        </div>
    );
}
