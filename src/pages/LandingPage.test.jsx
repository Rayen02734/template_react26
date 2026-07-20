import { fireEvent, render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { LocaleProvider } from '../context/LocaleContext';
import LandingPage from './LandingPage';

describe('LandingPage auth actions', () => {
    test('shows the sign-in form when the sign in button is clicked', () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <LocaleProvider>
                    <LandingPage />
                </LocaleProvider>
            </MemoryRouter>
        );

        fireEvent.click(screen.getByRole('button', { name: /sign in/i }));

        expect(screen.getByText(/welcome back/i)).toBeInTheDocument();
    });

    test('shows the registration form when the start learning button is clicked', () => {
        render(
            <MemoryRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
                <LocaleProvider>
                    <LandingPage />
                </LocaleProvider>
            </MemoryRouter>
        );

        const startLearningButtons = screen.getAllByRole('button', { name: /start learning/i });
        fireEvent.click(startLearningButtons[0]);

        expect(screen.getByText(/create account/i)).toBeInTheDocument();
    });
});
