import { BrainCircuit, Sparkles } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const quizzes = [
    { course: 'AI Product Design', title: 'Design systems quiz', score: 84, feedback: 'Strong grasp of interaction patterns. Review accessibility states to reach mastery.' },
    { course: 'Business English', title: 'Speaking confidence quiz', score: 76, feedback: 'You are clear and persuasive. Improve concision for executive presentations.' },
];

export default function StudentQuizzesPage() {
    return (
        <StudentPageShell
            eyebrow="Quizzes & Exercises"
            title="Practice with guided AI feedback"
            description="Quizzes are simulated for the demo experience, but they feel polished and useful for portfolio presentation."
            stats={[
                { label: 'Completed quizzes', value: '2' },
                { label: 'Average score', value: '80%' },
                { label: 'AI feedback', value: 'Live' },
            ]}
        >
            <div className="grid gap-6 lg:grid-cols-2">
                {quizzes.map((quiz) => (
                    <Card key={quiz.title}>
                        <div className="flex items-start justify-between gap-3">
                            <div>
                                <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">{quiz.course}</p>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{quiz.title}</h3>
                            </div>
                            <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950/30">
                                <BrainCircuit className="h-5 w-5" />
                            </div>
                        </div>
                        <div className="mt-5 rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                            <div className="flex items-center justify-between text-sm text-slate-500">
                                <span>Simulated score</span>
                                <span className="font-semibold text-cyan-600">{quiz.score}%</span>
                            </div>
                            <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{quiz.feedback}</p>
                        </div>
                        <div className="mt-4 flex items-center justify-between">
                            <div className="flex items-center gap-2 text-sm text-slate-500">
                                <Sparkles className="h-4 w-4 text-cyan-500" /> AI feedback ready
                            </div>
                            <Button variant="primary" size="sm">Retake quiz</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
