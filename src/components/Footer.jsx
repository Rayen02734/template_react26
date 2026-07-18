import { useLocale } from '../context/LocaleContext';

export default function Footer() {
    const { t } = useLocale();

    return (
        <footer className="border-t border-slate-200 bg-white px-6 py-10 text-slate-600 dark:border-slate-800 dark:bg-slate-950 dark:text-slate-400">
            <div className="mx-auto flex max-w-7xl flex-col gap-4 md:flex-row md:items-center md:justify-between">
                <div>
                    <p className="text-lg font-semibold text-slate-900 dark:text-white">GrowUp</p>
                    <p className="mt-1 text-sm">{t('learnBoldly')}</p>
                </div>
                <div className="flex gap-4 text-sm">
                    <a href="/" className="hover:text-cyan-500">
                        {t('privacy')}
                    </a>
                    <a href="/" className="hover:text-cyan-500">
                        {t('terms')}
                    </a>
                    <a href="/" className="hover:text-cyan-500">
                        {t('contact')}
                    </a>
                </div>
            </div>
        </footer>
    );
}
