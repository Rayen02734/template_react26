import React from 'react';

function MiniBar({ data = [], color = '#06b6d4' }) {
    const max = Math.max(...data, 1);
    return (
        <div className="flex items-end gap-2 h-20">
            {data.map((d, i) => (
                <div key={i} className="w-3 rounded" style={{ height: `${(d / max) * 100}%`, background: color }} />
            ))}
        </div>
    );
}

const mock = {
    progress: [30, 45, 50, 60, 75, 80, 90],
    quizPerf: [70, 65, 78, 82, 88, 92],
    popular: [
        { title: 'MERN Stack', enrolled: 1240 },
        { title: 'AI Foundations', enrolled: 980 },
        { title: 'English', enrolled: 880 },
    ],
    atRisk: [
        { name: 'Jonas P', progress: 12 },
        { name: 'Aisha K', progress: 25 },
    ],
};

export default function AdminAIAnalytics() {
    return (
        <div>
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-500">AI Analytics</p>
                    <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Insights & recommendations</h1>
                </div>
            </div>

            <div className="grid gap-6 md:grid-cols-3">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-sm text-slate-500">Student learning progress</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Average 68%</p>
                    <MiniBar data={mock.progress} />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-sm text-slate-500">Quiz performance</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Avg score 81%</p>
                    <MiniBar data={mock.quizPerf} color="#60a5fa" />
                </div>
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <p className="text-sm text-slate-500">Completion rate</p>
                    <p className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">72%</p>
                    <p className="mt-2 text-sm text-cyan-500">+4% vs last month</p>
                </div>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Students at risk</h2>
                    <div className="mt-4 space-y-3">
                        {mock.atRisk.map((s) => (
                            <div key={s.name} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{s.name}</p>
                                    <p className="text-sm text-slate-500">Progress {s.progress}%</p>
                                </div>
                                <div className="w-36">
                                    <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                        <div className="h-2 rounded-full bg-rose-500" style={{ width: `${s.progress}%` }} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                    <h2 className="text-lg font-semibold text-slate-900 dark:text-white">Most popular courses</h2>
                    <div className="mt-4 space-y-3">
                        {mock.popular.map((c) => (
                            <div key={c.title} className="flex items-center justify-between">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{c.title}</p>
                                    <p className="text-sm text-slate-500">{c.enrolled} learners</p>
                                </div>
                                <div className="w-28">
                                    <MiniBar data={[c.enrolled % 100, 40, 60, 80]} />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="mt-6 rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                <h2 className="text-lg font-semibold text-slate-900 dark:text-white">AI Recommendations</h2>
                <ul className="mt-4 space-y-2">
                    <li className="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800">Suggest targeted practice quizzes for students scoring below 60% on core assessments.</li>
                    <li className="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800">Promote 'MERN Stack' to learners interested in full-stack roles.</li>
                    <li className="rounded-md border border-slate-200 bg-white p-3 dark:border-slate-800">Flag students with low progress for early outreach.</li>
                </ul>
            </div>
        </div>
    );
}
