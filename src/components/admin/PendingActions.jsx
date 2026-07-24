const actions = [
    { title: 'Demandes de formateurs', description: 'Nouvelles candidatures à valider', count: 5 },
    { title: 'Signalements', description: 'Contenus et comportements à vérifier', count: 2 },
    { title: 'Remboursements', description: 'Demandes de remboursement en attente', count: 3 },
];

export default function PendingActions() {
    return (
        <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Actions en attente</h3>
                    <p className="text-sm text-[#64748B]">Priorités du moment</p>
                </div>
            </div>
            <div className="mt-4 space-y-3">
                {actions.map((action) => (
                    <div key={action.title} className="flex items-center justify-between rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] px-4 py-3">
                        <div>
                            <p className="font-medium text-[#0F172A]">{action.title}</p>
                            <p className="text-sm text-[#64748B]">{action.description}</p>
                        </div>
                        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-[#3B5BFF] text-sm font-semibold text-white">
                            {action.count}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
