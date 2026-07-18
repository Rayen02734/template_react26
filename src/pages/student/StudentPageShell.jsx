import { motion } from 'framer-motion';
import Card from '../../components/ui/Card';

export default function StudentPageShell({ eyebrow, title, description, stats = [], actions, children }) {
    return (
        <div className="space-y-6">
            <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{eyebrow}</p>
                <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{title}</h2>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
                {actions ? <div className="mt-5">{actions}</div> : null}
            </motion.div>

            {stats.length ? (
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <Card key={stat.label}>
                            <p className="text-3xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
                            <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                        </Card>
                    ))}
                </div>
            ) : null}

            {children}
        </div>
    );
}
