import { BookOpen, GraduationCap } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

const courses = [
    { title: 'AI Product Design', teacher: 'Alicia Laurent', category: 'Product', progress: 82, nextLesson: 'Interaction patterns' },
    { title: 'Business English', teacher: 'Daniel Brooks', category: 'Communication', progress: 61, nextLesson: 'Executive speaking drills' },
];

export default function StudentLearningPage() {
    return (
        <StudentPageShell
            eyebrow="My Learning"
            title="Continue your purchased courses"
            description="Each course keeps your progress, next lesson, and achievements in one polished workspace."
            stats={[
                { label: 'Active courses', value: courses.length },
                { label: 'Current streak', value: '7 days' },
                { label: 'Avg. progress', value: '72%' },
            ]}
        >
            <div className="grid gap-6 lg:grid-cols-2">
                {courses.map((course) => (
                    <Card key={course.title}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{course.category}</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{course.title}</h3>
                                <p className="mt-2 text-sm text-slate-500">Teacher • {course.teacher}</p>
                            </div>
                            <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950/30">
                                <GraduationCap className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-5 h-2 rounded-full bg-slate-200 dark:bg-slate-800">
                            <div className="h-2 rounded-full bg-cyan-500" style={{ width: `${course.progress}%` }} />
                        </div>
                        <div className="mt-4 flex items-center justify-between text-sm text-slate-500">
                            <span>{course.progress}% complete</span>
                            <span className="font-semibold text-cyan-600">Next: {course.nextLesson}</span>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
