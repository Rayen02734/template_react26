import { CalendarDays, Clock3 } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';

const calendarItems = [
    { title: 'Live session • AI Product Design', date: 'Jul 20', time: '6:30 PM', type: 'Live class' },
    { title: 'Quiz deadline • Speaking confidence', date: 'Jul 22', time: '11:59 PM', type: 'Deadline' },
    { title: 'Assignment reminder • Reflection', date: 'Jul 24', time: '8:00 PM', type: 'Assignment' },
];

export default function StudentCalendarPage() {
    return (
        <StudentPageShell
            eyebrow="Calendar"
            title="Keep your learning schedule visible"
            description="Live classes, deadlines, and reflections are grouped into a calm weekly planner."
            stats={[
                { label: 'Upcoming items', value: '3' },
                { label: 'Live classes', value: '1' },
                { label: 'Deadlines', value: '2' },
            ]}
        >
            <div className="space-y-4">
                {calendarItems.map((item) => (
                    <Card key={item.title}>
                        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                                <p className="mt-1 text-sm text-slate-500">{item.type}</p>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-cyan-600">
                                <CalendarDays className="h-4 w-4" /> {item.date}
                                <Clock3 className="ml-2 h-4 w-4" /> {item.time}
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
