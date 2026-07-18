import { BellRing } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

const notifications = [
    { title: 'Payment confirmed', detail: 'Your course purchase is active and the workspace is unlocked.' },
    { title: 'Upcoming live class', detail: 'AI Product Design begins tomorrow at 6:30 PM.' },
    { title: 'New AI recommendation', detail: 'A short recap lesson has been suggested based on your latest quiz results.' },
];

export default function StudentNotificationsPage() {
    return (
        <StudentPageShell
            eyebrow="Notifications"
            title="Stay updated without clutter"
            description="A focused feed keeps payment confirmations, reminders, and AI suggestions visible in one place."
            stats={[
                { label: 'New alerts', value: '3' },
                { label: 'Today', value: '2' },
                { label: 'Priority', value: '1' },
            ]}
        >
            <div className="space-y-4">
                {notifications.map((item) => (
                    <Card key={item.title}>
                        <div className="flex items-start gap-3">
                            <div className="rounded-2xl bg-cyan-50 p-3 text-cyan-600 dark:bg-cyan-950/30">
                                <BellRing className="h-5 w-5" />
                            </div>
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">{item.detail}</p>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
