import { Receipt } from 'lucide-react';
import StudentPageShell from './StudentPageShell';
import Card from '../../components/ui/Card';
import Button from '../../components/ui/Button';

const payments = [
    { course: 'AI Product Design', price: '$129', date: '2026-07-10', status: 'Paid' },
    { course: 'Business English', price: '$89', date: '2026-07-02', status: 'Paid' },
];

export default function StudentPaymentsPage() {
    return (
        <StudentPageShell
            eyebrow="Payment History"
            title="Your purchase records at a glance"
            description="Every successful checkout is preserved here with payment status and invoice-ready details."
            stats={[
                { label: 'Total spent', value: '$218' },
                { label: 'Paid courses', value: '2' },
                { label: 'Invoice ready', value: '2' },
            ]}
        >
            <div className="space-y-4">
                {payments.map((payment) => (
                    <Card key={payment.course}>
                        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
                            <div>
                                <p className="font-semibold text-slate-900 dark:text-white">{payment.course}</p>
                                <p className="mt-1 text-sm text-slate-500">Purchased on {payment.date}</p>
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="rounded-2xl border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm font-semibold text-emerald-700 dark:border-emerald-900/40 dark:bg-emerald-950/30 dark:text-emerald-300">
                                    {payment.status}
                                </div>
                                <div className="text-sm font-semibold text-slate-900 dark:text-white">{payment.price}</div>
                                <Button variant="secondary" size="sm">
                                    <Receipt className="mr-2 h-4 w-4" /> Invoice
                                </Button>
                            </div>
                        </div>
                    </Card>
                ))}
            </div>
        </StudentPageShell>
    );
}
