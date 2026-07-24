import { Users, BookOpen, Wallet, CircleCheckBig } from 'lucide-react';
import StatCard from './StatCard';

const stats = [
    { icon: Users, value: '124,530', label: 'Utilisateurs inscrits', delta: '+8.2%', positive: true, accent: 'bg-[#3B5BFF]' },
    { icon: BookOpen, value: '2,412', label: 'Cours actifs', delta: '+3.1%', positive: true, accent: 'bg-[#22C55E]' },
    { icon: Wallet, value: '86,400 TND', label: 'Revenu ce mois-ci', delta: '+14.6%', positive: true, accent: 'bg-[#F59E0B]' },
    { icon: CircleCheckBig, value: '94%', label: 'Taux de complétion', delta: '-1.4%', positive: false, accent: 'bg-[#EF4444]' },
];

export default function StatsGrid() {
    return (
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((card) => (
                <StatCard key={card.label} {...card} />
            ))}
        </div>
    );
}
