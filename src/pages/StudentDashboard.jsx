import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, BrainCircuit, CalendarDays, CheckCircle2, Clock3, CreditCard, Download, ExternalLink, Sparkles, Trophy, Video, Zap } from 'lucide-react';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import StudentSidebar from '../components/StudentSidebar';
import Badge from '../components/ui/Badge';
import { useAuth } from '../context/AuthContext';
import { isCoursePurchased, purchaseCourse } from '../data/studentStore';

const courseCatalog = [
    {
        id: 'ai-product-design',
        title: 'AI Product Design',
        teacher: 'Alicia Laurent',
        category: 'Product Design',
        price: 129,
        progress: 68,
        image: 'https://images.unsplash.com/photo-1516321497487-e288fb19713f?auto=format&fit=crop&w=900&q=80',
        sessions: [
            { title: 'AI design critique', date: '2026-07-20', time: '18:30', link: 'https://meet.google.com/abc-defg-hij', accessKey: 'GROWUP-AI-01' },
        ],
        quiz: { title: 'Design systems quiz', questions: 8, score: 84, feedback: 'Strong grasp of systems thinking. Review interaction states to reach mastery.' },
    },
    {
        id: 'business-english',
        title: 'Business English',
        teacher: 'Daniel Brooks',
        category: 'Communication',
        price: 89,
        progress: 41,
        image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80',
        sessions: [
            { title: 'Speaking lab', date: '2026-07-22', time: '16:00', link: 'https://meet.google.com/xyz-1234-abc', accessKey: 'GROWUP-ENG-02' },
        ],
        quiz: { title: 'Business speaking quiz', questions: 6, score: 76, feedback: 'You are clear and confident. Practice concise phrasing for executive meetings.' },
    },
];

const initialNotifications = [
    { id: 1, title: 'Payment confirmed', detail: 'Your purchase is now active and your workspace unlocks instantly.', tone: 'success' },
    { id: 2, title: 'Live class reminder', detail: 'AI design critique starts tomorrow at 6:30 PM.', tone: 'info' },
    { id: 3, title: 'AI recommendation', detail: 'Review interaction patterns to boost your completion rate.', tone: 'accent' },
];

function buildEmptyState() {
    return {
        purchasedCourses: [],
        paymentHistory: [],
        notifications: initialNotifications,
        quizResults: [],
        completedCourses: [],
    };
}

