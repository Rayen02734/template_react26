import { MoreHorizontal } from 'lucide-react';

const enrollments = [
    { name: 'Mina Chen', email: 'mina@growup.io', course: 'UX Research', date: '12 Jul', status: 'Actif' },
    { name: 'Yassine Ben', email: 'yassine@growup.io', course: 'Product Design', date: '11 Jul', status: 'En attente' },
    { name: 'Nora Slim', email: 'nora@growup.io', course: 'Data Science', date: '09 Jul', status: 'Suspendu' },
];

function statusClasses(status) {
    if (status === 'Actif') return 'bg-emerald-50 text-emerald-600';
    if (status === 'En attente') return 'bg-amber-50 text-amber-600';
    return 'bg-rose-50 text-rose-600';
}

export default function RecentEnrollmentsTable() {
    return (
        <div className="overflow-hidden rounded-[20px] border border-[#E2E8F0] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2E8F0] px-5 py-4">
                <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Inscriptions récentes</h3>
                    <p className="text-sm text-[#64748B]">Suivi des nouveaux étudiants</p>
                </div>
                <button className="text-sm font-medium text-[#3B5BFF]">Voir tout →</button>
            </div>
            <div className="overflow-x-auto">
                <table className="min-w-full text-left text-sm">
                    <thead className="bg-[#F8FAFC] text-[#64748B]">
                        <tr>
                            <th className="px-5 py-3 font-medium">Utilisateur</th>
                            <th className="px-5 py-3 font-medium">Cours</th>
                            <th className="px-5 py-3 font-medium">Date</th>
                            <th className="px-5 py-3 font-medium">Statut</th>
                        </tr>
                    </thead>
                    <tbody>
                        {enrollments.map((entry) => (
                            <tr key={entry.name} className="border-t border-[#E2E8F0]">
                                <td className="px-5 py-4">
                                    <div className="flex items-center gap-3">
                                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#E8EEFF] font-semibold text-[#3B5BFF]">
                                            {entry.name.split(' ').map((part) => part[0]).join('')}
                                        </div>
                                        <div>
                                            <p className="font-medium text-[#0F172A]">{entry.name}</p>
                                            <p className="text-xs text-[#64748B]">{entry.email}</p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-5 py-4 text-[#0F172A]">{entry.course}</td>
                                <td className="px-5 py-4 text-[#64748B]">{entry.date}</td>
                                <td className="px-5 py-4">
                                    <span className={`rounded-full px-2.5 py-1 text-xs font-semibold ${statusClasses(entry.status)}`}>
                                        {entry.status}
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
