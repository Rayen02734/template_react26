const payments = [
    { id: 'INV-1024', client: 'Northstar Studio', amount: '$2,400', status: 'Paid' },
    { id: 'INV-1025', client: 'Bright Labs', amount: '$980', status: 'Pending' },
    { id: 'INV-1026', client: 'Pixel Forge', amount: '$1,560', status: 'Paid' },
];

export default function AdminPayments() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Payments</h1>
            <div className="mt-6 space-y-3">
                {payments.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">{payment.client}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{payment.id}</p>
                        </div>
                        <div className="text-right">
                            <p className="font-semibold text-slate-900 dark:text-white">{payment.amount}</p>
                            <p className="text-sm text-cyan-500">{payment.status}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}


