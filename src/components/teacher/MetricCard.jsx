import KpiCard from '../ui/KpiCard';

export default function MetricCard({ title, value, note, accent = 'cyan' }) {
    const accentMap = {
        cyan: 'mint',
        violet: 'lavender',
        emerald: 'mint',
        amber: 'peach',
        slate: 'slate',
    };

    return (
        <KpiCard
            label={title}
            value={value}
            description={note}
            accent={accentMap[accent] || 'slate'}
            monogram={title
                .split(' ')
                .map((word) => word[0])
                .slice(0, 2)
                .join('')
                .toUpperCase()}
            trend="+4.8%"
            trendType="positive"
        />
    );
}
