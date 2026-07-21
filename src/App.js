import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import PublicLayout from './layouts/PublicLayout';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import CoursesPage from './pages/CoursesPage';
import PaymentPage from './pages/PaymentPage';
import SignInPage from './pages/SignInPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import ProtectedRoute from './routes/ProtectedRoute';
import AdminDashboard from './pages/AdminDashboard';
import AdminOverview from './pages/AdminOverview';
import AdminUsers from './pages/AdminUsers';
import AdminCourses from './pages/AdminCourses';
import AdminPayments from './pages/AdminPayments';
import AdminSettings from './pages/AdminSettings';
import AdminStatistics from './pages/AdminStatistics';
import VerifyPage from './pages/VerifyPage';
import AdminAIAnalytics from './pages/AdminAIAnalytics';
import TeacherLogin from './pages/TeacherLogin';
import LiveClasses from './pages/LiveClasses';
import AuthRequiredRoute from './routes/AuthRequiredRoute';
import TeacherProtectedRoute from './routes/TeacherProtectedRoute';
import TeacherLayout from './layouts/TeacherLayout';
import TeacherDashboard from './pages/TeacherDashboard';
import TeacherProfile from './pages/teacher/TeacherProfile';
import TeacherCourses from './pages/teacher/TeacherCourses';
import TeacherSessions from './pages/teacher/TeacherSessions';
import TeacherQuizzes from './pages/teacher/TeacherQuizzes';
import TeacherStudents from './pages/teacher/TeacherStudents';
import TeacherCalendar from './pages/teacher/TeacherCalendar';
import TeacherAnalytics from './pages/teacher/TeacherAnalytics';
import TeacherSettings from './pages/teacher/TeacherSettings';
import StudentLayout from './layouts/StudentLayout';
import StudentDashboardPage from './pages/student/StudentDashboardPage';
import StudentLearningPage from './pages/student/StudentLearningPage';
import StudentLiveCoursesPage from './pages/student/StudentLiveCoursesPage';
import StudentQuizzesPage from './pages/student/StudentQuizzesPage';
import StudentCalendarPage from './pages/student/StudentCalendarPage';
import StudentAssistantPage from './pages/student/StudentAssistantPage';
import StudentPaymentsPage from './pages/student/StudentPaymentsPage';
import StudentNotificationsPage from './pages/student/StudentNotificationsPage';
import StudentProfilePage from './pages/student/StudentProfilePage';
import StudentSettingsPage from './pages/student/StudentSettingsPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<PublicLayout />}>
          <Route path="/" element={<LandingPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/payment" element={<PaymentPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Route>
        <Route path="/teacher/login" element={<TeacherLogin />} />
        <Route element={<AuthRequiredRoute />}>
          <Route path="/live-classes" element={<LiveClasses />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/admin" element={<AdminDashboard />}>
            <Route index element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="dashboard" element={<AdminOverview />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="courses" element={<AdminCourses />} />
            <Route path="payments" element={<AdminPayments />} />
            <Route path="statistics" element={<AdminStatistics />} />
            <Route path="ai" element={<AdminAIAnalytics />} />
            <Route path="settings" element={<AdminSettings />} />
          </Route>
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/student" element={<Navigate to="/student/dashboard" replace />} />
          <Route element={<StudentLayout />}>
            <Route path="/student/dashboard" element={<StudentDashboardPage />} />
            <Route path="/student/learning" element={<StudentLearningPage />} />
            <Route path="/student/live-courses" element={<StudentLiveCoursesPage />} />
            <Route path="/student/quizzes" element={<StudentQuizzesPage />} />
            <Route path="/student/calendar" element={<StudentCalendarPage />} />
            <Route path="/student/assistant" element={<StudentAssistantPage />} />
            <Route path="/student/payments" element={<StudentPaymentsPage />} />
            <Route path="/student/notifications" element={<StudentNotificationsPage />} />
            <Route path="/student/profile" element={<StudentProfilePage />} />
            <Route path="/student/settings" element={<StudentSettingsPage />} />
          </Route>
        </Route>
        <Route path="/teacher" element={<TeacherProtectedRoute />}>
          <Route element={<TeacherLayout />}>
            <Route index element={<Navigate to="/teacher/dashboard" replace />} />
            <Route path="dashboard" element={<TeacherDashboard />} />
            <Route path="courses" element={<TeacherCourses />} />
            <Route path="live-courses" element={<TeacherSessions />} />
            <Route path="students" element={<TeacherStudents />} />
            <Route path="quizzes" element={<TeacherQuizzes />} />
            <Route path="calendar" element={<TeacherCalendar />} />
            <Route path="ai-assistant" element={<TeacherAnalytics />} />
            <Route path="profile" element={<TeacherProfile />} />
            <Route path="settings" element={<TeacherSettings />} />
            <Route path="*" element={<Navigate to="/teacher/dashboard" replace />} />
          </Route>
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
