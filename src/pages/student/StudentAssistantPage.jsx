import { BrainCircuit, Sparkles } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

const suggestions = [
    'Your AI coach recommends a 20-minute review of interaction patterns before your next session.',
    'You are improving quickly. Keep practicing concise phrasing for executive communication.',
    'A short study plan for the next 3 days is ready and personalized to your recent quiz results.',
];

export default function StudentAssistantPage() {
    return (
        <StudentPageShell
            eyebrow="AI Assistant"
            title="Your personal learning companion"
            description="The assistant summarizes progress, explains weak topics, and recommends focused actions."
            stats={[
                { label: 'Insights today', value: '3' },
                { label: 'Study plan', value: 'Ready' },
                { label: 'Weak topics', value: '1' },
            ]}
        >
            <div className="grid gap-6 lg:grid-cols-[1.05fr_0.95fr]">
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950/30">
                            <BrainCircuit className="h-5 w-5" />
                        </div>
                        <div>
                            <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-600">Coach note</p>
                            <h3 className="mt-1 text-xl font-semibold text-slate-900 dark:text-white">You are doing well</h3>
                        </div>
                    </div>
                    <p className="mt-5 text-sm leading-7 text-slate-600 dark:text-slate-300">Your latest quiz suggests your strongest area is systems thinking. A gentle review of accessibility details will make your next attempt even stronger.</p>
                </Card>

                <Card>
                    <div className="flex items-center gap-2 text-cyan-600">
                        <Sparkles className="h-4 w-4" />
                        <span className="text-sm font-semibold uppercase tracking-[0.2em]">Recommendations</span>
                    </div>
                    <div className="mt-4 space-y-3">
                        {suggestions.map((item) => (
                            <div key={item} className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 text-sm text-slate-600 dark:border-slate-800 dark:bg-slate-950/50 dark:text-slate-300">
                                {item}
                            </div>
                        ))}
                    </div>
                </Card>
            </div>
        </StudentPageShell>
    );
}
