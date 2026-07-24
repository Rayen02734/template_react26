import { useEffect, useMemo, useState } from 'react';
import { CreditCard, Sparkles, TrendingUp, Video } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { purchaseCourse, getPurchasedCourses } from '../../data/studentStore';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';
import Badge from '../../components/ui/Badge';

const catalog = [
    { id: 'ai-product-design', title: 'AI Product Design', teacher: 'Alicia Laurent', category: 'Product', price: 129, progress: 68 },
    { id: 'business-english', title: 'Business English', teacher: 'Daniel Brooks', category: 'Communication', price: 89, progress: 41 },
];

export default function StudentDashboardPage() {
    const { user } = useAuth();
    const [purchasedIds, setPurchasedIds] = useState(() => (user?.email ? getPurchasedCourses(user.email) : []));

    useEffect(() => {
        if (user?.email) {
            setPurchasedIds(getPurchasedCourses(user.email));
        }
    }, [user?.email]);

    const purchasedCourses = useMemo(() => catalog.filter((course) => purchasedIds.includes(course.id)), [purchasedIds]);

    const handlePurchase = (courseId) => {
        if (!user?.email) return;
        purchaseCourse(user.email, courseId);
        setPurchasedIds(getPurchasedCourses(user.email));
    };

    return (
        <StudentPageShell
            eyebrow="Dashboard"
            title="Your professional learning command center"
            description="Follow progress, join live sessions, and keep momentum across every course you have purchased."
            stats={[
                { label: 'Purchased courses', value: purchasedCourses.length },
                { label: 'Weekly activity', value: '7 days' },
                { label: 'Attendance rate', value: '93%' },
            ]}
            actions={<div className="flex flex-wrap gap-3"><Button variant="primary">Continue learning</Button><Button variant="secondary">Explore catalog</Button></div>}
        >
            {!purchasedCourses.length ? (
                <div className="space-y-6">
                    <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Unlock your learning workspace</p>
                        <h3 className="mt-3 text-2xl font-semibold text-slate-950 dark:text-white">Purchase a course to access your full student dashboard</h3>
                        <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Once you enroll, the workspace unlocks live sessions, quizzes, progress tracking, AI guidance, certificates, and payment history in one beautiful experience.</p>
                    </div>
                    <div className="grid gap-6 lg:grid-cols-2">
                        {catalog.map((course) => (
                            <Card key={course.id}>
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                        <p className="mt-1 text-sm text-slate-500">{course.teacher}</p>
                                    </div>
                                    <Button variant="primary" size="sm" aria-label={`Purchase ${course.title}`} onClick={() => handlePurchase(course.id)}>
                                        Purchase now
                                    </Button>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                    <div className="space-y-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">My Learning</p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Current course momentum</h3>
                                </div>
                                <TrendingUp className="h-5 w-5 text-cyan-500" />
                            </div>
                            <div className="mt-5 space-y-4">
                                {purchasedCourses.map((course) => (
                                    <div key={course.id} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                                <p className="text-sm text-slate-500">{course.teacher} · {course.category}</p>
                                            </div>
                                            <Badge variant="primary" size="sm">{course.progress}%</Badge>
                                        </div>
                                        <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                            <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${course.progress}%` }} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Upcoming live sessions</p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Your next classes</h3>
                                </div>
                                <Video className="h-5 w-5 text-cyan-500" />
                            </div>
                            <div className="mt-4 space-y-3">
                                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                    <p className="font-semibold text-slate-900 dark:text-white">Design systems critique</p>
                                    <p className="mt-1 text-sm text-slate-500">Tomorrow · 6:30 PM · Google Meet</p>
                                </div>
                                <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                    <p className="font-semibold text-slate-900 dark:text-white">Executive speaking lab</p>
                                    <p className="mt-1 text-sm text-slate-500">Friday · 4:00 PM · Google Meet</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="space-y-6">
                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">AI recommendations</p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Suggested next steps</h3>
                                </div>
                                <Sparkles className="h-5 w-5 text-cyan-500" />
                            </div>
                            <div className="mt-4 rounded-[22px] border border-cyan-100 bg-cyan-50 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/30">
                                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">Your AI coach recommends finishing the last recap lesson and joining the speaking lab to strengthen your confidence before the next milestone.</p>
                            </div>
                        </Card>

                        <Card>
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Quick enroll</p>
                                    <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Unlock more learning</h3>
                                </div>
                                <CreditCard className="h-5 w-5 text-cyan-500" />
                            </div>
                            <div className="mt-4 space-y-3">
                                {catalog.map((course) => (
                                    <div key={course.id} className="flex items-center justify-between rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                        <div>
                                            <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                            <p className="text-sm text-slate-500">{course.teacher}</p>
                                        </div>
                                        <Button variant="primary" size="sm" aria-label={`Purchase ${course.title}`} onClick={() => handlePurchase(course.id)}>
                                            Purchase now
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        </Card>
                    </div>
                </div>
            )}
        </StudentPageShell>
    );
}
