import { Activity, ArrowUpRight, BadgeCheck, Clock3, Sparkles } from 'lucide-react';
import Card from '../components/ui/Card';
import Badge from '../components/ui/Badge';

const cards = [
    { title: 'Revenue', value: '$48.2K', note: '+18.2% this month', accent: 'cyan' },
    { title: 'Students', value: '8,420', note: '+320 new learners', accent: 'violet' },
    { title: 'Active courses', value: '124', note: '12 launching soon', accent: 'emerald' },
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

            <div className="grid gap-4 md:grid-cols-3">
                {cards.map((card) => (
                    <Card key={card.title} className="transition duration-200 hover:-translate-y-1">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-text-secondary">{card.title}</p>
                            <div className="rounded-full bg-cyan-50 p-2 text-cyan-600 dark:bg-cyan-950/40"><Activity size={16} /></div>
                        </div>
                        <p className="mt-4 text-2xl font-semibold text-text-primary">{card.value}</p>
                        <p className="mt-2 flex items-center gap-1 text-sm text-primary"><ArrowUpRight size={14} /> {card.note}</p>
                    </Card>
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
