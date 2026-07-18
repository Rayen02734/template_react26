const courses = [
    { title: 'Allmeand', lessons: '25 lessons', level: 'Intermediate' },
    { title: 'AI', lessons: '12 lessons', level: 'Beginner' },
    { title: 'MERN Stack', lessons: '10 lessons', level: 'Advanced' },
];

export default function AdminCourses() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Courses</h1>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
                {courses.map((course) => (
                    <div key={course.title} className="rounded-2xl border border-slate-200 bg-slate-50 p-5 dark:border-slate-800 dark:bg-slate-950/70">
                        <h2 className="text-xl font-semibold text-slate-900 dark:text-white">{course.title}</h2>
                        <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{course.lessons}</p>
                        <p className="mt-4 inline-flex rounded-full bg-cyan-500/10 px-3 py-1 text-sm text-cyan-500">{course.level}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

