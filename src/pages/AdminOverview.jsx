import StatsGrid from '../components/admin/StatsGrid';
import RecentEnrollmentsTable from '../components/admin/RecentEnrollmentsTable';
import UserGrowthChart from '../components/admin/UserGrowthChart';
import PopularCoursesTable from '../components/admin/PopularCoursesTable';
import PendingActions from '../components/admin/PendingActions';

export default function AdminOverview() {
    return (
        <div className="space-y-6">
            <StatsGrid />

            <div className="grid gap-6 xl:grid-cols-[1.7fr_1fr]">
                <div className="space-y-6">
                    <RecentEnrollmentsTable />
                    <PopularCoursesTable />
                </div>
                <div className="space-y-6">
                    <UserGrowthChart />
                    <PendingActions />
                </div>
            </div>
        </div>
    );
}
