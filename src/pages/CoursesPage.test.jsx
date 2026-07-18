import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import CoursesPage from './CoursesPage';
import { ThemeProvider } from '../context/ThemeContext';
import { LocaleProvider } from '../context/LocaleContext';
import { AuthProvider } from '../context/AuthContext';

beforeEach(() => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: jest.fn().mockImplementation((query) => ({
            matches: false,
            media: query,
            onchange: null,
            addListener: jest.fn(),
            removeListener: jest.fn(),
            addEventListener: jest.fn(),
            removeEventListener: jest.fn(),
            dispatchEvent: jest.fn(),
        })),
    });
});

const renderCoursesPage = () => render(
    <ThemeProvider>
        <LocaleProvider>
            <AuthProvider>
                <MemoryRouter initialEntries={['/courses']}>
                    <CoursesPage />
                </MemoryRouter>
            </AuthProvider>
        </LocaleProvider>
    </ThemeProvider>
);

test('renders the premium course catalog experience', () => {
    renderCoursesPage();

    expect(screen.getByPlaceholderText(/search courses/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /technology/i })).toBeInTheDocument();
    expect(screen.getByText(/browse our curated learning paths/i)).toBeInTheDocument();
});
