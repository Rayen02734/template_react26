import { AnimatePresence, motion } from 'framer-motion';
import { BrainCircuit, ChevronRight, Clock3, Compass, GraduationCap, Search, Sparkles, Star, Users } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { courseCatalog, getPurchasedCourses, languageCategories, savePurchasedCourses, technologyCategories, filiereCategories } from '../data/courseCatalog';

const filters = ['All', 'Technology', 'Languages'];

export default function CoursesPage() {
    const [activeFilter, setActiveFilter] = useState('All');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [search, setSearch] = useState('');
    const [selectedCourse, setSelectedCourse] = useState(null);
    const [purchasedCourses, setPurchasedCourses] = useState([]);

    useEffect(() => {
        setPurchasedCourses(getPurchasedCourses());
    }, []);

    const visibleCourses = useMemo(() => {
        const normalizedSearch = search.trim().toLowerCase();
        return courseCatalog.filter((course) => {
            const matchesCategory = activeFilter === 'All' || course.category === activeFilter;
            const matchesSubcategory = selectedCategory === 'All' || course.subcategory === selectedCategory;
            const matchesSearch = normalizedSearch.length === 0 || [course.title, course.description, course.instructor, course.subcategory].some((value) => value.toLowerCase().includes(normalizedSearch));
            return matchesCategory && matchesSubcategory && matchesSearch;
        });
    }, [activeFilter, search, selectedCategory]);

    const handlePurchase = (courseId) => {
        const updated = Array.from(new Set([...purchasedCourses, courseId]));
        setPurchasedCourses(updated);
        savePurchasedCourses(updated);
    };

    const featuredCourse = visibleCourses[0] || courseCatalog[0];

    return (
        <div className="bg-[radial-gradient(circle_at_top_left,_rgba(34,211,238,0.16),_transparent_28%),linear-gradient(135deg,_#f8fafc_0%,_#eef4ff_100%)]">
            <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
                <div className="rounded-[32px] border border-cyan-100 bg-white/80 p-6 shadow-[0_30px_140px_-48px_rgba(15,23,42,0.35)] backdrop-blur md:p-8 lg:p-10">
                    <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full border border-cyan-200 bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">
                                <Sparkles size={16} /> Browse our curated learning paths
                            </div>
                            <h1 className="mt-5 text-3xl font-semibold text-slate-950 sm:text-4xl">
                                Discover premium courses designed for real momentum.
                            </h1>
                            <p className="mt-4 text-base leading-7 text-slate-600 sm:text-lg">
                                Explore modern technology and language programs in a calm, premium catalog built for ambitious learners.
                            </p>
                        </div>
                        <div className="flex flex-wrap gap-3">
                            <Button as="a" href="/" variant="secondary">Back home</Button>
                            <Button variant="primary">Join a cohort</Button>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col gap-4 xl:flex-row xl:items-center xl:justify-between">
                        <div className="relative flex-1">
                            <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" />
                            <input
                                value={search}
                                onChange={(event) => setSearch(event.target.value)}
                                placeholder="Search courses"
                                className="w-full rounded-full border border-slate-200 bg-slate-50 py-3 pl-12 pr-4 text-sm text-slate-700 outline-none ring-0 transition focus:border-cyan-400 focus:bg-white"
                            />
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {filters.map((filter) => (
                                <button
                                    key={filter}
                                    onClick={() => setActiveFilter(filter)}
                                    className={`rounded-full px-4 py-2 text-sm font-semibold transition ${activeFilter === filter ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20' : 'border border-slate-200 bg-white text-slate-700 hover:border-cyan-400 hover:text-cyan-500'}`}
                                >
                                    {filter}
                                </button>
                            ))}
                        </div>
                    </div>

                    <div className="mt-8 grid gap-6 xl:grid-cols-[280px_minmax(0,1fr)]">
                        <aside className="rounded-[24px] border border-slate-200 bg-slate-50/80 p-5">
                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700">
                                <Compass size={16} className="text-cyan-600" /> Explore by category
                            </div>
                            <button
                                onClick={() => setSelectedCategory('All')}
                                className={`mt-4 flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${selectedCategory === 'All' ? 'bg-cyan-500 text-slate-950' : 'bg-white text-slate-700 hover:bg-cyan-50'}`}
                            >
                                <span>All categories</span>
                                <ChevronRight size={16} />
                            </button>
                            <div className="mt-4 space-y-2">
                                {technologyCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setSelectedCategory(category)}
                                        className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${selectedCategory === category ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-cyan-50'}`}
                                    >
                                        <span>{category}</span>
                                        <ChevronRight size={16} />
                                    </button>
                                ))}
                            </div>
                            <div className="mt-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Filières</p>
                                <div className="mt-3 space-y-2">
                                    {filiereCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${selectedCategory === category ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-cyan-50'}`}
                                        >
                                            <span>{category}</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="mt-6">
                                <p className="text-sm font-semibold uppercase tracking-[0.25em] text-slate-500">Languages</p>
                                <div className="mt-3 space-y-2">
                                    {languageCategories.map((category) => (
                                        <button
                                            key={category}
                                            onClick={() => setSelectedCategory(category)}
                                            className={`flex w-full items-center justify-between rounded-2xl px-4 py-3 text-left text-sm font-medium transition ${selectedCategory === category ? 'bg-slate-900 text-white' : 'bg-white text-slate-700 hover:bg-cyan-50'}`}
                                        >
                                            <span>{category}</span>
                                            <ChevronRight size={16} />
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </aside>

                        <div className="space-y-6">
                            <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }} className="overflow-hidden rounded-[28px] border border-slate-200 bg-slate-950 text-white">
                                <div className={`bg-gradient-to-br ${featuredCourse.accent} p-6 sm:p-8`}>
                                    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                                        <div>
                                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Featured course</p>
                                            <h2 className="mt-3 text-2xl font-semibold sm:text-3xl">{featuredCourse.title}</h2>
                                            <p className="mt-3 max-w-2xl text-sm leading-7 text-slate-600">{featuredCourse.description}</p>
                                        </div>
                                        <div className="rounded-full bg-white/80 px-3 py-1 text-sm font-semibold text-slate-900">{featuredCourse.subcategory}</div>
                                    </div>
                                </div>
                                <div className="grid gap-4 p-6 sm:grid-cols-3 sm:p-8">
                                    <div className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                                        <div className="flex items-center gap-2 text-cyan-300"><Clock3 size={16} /> Duration</div>
                                        <p className="mt-2 text-xl font-semibold">{featuredCourse.duration}</p>
                                    </div>
                                    <div className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                                        <div className="flex items-center gap-2 text-cyan-300"><Users size={16} /> Enrolled</div>
                                        <p className="mt-2 text-xl font-semibold">{featuredCourse.students}</p>
                                    </div>
                                    <div className="rounded-[20px] border border-white/10 bg-white/10 p-4">
                                        <div className="flex items-center gap-2 text-cyan-300"><Star size={16} fill="currentColor" /> Rating</div>
                                        <p className="mt-2 text-xl font-semibold">{featuredCourse.rating}/5</p>
                                    </div>
                                </div>
                            </motion.div>

                            <div className="grid gap-6 md:grid-cols-2 2xl:grid-cols-3">
                                {visibleCourses.map((course) => {
                                    const isPurchased = purchasedCourses.includes(course.id);
                                    return (
                                        <motion.article
                                            key={course.id}
                                            initial={{ opacity: 0, y: 16 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.25 }}
                                            whileHover={{ y: -8, scale: 1.01, boxShadow: '0 25px 70px -30px rgba(2, 132, 199, 0.35)' }}
                                            className="group overflow-hidden rounded-[24px] border border-slate-200 bg-white shadow-[0_18px_60px_-24px_rgba(15,23,42,0.28)]"
                                        >
                                            <div className="relative h-44 overflow-hidden">
                                                <img src={course.image} alt={course.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 to-transparent" />
                                                <div className="absolute left-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold uppercase tracking-[0.25em] text-cyan-700">{course.subcategory}</div>
                                            </div>
                                            <div className="p-5">
                                                <div className="flex items-center justify-between gap-3">
                                                    <div>
                                                        <p className="text-sm font-semibold text-cyan-600">{course.category}</p>
                                                        <h3 className="mt-1 text-xl font-semibold text-slate-950">{course.title}</h3>
                                                    </div>
                                                    <div className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-semibold text-cyan-700">{course.difficulty}</div>
                                                </div>
                                                <p className="mt-3 text-sm leading-7 text-slate-600">{course.description}</p>
                                                <div className="mt-4 flex items-center gap-3">
                                                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{course.avatar}</div>
                                                    <div>
                                                        <p className="text-sm font-semibold text-slate-900">{course.instructor}</p>
                                                        <p className="text-sm text-slate-500">{course.instructorTitle}</p>
                                                    </div>
                                                </div>
                                                <div className="mt-4 flex flex-wrap items-center gap-3 text-sm text-slate-600">
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Star size={14} className="text-cyan-500" fill="currentColor" /> {course.rating}</span>
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Users size={14} /> {course.students}</span>
                                                    <span className="inline-flex items-center gap-1 rounded-full bg-slate-100 px-3 py-1"><Clock3 size={14} /> {course.duration}</span>
                                                </div>
                                                <div className="mt-5 flex items-center justify-between">
                                                    <div className="text-lg font-semibold text-slate-950">{course.price}</div>
                                                    <div className="flex gap-2">
                                                        <Button variant="ghost" size="sm" onClick={() => setSelectedCourse(course)}>View Details</Button>
                                                        <Button variant="primary" size="sm" onClick={() => { if (!isPurchased) { handlePurchase(course.id); } }}>{isPurchased ? 'Continue Learning' : 'Buy Now'}</Button>
                                                    </div>
                                                </div>
                                            </div>
                                        </motion.article>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedCourse && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/70 px-4 py-6 backdrop-blur">
                        <motion.div initial={{ y: 24, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 24, opacity: 0 }} className="max-h-[90vh] w-full max-w-6xl overflow-y-auto rounded-[32px] border border-slate-200 bg-white shadow-2xl">
                            <div className="relative h-72 overflow-hidden sm:h-80">
                                <img src={selectedCourse.image} alt={selectedCourse.title} className="h-full w-full object-cover" />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent" />
                                <div className="absolute left-6 top-6 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold text-slate-900">{selectedCourse.subcategory}</div>
                                <button onClick={() => setSelectedCourse(null)} className="absolute right-6 top-6 rounded-full bg-white/90 px-3 py-2 text-sm font-semibold text-slate-900">Close</button>
                                <div className="absolute bottom-6 left-6 right-6">
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Course preview</p>
                                    <h2 className="mt-2 text-3xl font-semibold text-white">{selectedCourse.title}</h2>
                                </div>
                            </div>
                            <div className="grid gap-8 p-6 lg:grid-cols-[1.1fr_0.9fr] lg:p-8">
                                <div>
                                    <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Course overview</p>
                                    <p className="mt-4 text-base leading-8 text-slate-600">{selectedCourse.longDescription}</p>
                                    <div className="mt-8 grid gap-4 sm:grid-cols-3">
                                        <Card className="p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><GraduationCap size={16} className="text-cyan-600" /> Difficulty</div>
                                            <p className="mt-2 text-lg font-semibold text-slate-950">{selectedCourse.difficulty}</p>
                                        </Card>
                                        <Card className="p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Clock3 size={16} className="text-cyan-600" /> Duration</div>
                                            <p className="mt-2 text-lg font-semibold text-slate-950">{selectedCourse.duration}</p>
                                        </Card>
                                        <Card className="p-4">
                                            <div className="flex items-center gap-2 text-sm font-semibold text-slate-700"><Star size={16} className="text-cyan-600" fill="currentColor" /> Rating</div>
                                            <p className="mt-2 text-lg font-semibold text-slate-950">{selectedCourse.rating}/5</p>
                                        </Card>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-slate-950">Learning objectives</h3>
                                        <ul className="mt-4 space-y-3 text-sm text-slate-600">
                                            {selectedCourse.learningObjectives.map((item) => <li key={item} className="flex items-start gap-2"><BrainCircuit size={16} className="mt-0.5 text-cyan-600" /> {item}</li>)}
                                        </ul>
                                    </div>

                                    <div className="mt-8">
                                        <h3 className="text-xl font-semibold text-slate-950">Curriculum</h3>
                                        <div className="mt-4 grid gap-3 sm:grid-cols-2">
                                            {selectedCourse.curriculum.map((item) => <Card key={item} className="p-4 text-sm font-medium text-slate-700">{item}</Card>)}
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <Card className="p-5">
                                        <div className="flex items-center gap-3">
                                            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">{selectedCourse.avatar}</div>
                                            <div>
                                                <p className="font-semibold text-slate-950">{selectedCourse.instructor}</p>
                                                <p className="text-sm text-slate-500">{selectedCourse.instructorTitle}</p>
                                            </div>
                                        </div>
                                        <div className="mt-5 flex items-center justify-between rounded-[20px] bg-slate-50 p-4">
                                            <div>
                                                <p className="text-sm text-slate-500">Course price</p>
                                                <p className="text-2xl font-semibold text-slate-950">{selectedCourse.price}</p>
                                            </div>
                                            <Button variant="primary" onClick={() => handlePurchase(selectedCourse.id)}>{purchasedCourses.includes(selectedCourse.id) ? 'Continue Learning' : 'Buy Course'}</Button>
                                        </div>
                                        <div className="mt-5 flex flex-wrap gap-2">
                                            {selectedCourse.skills.map((skill) => <span key={skill} className="rounded-full bg-cyan-50 px-3 py-1 text-sm font-medium text-cyan-700">{skill}</span>)}
                                        </div>
                                    </Card>

                                    <Card className="p-5">
                                        <h3 className="text-lg font-semibold text-slate-950">Student reviews</h3>
                                        <div className="mt-4 space-y-3">
                                            {selectedCourse.reviews.map((review) => <div key={review.name} className="rounded-[18px] border border-slate-200 p-4 text-sm text-slate-600"><p className="font-semibold text-slate-950">{review.name}</p><p className="mt-2">“{review.quote}”</p></div>)}
                                        </div>
                                    </Card>

                                    <Card className="p-5">
                                        <h3 className="text-lg font-semibold text-slate-950">FAQ</h3>
                                        <div className="mt-4 space-y-3">
                                            {selectedCourse.faq.map((item) => <div key={item.question} className="rounded-[18px] border border-slate-200 p-4 text-sm text-slate-600"><p className="font-semibold text-slate-950">{item.question}</p><p className="mt-2">{item.answer}</p></div>)}
                                        </div>
                                    </Card>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
