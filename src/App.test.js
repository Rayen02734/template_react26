import { fireEvent, render, screen } from '@testing-library/react';
import App from './App';
import TeacherSettings from './pages/teacher/TeacherSettings';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LocaleProvider } from './context/LocaleContext';

const renderWithProviders = (ui) => render(
  <ThemeProvider>
    <LocaleProvider>
      <AuthProvider>{ui}</AuthProvider>
    </LocaleProvider>
  </ThemeProvider>
);

beforeEach(() => {
  window.history.pushState({}, '', '/');
  localStorage.clear();
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

test('renders the GrowUp landing page', () => {
  renderWithProviders(<App />);
  expect(screen.getAllByText(/growup/i).length).toBeGreaterThan(0);
});

test('unlocks the student workspace after a simulated course purchase', async () => {
  localStorage.setItem('growup-user', JSON.stringify({ name: 'Student Demo', role: 'student', email: 'student@growup.com' }));
  window.history.pushState({}, '', '/student/dashboard');

  renderWithProviders(<App />);

  expect(screen.getByText(/unlock your learning workspace/i)).toBeInTheDocument();
  fireEvent.click(screen.getByRole('button', { name: /purchase ai product design/i }));

  expect(await screen.findByText(/continue your purchased courses/i)).toBeInTheDocument();
  expect(screen.getAllByText(/ai product design/i).length).toBeGreaterThan(0);
});

test('renders teacher settings controls', () => {
  render(<TeacherSettings />);
  expect(screen.getByText(/Email reminders/i)).toBeInTheDocument();
});

test('renders the teacher AI assistant route for authenticated teachers', () => {
  localStorage.setItem('growup-user', JSON.stringify({ name: 'Teacher Demo', role: 'teacher', email: 'teacher@growup.com' }));
  window.history.pushState({}, '', '/teacher/ai-assistant');

  renderWithProviders(<App />);

  expect(screen.getAllByText(/AI assistant/i).length).toBeGreaterThan(0);
  expect(screen.getByText(/Daily guidance for learner success/i)).toBeInTheDocument();
});

test('redirects unknown teacher paths to the dashboard', () => {
  localStorage.setItem('growup-user', JSON.stringify({ name: 'Teacher Demo', role: 'teacher', email: 'teacher@growup.com' }));
  window.history.pushState({}, '', '/teacher/unknown-route');

  renderWithProviders(<App />);

  expect(screen.getByText(/Welcome back, Teacher Demo/i)).toBeInTheDocument();
});
