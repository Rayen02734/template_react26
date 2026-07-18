import { motion } from 'framer-motion';
import { ArrowRight, BookOpen, BrainCircuit, GraduationCap, PlayCircle, Sparkles, Star, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';
import { useLocale } from '../context/LocaleContext';

const stats = [
    { label: 'Active learners', value: '120K+' },
    { label: 'Expert-led courses', value: '2.4K' },
    { label: 'Average completion', value: '94%' },
];

const featuredCourses = [
    {
        title: 'AI Product Design',
        description: 'Build thoughtful digital products with modern systems thinking and prompt-driven workflows.',
        level: 'Intermediate',
    },
    {
        title: 'Business English',
        description: 'Sharpen workplace communication with live coaching and practical speaking labs.',
        level: 'Beginner',
    },
    {
        title: 'Frontend Foundations',
        description: 'Create polished, accessible interfaces with UX principles and React best practices.',
        level: 'Advanced',
    },
];

const categories = ['Technology', 'Languages', 'Leadership', 'Design'];
const testimonials = [
    {
        quote: 'The learning experience feels premium and beautifully organized. I reached my goals faster than expected.',
        name: 'Maya R.',
        role: 'Product Designer',
    },
    {
        quote: 'The live sessions and polished dashboards make every lesson feel intentional and motivating.',
        name: 'Daniel K.',
        role: 'Data Analyst',
    },
];

export default function LandingPage() {
    const { t } = useLocale();

    return (
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_30%),linear-gradient(135deg,_#f8fafc_0%,_#eef4ff_100%)]">
            <motion.section initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45 }} className="mx-auto grid max-w-7xl gap-10 px-6 py-20 lg:grid-cols-[1.05fr_0.95fr] lg:px-8 lg:py-28">
                <div className="max-w-2xl">
                    <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                        <Sparkles size={16} /> New • AI-assisted learning paths
                    </div>
                    <h1 className="mt-6 text-4xl font-semibold leading-tight text-slate-950 sm:text-5xl lg:text-6xl">
                        {t('landingHeading')}
                    </h1>
                    <p className="mt-6 text-lg leading-8 text-slate-600 sm:text-xl">
                        {t('landingSubheading')}
                    </p>
                    <div className="mt-8 flex flex-wrap gap-3">
                        <Button as="a" href="/register" size="lg" variant="primary">
                            {t('startLearning')} <ArrowRight className="ml-2" size={18} />
                        </Button>
                        <Button as="a" href="/signin" size="lg" variant="secondary">
                            {t('signIn')}
                        </Button>
                    </div>
                    <div className="mt-8 flex flex-wrap gap-6 text-sm text-slate-600">
                        <div className="flex items-center gap-2"><GraduationCap size={18} className="text-cyan-500" /> Expert-led cohorts</div>
                        <div className="flex items-center gap-2"><PlayCircle size={18} className="text-cyan-500" /> Live sessions weekly</div>
                    </div>
                </div>

                <Card className="p-0 overflow-hidden">
                    <div className="border-b border-slate-200 bg-gradient-to-br from-cyan-500/10 via-white to-blue-50 p-6 dark:border-slate-800 dark:from-cyan-950/40 dark:via-slate-900 dark:to-blue-950/30">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">This week</p>
                                <h2 className="mt-2 text-2xl font-semibold text-slate-900 dark:text-white">Your momentum is building</h2>
                            </div>
                            <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-cyan-700 shadow-sm dark:bg-slate-900/70 dark:text-cyan-300">+12% growth</div>
                        </div>
                        <div className="mt-6 grid gap-4 sm:grid-cols-2">
                            <div className="rounded-[20px] border border-slate-200 bg-white/90 p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                                <p className="text-sm text-slate-500">Completed lessons</p>
                                <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">18</p>
                            </div>
                            <div className="rounded-[20px] border border-cyan-100 bg-cyan-50 p-5 shadow-sm dark:border-cyan-900/50 dark:bg-cyan-950/30">
                                <p className="text-sm text-cyan-700 dark:text-cyan-300">Next milestone</p>
                                <p className="mt-2 text-lg font-semibold text-slate-900 dark:text-white">Launch your first portfolio project</p>
                            </div>
                        </div>
                    </div>
                    <div className="p-6">
                        <div className="flex items-center justify-between text-sm text-slate-500">
                            <span>Weekly focus</span>
                            <span className="font-semibold text-cyan-600">Live now</span>
                        </div>
                        <div className="mt-4 rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">Design systems sprint</p>
                                    <p className="text-sm text-slate-500">Today · 6:30 PM</p>
                                </div>
                                <div className="rounded-full bg-emerald-500/10 px-3 py-1 text-sm font-semibold text-emerald-600">Ready</div>
                            </div>
                        </div>
                    </div>
                </Card>
            </motion.section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <div className="grid gap-4 md:grid-cols-3">
                    {stats.map((stat) => (
                        <Card key={stat.label} className="transition duration-200 hover:-translate-y-1">
                            <p className="text-3xl font-semibold text-slate-950 dark:text-white">{stat.value}</p>
                            <p className="mt-2 text-sm text-slate-500">{stat.label}</p>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Featured categories</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Choose the path that fits your ambition</h2>
                    </div>
                </div>
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {categories.map((category) => (
                        <Card key={category} className="group cursor-pointer transition duration-200 hover:-translate-y-1">
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">{category}</p>
                                    <p className="mt-2 text-sm text-slate-500">Curated lessons with project-based practice.</p>
                                </div>
                                <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 transition group-hover:scale-105 dark:bg-cyan-950/40">
                                    <BookOpen size={18} />
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
                <div className="mb-8 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                    <div>
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Popular courses</p>
                        <h2 className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">Designed for confident, modern learning</h2>
                    </div>
                    <Link to="/courses" className="text-sm font-semibold text-cyan-600 hover:text-cyan-500">Explore all courses</Link>
                </div>
                <div className="grid gap-6 lg:grid-cols-3">
                    {featuredCourses.map((course) => (
                        <Card key={course.title} className="transition duration-200 hover:-translate-y-1">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span className="rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-800">{course.level}</span>
                                <span className="font-semibold text-cyan-600">4.9 ★</span>
                            </div>
                            <h3 className="mt-4 text-xl font-semibold text-slate-950 dark:text-white">{course.title}</h3>
                            <p className="mt-3 text-sm leading-7 text-slate-600">{course.description}</p>
                            <div className="mt-5 flex items-center justify-between">
                                <div className="flex items-center gap-2 text-sm text-slate-500"><Users size={16} /> 1.2k learners</div>
                                <Button variant="ghost" size="sm">View course</Button>
                            </div>
                        </Card>
                    ))}
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
                <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
                    <Card className="bg-gradient-to-br from-slate-950 to-slate-800 text-white">
                        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-400">Featured instructors</p>
                        <h2 className="mt-3 text-3xl font-semibold">Learn from specialists shaping the future</h2>
                        <p className="mt-4 text-sm leading-7 text-slate-300">From AI strategy to language immersion, our mentors combine deep craft with supportive coaching.</p>
                        <div className="mt-6 flex items-center gap-3 rounded-[20px] border border-white/10 bg-white/10 p-4">
                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500 text-lg font-semibold">AL</div>
                            <div>
                                <p className="font-semibold">Alicia Laurent</p>
                                <p className="text-sm text-slate-300">Design systems lead</p>
                            </div>
                        </div>
                    </Card>
                    <div className="grid gap-6 md:grid-cols-2">
                        {testimonials.map((item) => (
                            <Card key={item.name}>
                                <div className="flex items-center gap-1 text-cyan-500">
                                    {Array.from({ length: 5 }).map((_, index) => <Star key={index} size={16} fill="currentColor" />)}
                                </div>
                                <p className="mt-4 text-sm leading-7 text-slate-600 dark:text-slate-300">“{item.quote}”</p>
                                <div className="mt-5">
                                    <p className="font-semibold text-slate-900 dark:text-white">{item.name}</p>
                                    <p className="text-sm text-slate-500">{item.role}</p>
                                </div>
                            </Card>
                        ))}
                    </div>
                </div>
            </section>

            <section className="mx-auto max-w-7xl px-6 pb-20 lg:px-8">
                <Card className="overflow-hidden border-cyan-100 bg-gradient-to-r from-cyan-50 to-blue-50 dark:border-cyan-900/40 dark:from-cyan-950/30 dark:to-blue-950/30">
                    <div className="grid gap-8 lg:grid-cols-[1fr_0.8fr] lg:items-center">
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Premium experience</p>
                            <h2 className="mt-3 text-3xl font-semibold text-slate-950 dark:text-white">A polished platform for serious learners and ambitious teams</h2>
                            <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-600 dark:text-slate-300">Enjoy beautiful dashboards, live sessions, AI guidance, and thoughtful progress tracking from one calm workspace.</p>
                        </div>
                        <div className="rounded-[24px] border border-white/70 bg-white/80 p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900/80">
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl bg-cyan-500/10 p-3 text-cyan-600"><BrainCircuit size={20} /></div>
                                <div>
                                    <p className="font-semibold text-slate-900 dark:text-white">AI tutor ready</p>
                                    <p className="text-sm text-slate-500">Ask for guidance, summaries, and study plans.</p>
                                </div>
                            </div>
                            <div className="mt-4 h-2 rounded-full bg-slate-200 dark:bg-slate-800"><div className="h-2 w-3/4 rounded-full bg-cyan-500" /></div>
                            <div className="mt-6 flex gap-3">
                                <Button variant="primary">Start learning</Button>
                                <Button variant="secondary">See demo</Button>
                            </div>
                        </div>
                    </div>
                </Card>
            </section>
        </div>
    );
}