export default function StudentDashboard() {
    const navigate = useNavigate();
    const { user } = useAuth();
    const [activeSection, setActiveSection] = useState('overview');
    const [purchasedCourseIds, setPurchasedCourseIds] = useState(() => {
        if (typeof window === 'undefined' || !user?.email) return [];
        return courseCatalog.filter((course) => isCoursePurchased(user.email, course.id)).map((course) => course.id);
    });
    const [payments, setPayments] = useState(() => {
        if (typeof window === 'undefined') return [];
        try {
            return JSON.parse(localStorage.getItem('growup-student-payments') || '[]');
        } catch {
            return [];
        }
    });
    const [notifications, setNotifications] = useState(() => {
        if (typeof window === 'undefined') return initialNotifications;
        try {
            return JSON.parse(localStorage.getItem('growup-student-notifications') || 'null') || initialNotifications;
        } catch {
            return initialNotifications;
        }
    });
    const [quizResults, setQuizResults] = useState(() => {
        if (typeof window === 'undefined') return [];
        try {
            return JSON.parse(localStorage.getItem('growup-student-quizzes') || '[]');
        } catch {
            return [];
        }
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = window.setTimeout(() => setLoading(false), 400);
        return () => window.clearTimeout(timer);
    }, []);

    useEffect(() => {
        if (!user) {
            navigate('/login', { replace: true });
            return;
        }
        const nextPurchased = courseCatalog.filter((course) => isCoursePurchased(user.email, course.id)).map((course) => course.id);
        setPurchasedCourseIds(nextPurchased);
    }, [navigate, user]);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            localStorage.setItem('growup-student-notifications', JSON.stringify(notifications));
            localStorage.setItem('growup-student-quizzes', JSON.stringify(quizResults));
        }
    }, [notifications, quizResults]);

    const purchasedCourses = useMemo(() => courseCatalog.filter((course) => purchasedCourseIds.includes(course.id)), [purchasedCourseIds]);

    const handlePurchase = (course) => {
        if (!user?.email) {
            navigate('/login');
            return;
        }

        const nextPayment = {
            id: Date.now(),
            course: course.title,
            price: course.price,
            date: new Date().toLocaleDateString(),
            status: 'Paid',
        };

        purchaseCourse(user.email, course.id);
        const nextPurchases = [...new Set([...purchasedCourseIds, course.id])];
        setPurchasedCourseIds(nextPurchases);
        setPayments((prev) => [nextPayment, ...prev]);
        setNotifications((prev) => [
            { id: Date.now(), title: 'Payment confirmed', detail: `${course.title} is now available in your workspace.`, tone: 'success' },
            ...prev,
        ]);
        localStorage.setItem('growup-student-payments', JSON.stringify([nextPayment, ...payments]));
    };

    const handleQuizSubmit = (courseId) => {
        const course = courseCatalog.find((item) => item.id === courseId);
        const score = Math.round(78 + Math.random() * 20);
        const feedback = score >= 85 ? 'Excellent work. You are ready for the next challenge.' : 'Nice progress. Review the weak topics and complete the recap lesson.';
        const result = { id: Date.now(), courseId, courseTitle: course?.title, score, feedback };
        setQuizResults((prev) => [result, ...prev]);
        const nextNotifications = [
            { id: Date.now(), title: 'Quiz result ready', detail: `${course?.title} quiz scored ${score}% with AI feedback.`, tone: 'accent' },
            ...notifications,
        ];
        setNotifications(nextNotifications);
    };

    const overviewStats = useMemo(() => {
        const completed = purchasedCourses.filter((course) => course.progress === 100).length;
        const averageProgress = purchasedCourses.length ? Math.round(purchasedCourses.reduce((sum, course) => sum + course.progress, 0) / purchasedCourses.length) : 0;
        const upcomingSessions = purchasedCourses.flatMap((course) => course.sessions).slice(0, 2);
        const pendingQuizzes = purchasedCourses.length;
        return { completed, averageProgress, upcomingSessions, pendingQuizzes };
    }, [purchasedCourses]);

    if (!user) {
        return null;
    }

    return (
        <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#f8fafc,_#eef2ff)] px-4 py-4 text-slate-900 transition-colors dark:bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.18),_transparent_35%),linear-gradient(135deg,_#020617,_#0f172a)] dark:text-slate-100 sm:px-6 lg:px-8 lg:py-8">
            <div className="mx-auto max-w-7xl">
                <header className="mb-6 flex flex-col gap-4 rounded-[28px] border border-slate-200/80 bg-white/80 px-6 py-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30 lg:flex-row lg:items-center lg:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.32em] text-cyan-500">Student Workspace</p>
                        <h1 className="mt-1 text-2xl font-semibold text-slate-900 dark:text-white">Welcome back, {user.name || 'Learner'}</h1>
                    </div>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-medium text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/40 dark:text-emerald-300">
                            {purchasedCourses.length ? `${purchasedCourses.length} active course${purchasedCourses.length > 1 ? 's' : ''}` : 'No course unlocked yet'}
                        </div>
                        <div className="rounded-2xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                            Premium LMS learning experience
                        </div>
                    </div>
                </header>

                <div className="flex flex-col gap-6 lg:flex-row lg:items-start">
                    <StudentSidebar activeSection={activeSection} onSelectSection={setActiveSection} userName={user.name} />
                    <main className="flex-1 min-w-0 rounded-[30px] border border-slate-200/80 bg-white/80 p-5 shadow-xl shadow-slate-200/60 backdrop-blur dark:border-slate-800 dark:bg-slate-900/80 dark:shadow-slate-950/30 lg:p-8">
                        {!purchasedCourses.length ? (
                            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                                <div className="rounded-[28px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Unlock your learning workspace</p>
                                    <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">Purchase a course to access your student dashboard</h2>
                                    <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Your learning portal becomes fully active after a successful payment. Choose a course below to simulate checkout, enroll instantly, and unlock live sessions, quizzes, progress tracking, AI guidance, and certificates.</p>
                                </div>

                                <div className="grid gap-6 lg:grid-cols-2">
                                    {courseCatalog.map((course) => (
                                        <Card key={course.id} className="transition duration-200 hover:-translate-y-1">
                                            <img src={course.image} alt={course.title} className="h-40 w-full rounded-[20px] object-cover" />
                                            <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                                                <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{course.category}</span>
                                                <span className="font-semibold text-cyan-600">${course.price}</span>
                                            </div>
                                            <h3 className="mt-4 text-xl font-semibold text-slate-900 dark:text-white">{course.title}</h3>
                                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">Learn from {course.teacher} with structured lessons, live coaching, and practice-based outcomes.</p>
                                            <div className="mt-5 flex items-center justify-between">
                                                <div className="text-sm text-slate-500">Instructor • {course.teacher}</div>
                                                <Button variant="primary" size="sm" onClick={() => handlePurchase(course)} aria-label={`Purchase ${course.title}`}>
                                                    Purchase now
                                                </Button>
                                            </div>
                                        </Card>
                                    ))}
                                </div>
                            </motion.div>
                        ) : (
                            <div className="space-y-6">
                                {loading ? (
                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        {Array.from({ length: 4 }).map((_, index) => (
                                            <div key={index} className="h-28 animate-pulse rounded-[24px] border border-slate-200 bg-slate-100 dark:border-slate-800 dark:bg-slate-950/50" />
                                        ))}
                                    </div>
                                ) : (
                                    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
                                        <Card>
                                            <p className="text-sm text-slate-500">Purchased courses</p>
                                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{purchasedCourses.length}</p>
                                            <p className="mt-2 text-sm text-cyan-600">{overviewStats.completed} completed</p>
                                        </Card>
                                        <Card>
                                            <p className="text-sm text-slate-500">Learning progress</p>
                                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{overviewStats.averageProgress}%</p>
                                            <p className="mt-2 text-sm text-cyan-600">Average across enrolled courses</p>
                                        </Card>
                                        <Card>
                                            <p className="text-sm text-slate-500">Upcoming sessions</p>
                                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{overviewStats.upcomingSessions.length}</p>
                                            <p className="mt-2 text-sm text-cyan-600">Live classes this week</p>
                                        </Card>
                                        <Card>
                                            <p className="text-sm text-slate-500">Pending quizzes</p>
                                            <p className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">{overviewStats.pendingQuizzes}</p>
                                            <p className="mt-2 text-sm text-cyan-600">Ready for review</p>
                                        </Card>
                                    </div>
                                )}

                                <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
                                    <div className="space-y-6">
                                        <Card>
                                            <div className="flex items-center justify-between gap-3">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">My Learning</p>
                                                    <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Continue your purchased courses</h2>
                                                </div>
                                                <Badge variant="primary">Live progress</Badge>
                                            </div>
                                            <div className="mt-5 space-y-4">
                                                {purchasedCourses.map((course) => (
                                                    <div key={course.id} className="rounded-[24px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                                            <div className="flex gap-4">
                                                                <img src={course.image} alt={course.title} className="h-20 w-24 rounded-[18px] object-cover" />
                                                                <div>
                                                                    <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                                                    <p className="mt-1 text-sm text-slate-500">{course.teacher} · {course.category}</p>
                                                                    <div className="mt-3 h-2 w-40 rounded-full bg-slate-200 dark:bg-slate-800">
                                                                        <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${course.progress}%` }} />
                                                                    </div>
                                                                    <p className="mt-2 text-sm text-cyan-600">{course.progress}% complete</p>
                                                                </div>
                                                            </div>
                                                            <Button variant="primary" size="sm" className="self-start">
                                                                Continue Learning <ArrowRight className="ml-2 h-4 w-4" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        <Card>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Live Courses</p>
                                                    <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Join your next session</h2>
                                                </div>
                                                <Badge variant="success">Ready</Badge>
                                            </div>
                                            <div className="mt-5 space-y-3">
                                                {purchasedCourses.flatMap((course) => course.sessions.map((session) => (
                                                    <div key={`${course.id}-${session.title}`} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                                                            <div>
                                                                <p className="font-semibold text-slate-900 dark:text-white">{course.title}</p>
                                                                <p className="text-sm text-slate-500">{session.title} · {course.teacher}</p>
                                                                <p className="mt-1 text-sm text-slate-500">{session.date} · {session.time}</p>
                                                            </div>
                                                            <div className="text-sm text-slate-500">
                                                                <p className="font-semibold text-cyan-600">Meeting key: {session.accessKey}</p>
                                                                <a href={session.link} className="mt-2 inline-flex items-center gap-2 text-cyan-600" target="_blank" rel="noreferrer">
                                                                    <ExternalLink className="h-4 w-4" /> Google Meet link
                                                                </a>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )))}
                                            </div>
                                        </Card>
                                    </div>

                                    <div className="space-y-6">
                                        <Card>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Quizzes & Exercises</p>
                                                    <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Practice with AI feedback</h2>
                                                </div>
                                                <Sparkles className="h-5 w-5 text-cyan-500" />
                                            </div>
                                            <div className="mt-5 space-y-4">
                                                {purchasedCourses.map((course) => (
                                                    <div key={`${course.id}-quiz`} className="rounded-[22px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                        <div className="flex items-center justify-between gap-3">
                                                            <div>
                                                                <p className="font-semibold text-slate-900 dark:text-white">{course.quiz.title}</p>
                                                                <p className="text-sm text-slate-500">{course.quiz.questions} questions · Score {course.quiz.score}%</p>
                                                            </div>
                                                            <Button variant="secondary" size="sm" onClick={() => handleQuizSubmit(course.id)}>
                                                                Submit quiz
                                                            </Button>
                                                        </div>
                                                        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{course.quiz.feedback}</p>
                                                    </div>
                                                ))}
                                                {quizResults.map((result) => (
                                                    <div key={result.id} className="rounded-[22px] border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
                                                        <div className="flex items-center justify-between">
                                                            <span>{result.courseTitle}</span>
                                                            <span className="font-semibold">{result.score}%</span>
                                                        </div>
                                                        <p className="mt-2">{result.feedback}</p>
                                                    </div>
                                                ))}
                                            </div>
                                        </Card>

                                        <Card>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">AI Assistant</p>
                                                    <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Personalized guidance</h2>
                                                </div>
                                                <BrainCircuit className="h-5 w-5 text-cyan-500" />
                                            </div>
                                            <div className="mt-4 rounded-[22px] border border-cyan-100 bg-cyan-50 p-4 dark:border-cyan-900/40 dark:bg-cyan-950/30">
                                                <p className="text-sm leading-7 text-slate-700 dark:text-slate-300">Your AI coach sees that your strongest area is {purchasedCourses[0]?.category || 'design'} and recommends a short review of interaction states and one live practice session this week.</p>
                                            </div>
                                        </Card>
                                    </div>
                                </div>

                                <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Calendar</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Upcoming milestones</h2>
                                            </div>
                                            <CalendarDays className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-4 grid gap-3 md:grid-cols-2">
                                            {purchasedCourses.flatMap((course) => course.sessions.map((session) => (
                                                <div key={`${course.id}-${session.title}-calendar`} className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                                    <p className="font-semibold text-slate-900 dark:text-white">{session.title}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{session.date} · {session.time}</p>
                                                    <p className="mt-2 inline-flex items-center gap-2 text-sm text-cyan-600"><Video className="h-4 w-4" /> Live class</p>
                                                </div>
                                            )))}
                                            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                                <p className="font-semibold text-slate-900 dark:text-white">Assignment reminder</p>
                                                <p className="mt-1 text-sm text-slate-500">Finish the recap exercises before Friday.</p>
                                            </div>
                                        </div>
                                    </Card>

                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Progress Tracking</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Your weekly momentum</h2>
                                            </div>
                                            <Trophy className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-5 space-y-4">
                                            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                <div className="flex items-center justify-between text-sm text-slate-500">
                                                    <span>Course completion</span>
                                                    <span className="font-semibold text-cyan-600">{overviewStats.averageProgress}%</span>
                                                </div>
                                                <div className="mt-3 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                                                    <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${overviewStats.averageProgress}%` }} />
                                                </div>
                                            </div>
                                            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                <div className="flex items-center justify-between text-sm text-slate-500">
                                                    <span>Attendance rate</span>
                                                    <span className="font-semibold text-cyan-600">93%</span>
                                                </div>
                                            </div>
                                            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                                <div className="flex items-center justify-between text-sm text-slate-500">
                                                    <span>Learning streak</span>
                                                    <span className="font-semibold text-cyan-600">7 days</span>
                                                </div>
                                            </div>
                                        </div>
                                    </Card>
                                </div>

                                <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Certificates</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Unlock your completion badge</h2>
                                            </div>
                                            <Trophy className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-4 rounded-[24px] border border-slate-200 bg-gradient-to-br from-cyan-50 to-blue-50 p-5 dark:border-slate-800 dark:from-cyan-950/30 dark:to-blue-950/30">
                                            <p className="text-sm text-slate-600 dark:text-slate-300">Certificates unlock once your course reaches 100%. Your current workspace is preparing a polished preview for the moment you finish the final milestone.</p>
                                            <div className="mt-4 flex items-center gap-3 rounded-[20px] border border-slate-200 bg-white/70 p-4 dark:border-slate-800 dark:bg-slate-950/40">
                                                <CheckCircle2 className="h-5 w-5 text-emerald-500" />
                                                <span className="font-semibold text-slate-900 dark:text-white">AI Product Design certificate preview ready</span>
                                            </div>
                                            <Button variant="primary" size="sm" className="mt-4">
                                                <Download className="mr-2 h-4 w-4" /> Simulated download
                                            </Button>
                                        </div>
                                    </Card>

                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Payment History</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Your recent purchases</h2>
                                            </div>
                                            <CreditCard className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-4 space-y-3">
                                            {payments.length ? payments.map((payment) => (
                                                <div key={payment.id} className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                                    <div className="flex items-center justify-between">
                                                        <p className="font-semibold text-slate-900 dark:text-white">{payment.course}</p>
                                                        <Badge variant={payment.status === 'Paid' ? 'success' : 'neutral'} size="sm">{payment.status}</Badge>
                                                    </div>
                                                    <p className="mt-2 text-sm text-slate-500">${payment.price} · {payment.date}</p>
                                                </div>
                                            )) : <p className="text-sm text-slate-500">No payments yet.</p>}
                                        </div>
                                    </Card>
                                </div>

                                <div className="grid gap-6 xl:grid-cols-[1fr_0.9fr]">
                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Notifications</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Stay in sync with your plan</h2>
                                            </div>
                                            <Clock3 className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-4 space-y-3">
                                            {notifications.map((notification) => (
                                                <div key={notification.id} className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">
                                                    <p className="font-semibold text-slate-900 dark:text-white">{notification.title}</p>
                                                    <p className="mt-1 text-sm text-slate-500">{notification.detail}</p>
                                                </div>
                                            ))}
                                        </div>
                                    </Card>

                                    <Card>
                                        <div className="flex items-center justify-between">
                                            <div>
                                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Profile & Settings</p>
                                                <h2 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">Customize your experience</h2>
                                            </div>
                                            <Zap className="h-5 w-5 text-cyan-500" />
                                        </div>
                                        <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                                            <p>Personalized study reminders are active for {user.name || 'your profile'}.</p>
                                            <p>AI recommendations will adapt as your learning activity grows.</p>
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        )}
                    </main>
                </div>
            </div>
        </div>
    );
}
