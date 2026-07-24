const users = [
    { name: 'Mina Chen', email: 'mina@example.com', status: 'Active' },
    { name: 'Leo Alvarez', email: 'leo@example.com', status: 'Pending' },
    { name: 'Sara Kim', email: 'sara@example.com', status: 'Active' },
];

import Badge from '../components/ui/Badge';

export default function AdminUsers() {
    return (
        <div>
            <h1 className="text-3xl font-semibold text-slate-900 dark:text-white">Users</h1>
            <div className="mt-6 space-y-3">
                {users.map((user) => (
                    <div key={user.name} className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-4 dark:border-slate-800 dark:bg-slate-950/70">
                        <div>
                            <p className="font-medium text-slate-900 dark:text-white">{user.name}</p>
                            <p className="text-sm text-slate-500 dark:text-slate-400">{user.email}</p>
                        </div>
                        <Badge variant={user.status === 'Active' ? 'success' : user.status === 'Pending' ? 'pending' : 'neutral'}>{user.status}</Badge>
                    </div>
                ))}
            </div>
        </div>
    );
}

