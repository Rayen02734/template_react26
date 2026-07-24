import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import AdminOverview from './AdminOverview';
import AdminLayout from '../components/admin/AdminLayout';

test('renders the GrowUp admin dashboard headline', () => {
    render(
        <MemoryRouter>
            <AdminLayout title="Tableau de bord" subtitle="Vue d'ensemble de la plateforme — jeudi 23 juillet 2026">
                <AdminOverview />
            </AdminLayout>
        </MemoryRouter>
    );

    expect(screen.getByRole('heading', { name: /Tableau de bord/i })).toBeInTheDocument();
    expect(screen.getByText(/Vue d'ensemble de la plateforme/i)).toBeInTheDocument();
});
