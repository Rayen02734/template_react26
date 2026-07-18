import { CalendarDays, ExternalLink, Video } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const sessions = [
    { course: 'AI Product Design', teacher: 'Alicia Laurent', date: '2026-07-20', time: '18:30', accessKey: 'GROWUP-AI-01', link: 'https://meet.google.com/abc-defg-hij' },
    { course: 'Business English', teacher: 'Daniel Brooks', date: '2026-07-22', time: '16:00', accessKey: 'GROWUP-ENG-02', link: 'https://meet.google.com/xyz-1234-abc' },
];

export default function StudentLiveCoursesPage() {
    return (
        <StudentPageShell
            eyebrow="Live Courses"
            title="Join your next live session"
            description="Every live class is organized around your enrolled courses and designed to feel like a premium virtual classroom."
            stats={[
                { label: 'Live today', value: '2' },
                { label: 'Meetings this week', value: '4' },
                { label: 'Access keys', value: '2' },
            ]}
        >
            <div className="space-y-4">
                {sessions.map((session) => (
                    <Card key={session.course}>
                        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                            <div>
                                <div className="flex items-center gap-2 text-cyan-600">
                                    <Video className="h-4 w-4" />
                                    <span className="text-sm font-semibold uppercase tracking-[0.2em]">Live class</span>
                                </div>
                                <h3 className="mt-2 text-xl font-semibold text-slate-900 dark:text-white">{session.course}</h3>
                                <p className="mt-1 text-sm text-slate-500">Coach • {session.teacher}</p>
                                <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">{session.date} · {session.time}</p>
                            </div>
                            <div className="rounded-[20px] border border-slate-200 bg-slate-50 p-4 dark:border-slate-800 dark:bg-slate-950/50">
                                <p className="text-sm text-slate-500">Access key</p>
                                <p className="mt-1 font-semibold text-slate-900 dark:text-white">{session.accessKey}</p>
                                <a href={session.link} target="_blank" rel="noreferrer" className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-cyan-600">
                                    <ExternalLink className="h-4 w-4" /> Open Google Meet
                                </a>
                            </div>
                            <Button variant="primary">Join session</Button>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
