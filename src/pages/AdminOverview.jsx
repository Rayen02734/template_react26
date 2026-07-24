import { BadgeCheck, Clock3, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';
import KpiCard from '../components/ui/KpiCard';

const cards = [
    { title: 'Users', value: '124,530', description: 'Registered users', monogram: 'Us', accent: 'lavender', trend: '+8.2%', trendType: 'positive' },
    { title: 'Courses', value: '2,412', description: 'Active courses', monogram: 'Co', accent: 'mint', trend: '+3.1%', trendType: 'positive' },
    { title: 'Revenue', value: '86,400 TND', description: 'This month', monogram: 'Rv', accent: 'peach', trend: '+14.6%', trendType: 'positive' },
    { title: 'Completion', value: '94%', description: 'Completion rate', monogram: 'Cp', accent: 'pink', trend: '-1.4%', trendType: 'negative' },
];

const recentUsers = [
    { name: 'Mina Chen', role: 'Designer', status: 'Active' },
    { name: 'Leo Alvarez', role: 'Engineer', status: 'Reviewing' },
    { name: 'Sara Kim', role: 'Product', status: 'New' },
];

const tasks = [
    { label: 'Resolve payment issues', progress: 72 },
    { label: 'Review AI reports', progress: 56 },
    { label: 'Publish new cohort', progress: 88 },
];

export default function AdminOverview() {
    return (
        <div>
            <div className="mb-8 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-text-secondary">Overview</p>
                    <h1 className="mt-2 text-3xl font-semibold text-text-primary">Platform snapshot</h1>
                    <p className="mt-2 text-sm text-text-secondary">Monitor growth, learner activity, and operations from one elegant control center.</p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-card-border px-4 py-2 text-sm font-semibold text-text-primary transition hover:border-primary hover:text-primary">
                    <Sparkles size={16} /> Export report
                </button>
            </div>

            <div className="grid gap-4 md:grid-cols-4">
                {cards.map((card) => (
                    <KpiCard
                        key={card.title}
                        label={card.title}
                        value={card.value}
                        description={card.description}
                        monogram={card.monogram}
                        accent={card.accent}
                        trend={card.trend}
                        trendType={card.trendType}
                    />
                ))}
            </div>

            <div className="mt-8 grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Recent users</h2>
                        <Badge variant="success">Active now</Badge>
                    </div>
                    <div className="mt-4 space-y-3">
                        {recentUsers.map((user) => (
                            <div key={user.name} className="flex items-center justify-between rounded-xl border border-card-border px-4 py-3">
                                <div>
                                    <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                                    <p className="text-sm text-slate-500 dark:text-slate-400">{user.role}</p>
                                </div>
                                <div>
                                    <Badge variant={user.status === 'Active' ? 'success' : user.status === 'Reviewing' ? 'pending' : 'neutral'}>
                                        <BadgeCheck size={14} className="text-primary" />
                                        <span className="ml-1">{user.status}</span>
                                    </Badge>
                                </div>
                            </div>
                        ))}
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold text-slate-950 dark:text-white">Team priorities</h2>
                        <span className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-600 dark:bg-cyan-950/40">Live</span>
                    </div>
                    <div className="mt-4 space-y-4">
                        {tasks.map((task) => (
                            <div key={task.label}>
                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="font-medium text-slate-700 dark:text-slate-300">{task.label}</span>
                                    <span className="text-cyan-600">{task.progress}%</span>
                                </div>
                                <div className="h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                    <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${task.progress}%` }} />
                                </div>
                            </div>
                        ))}
                    </div>
                    <div className="mt-6 flex items-center gap-2 rounded-[20px] border border-slate-200 bg-slate-50 p-4 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/40 dark:text-slate-300">
                        <Clock3 size={16} className="text-cyan-500" /> Next review at 4:30 PM
                    </div>
                </Card>
            </div>
        </div>
    );
}
