import { BadgeCheck, Mail, MapPin, Phone } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

export default function StudentProfilePage() {
    return (
        <StudentPageShell
            eyebrow="Profile"
            title="Your learner profile"
            description="A calm profile area makes it easy to review your academic identity and preferences."
            stats={[
                { label: 'Learning goals', value: '3' },
                { label: 'Preferred pace', value: 'Balanced' },
                { label: 'Support mode', value: 'AI + mentor' },
            ]}
        >
            <div className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
                <Card>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-500 to-blue-600 text-lg font-semibold text-white">SD</div>
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Student Demo</p>
                            <p className="text-sm text-slate-500">Advanced learner</p>
                        </div>
                    </div>
                    <div className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="flex items-center gap-2"><Mail className="h-4 w-4 text-cyan-500" /> student@growup.com</div>
                        <div className="flex items-center gap-2"><Phone className="h-4 w-4 text-cyan-500" /> +216 20 000 000</div>
                        <div className="flex items-center gap-2"><MapPin className="h-4 w-4 text-cyan-500" /> Tunis, Tunisia</div>
                    </div>
                </Card>

                <Card>
                    <div className="flex items-center gap-2 text-cyan-600">
                        <BadgeCheck className="h-4 w-4" />
                        <span className="text-sm font-semibold uppercase tracking-[0.2em]">Learning preferences</span>
                    </div>
                    <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">Focus on project-based lessons and live feedback.</div>
                        <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-3 dark:border-slate-800 dark:bg-slate-950/50">Enjoy concise explanations and strong visual examples.</div>
                    </div>
                </Card>
            </div>
        </StudentPageShell>
    );
}
