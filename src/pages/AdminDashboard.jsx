import { Outlet } from 'react-router-dom';
import AdminLayout from '../components/admin/AdminLayout';

export default function AdminDashboard() {
    return (
        <AdminLayout
            title="Tableau de bord"
            subtitle="Vue d'ensemble de la plateforme — jeudi 23 juillet 2026"
        >
            <Outlet />
        </AdminLayout>
    );
}
