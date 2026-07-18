import { Settings, ToggleRight } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

export default function StudentSettingsPage() {
    return (
        <StudentPageShell
            eyebrow="Settings"
            title="Control your learning experience"
            description="Fine-tune reminders, preferences, and the way your AI assistant supports you."
            stats={[
                { label: 'Reminders', value: 'On' },
                { label: 'Theme', value: 'Auto' },
                { label: 'AI nudges', value: 'Enabled' },
            ]}
        >
            <div className="space-y-4">
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Email reminders</p>
                            <p className="mt-1 text-sm text-slate-500">Receive a weekly recap with progress insights.</p>
                        </div>
                        <ToggleRight className="h-6 w-6 text-cyan-500" />
                    </div>
                </Card>
                <Card>
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="font-semibold text-slate-900 dark:text-white">Study preferences</p>
                            <p className="mt-1 text-sm text-slate-500">Keep personalized AI recommendations active.</p>
                        </div>
                        <Settings className="h-5 w-5 text-cyan-500" />
                    </div>
                </Card>
            </div>
        </StudentPageShell>
    );
}
