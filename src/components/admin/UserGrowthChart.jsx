import { useMemo } from 'react';

const data = [
    { day: 'Lun', value: 42 },
    { day: 'Mar', value: 58 },
    { day: 'Mer', value: 64 },
    { day: 'Jeu', value: 78 },
    { day: 'Ven', value: 83 },
    { day: 'Sam', value: 74 },
    { day: 'Dim', value: 90 },
];

export default function UserGrowthChart() {
    const maxValue = useMemo(() => Math.max(...data.map((item) => item.value)), []);

    return (
        <div className="rounded-[20px] border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
                <div>
                    <h3 className="text-lg font-semibold text-[#0F172A]">Croissance des utilisateurs</h3>
                    <p className="text-sm text-[#64748B]">Évolution hebdomadaire</p>
                </div>
                <div className="flex items-center gap-2 text-sm text-[#64748B]">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#3B5BFF]" />
                    <span>Actifs</span>
                </div>
            </div>

            <div className="mt-6 flex h-56 items-end justify-between gap-3">
                {data.map((item) => (
                    <div key={item.day} className="flex flex-1 flex-col items-center gap-3">
                        <div className="flex h-full w-full items-end rounded-2xl bg-[#F8FAFC] p-2">
                            <div
                                className="w-full rounded-xl bg-gradient-to-t from-[#3B5BFF] to-[#8DA3FF]"
                                style={{ height: `${(item.value / maxValue) * 100}%` }}
                            />
                        </div>
                        <span className="text-sm font-medium text-[#64748B]">{item.day}</span>
                    </div>
                ))}
            </div>
        </div>
    );
}
