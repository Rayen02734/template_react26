const LS_KEY = 'growup-teacher-store-v1';

const sampleCourses = [
  {
    id: 'c-react',
    title: 'React for Professionals',
    description: 'Build polished interfaces with hooks, state management, and advanced patterns.',
    instructor: 'Teacher Demo',
    level: 'Intermediate',
    duration: '6 weeks',
    category: 'Technology',
    materials: [
      { id: 'm-1', name: 'React Foundations.pdf', type: 'pdf', uploadedAt: '2026-06-10T10:00:00.000Z' },
      { id: 'm-2', name: 'State management walkthrough.mp4', type: 'video', uploadedAt: '2026-06-12T09:15:00.000Z' },
      { id: 'm-3', name: 'Deployment checklist.docx', type: 'assignment', uploadedAt: '2026-06-14T14:00:00.000Z' },
    ],
    quizzes: [
      { id: 'q-1', title: 'Hooks quiz', published: true, questions: 8, due: '2026-07-22' },
    ],
    exercises: [
      { id: 'e-1', title: 'Build a dashboard component', published: true, due: '2026-07-18' },
    ],
    students: [
      { id: 's-1', name: 'Amina Benali', email: 'amina@example.com', progress: 82, quizScore: 91, attendance: 'Present', completion: '82%' },
      { id: 's-2', name: 'Liam Ortiz', email: 'liam@example.com', progress: 64, quizScore: 73, attendance: 'Absent', completion: '64%' },
      { id: 's-3', name: 'Nora Chen', email: 'nora@example.com', progress: 90, quizScore: 95, attendance: 'Present', completion: '90%' },
    ],
    analytics: { completionRate: 82, attendanceRate: 91, averageScore: 88 },
  },
  {
    id: 'c-data',
    title: 'Data Science Essentials',
    description: 'Turn raw data into actionable insight through practical workflow exercises.',
    instructor: 'Teacher Demo',
    level: 'Beginner',
    duration: '4 weeks',
    category: 'Technology',
    materials: [
      { id: 'm-4', name: 'Intro notebook.ipynb', type: 'pdf', uploadedAt: '2026-06-11T08:00:00.000Z' },
    ],
    quizzes: [
      { id: 'q-2', title: 'Statistics review', published: true, questions: 10, due: '2026-07-25' },
    ],
    exercises: [
      { id: 'e-2', title: 'Clean and analyze a dataset', published: false, due: '2026-07-29' },
    ],
    students: [
      { id: 's-4', name: 'Sofia Alvarez', email: 'sofia@example.com', progress: 76, quizScore: 81, attendance: 'Present', completion: '76%' },
      { id: 's-5', name: 'Marcus Reed', email: 'marcus@example.com', progress: 55, quizScore: 67, attendance: 'Absent', completion: '55%' },
    ],
    analytics: { completionRate: 76, attendanceRate: 84, averageScore: 79 },
  },
  {
    id: 'c-ux',
    title: 'UX Writing for Product Teams',
    description: 'Design persuasive microcopy and customer-centered product flows.',
    instructor: 'Teacher Demo',
    level: 'Intermediate',
    duration: '3 weeks',
    category: 'Design',
    materials: [
      { id: 'm-5', name: 'UX writing rubric.pdf', type: 'pdf', uploadedAt: '2026-06-09T07:30:00.000Z' },
    ],
    quizzes: [
      { id: 'q-3', title: 'Voice and tone quiz', published: true, questions: 6, due: '2026-07-20' },
    ],
    exercises: [
      { id: 'e-3', title: 'Rewrite onboarding copy', published: true, due: '2026-07-17' },
    ],
    students: [
      { id: 's-6', name: 'Jules Simon', email: 'jules@example.com', progress: 88, quizScore: 93, attendance: 'Present', completion: '88%' },
    ],
    analytics: { completionRate: 88, attendanceRate: 94, averageScore: 93 },
  },
];

const sampleSessions = [
  {
    id: 's-1',
    courseId: 'c-react',
    title: 'Live: React Hooks Clinic',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2).toISOString(),
    description: 'Hands-on clinic with Q&A and debugging.',
    meetLink: 'https://meet.google.com/abc-defg-hij',
    accessCode: 'MTG123',
    instructor: 'Teacher Demo',
    enrolled: ['amina@example.com', 'nora@example.com'],
    status: 'Scheduled',
  },
  {
    id: 's-2',
    courseId: 'c-data',
    title: 'Live: Data Storytelling Lab',
    datetime: new Date(Date.now() + 1000 * 60 * 60 * 24 * 5).toISOString(),
    description: 'Workshop on dashboards and presentation techniques.',
    meetLink: 'https://meet.google.com/xyz-abcd-efg',
    accessCode: 'DSP456',
    instructor: 'Teacher Demo',
    enrolled: ['sofia@example.com'],
    status: 'Scheduled',
  },
];

const sampleInsights = [
  {
    id: 'ai-1',
    student: 'Liam Ortiz',
    studentEmail: 'liam@example.com',
    reason: 'Missed the React clinic and scored below target on the last quiz.',
    action: 'Send a reminder email with a recap and a practice mini challenge.',
    type: 'attendance',
  },
  {
    id: 'ai-2',
    student: 'Marcus Reed',
    studentEmail: 'marcus@example.com',
    reason: 'Low participation in the last two sessions.',
    action: 'Recommend an encouragement note and a short review module.',
    type: 'engagement',
  },
];

function makeInitial() {
  return { courses: sampleCourses, sessions: sampleSessions, aiInsights: sampleInsights };
}

function read() {
  try {
    const raw = localStorage.getItem(LS_KEY);
    return raw ? JSON.parse(raw) : makeInitial();
  } catch (e) {
    return makeInitial();
  }
}

function write(state) {
  localStorage.setItem(LS_KEY, JSON.stringify(state));
}

function normalizeCourse(course) {
  return {
    id: course.id,
    title: course.title || 'Untitled course',
    description: course.description || '',
    instructor: course.instructor || 'Teacher Demo',
    level: course.level || 'Beginner',
    duration: course.duration || '4 weeks',
    category: course.category || 'Technology',
    materials: Array.isArray(course.materials) ? course.materials : [],
    quizzes: Array.isArray(course.quizzes) ? course.quizzes : [],
    exercises: Array.isArray(course.exercises) ? course.exercises : [],
    students: Array.isArray(course.students) ? course.students : [],
    analytics: course.analytics || { completionRate: 0, attendanceRate: 0, averageScore: 0 },
  };
}

export function getCourses() {
  return read().courses.map(normalizeCourse);
}

export function createCourse(course) {
  const state = read();
  const id = `c-${Date.now()}`;
  const newCourse = normalizeCourse({ id, materials: [], quizzes: [], exercises: [], students: [], analytics: { completionRate: 0, attendanceRate: 0, averageScore: 0 }, ...course });
  state.courses.unshift(newCourse);
  write(state);
  return newCourse;
}

export function updateCourse(id, patch) {
  const state = read();
  state.courses = state.courses.map((c) => (c.id === id ? normalizeCourse({ ...c, ...patch }) : c));
  write(state);
}

export function deleteCourse(id) {
  const state = read();
  state.courses = state.courses.filter((c) => c.id !== id);
  state.sessions = state.sessions.filter((s) => s.courseId !== id);
  write(state);
}

export function uploadMaterial(courseId, fileMeta) {
  const state = read();
  const course = state.courses.find((c) => c.id === courseId);
  if (!course) return null;
  const item = { id: `m-${Date.now()}`, uploadedAt: new Date().toISOString(), ...fileMeta };
  course.materials.push(item);
  write(state);
  return item;
}

export function createQuiz(courseId, quiz) {
  const state = read();
  const course = state.courses.find((c) => c.id === courseId);
  if (!course) return null;
  const q = { id: `q-${Date.now()}`, questions: [], published: false, ...quiz };
  course.quizzes.push(q);
  write(state);
  return q;
}

export function createAssessment(courseId, kind, assessment) {
  const state = read();
  const course = state.courses.find((c) => c.id === courseId);
  if (!course) return null;
  const item = { id: `${kind === 'exercise' ? 'e' : 'q'}-${Date.now()}`, published: false, ...assessment };
  if (kind === 'exercise') {
    course.exercises.push(item);
  } else {
    course.quizzes.push(item);
  }
  write(state);
  return item;
}

export function updateAssessment(courseId, kind, assessmentId, patch) {
  const state = read();
  const course = state.courses.find((c) => c.id === courseId);
  if (!course) return null;
  const targetKey = kind === 'exercise' ? 'exercises' : 'quizzes';
  course[targetKey] = course[targetKey].map((item) => (item.id === assessmentId ? { ...item, ...patch } : item));
  write(state);
  return course[targetKey].find((item) => item.id === assessmentId) || null;
}

export function deleteAssessment(courseId, kind, assessmentId) {
  const state = read();
  const course = state.courses.find((c) => c.id === courseId);
  if (!course) return false;
  const targetKey = kind === 'exercise' ? 'exercises' : 'quizzes';
  course[targetKey] = course[targetKey].filter((item) => item.id !== assessmentId);
  write(state);
  return true;
}

function genMeetLink() {
  const parts = Array.from({ length: 3 }, () => Math.random().toString(36).slice(2, 5)).join('-');
  return `https://meet.google.com/${parts}`;
}

function genAccessCode() {
  return Math.random().toString(36).slice(2, 8).toUpperCase();
}

export function scheduleSession(session) {
  const state = read();
  const id = `s-${Date.now()}`;
  const meetLink = session.meetLink || genMeetLink();
  const accessCode = session.accessCode || genAccessCode();
  const newSession = { id, meetLink, accessCode, enrolled: [], status: 'Scheduled', ...session };
  state.sessions.unshift(newSession);
  write(state);
  return newSession;
}

export function updateSession(id, patch) {
  const state = read();
  state.sessions = state.sessions.map((item) => (item.id === id ? { ...item, ...patch } : item));
  write(state);
  return state.sessions.find((item) => item.id === id) || null;
}

export function deleteSession(id) {
  const state = read();
  state.sessions = state.sessions.filter((item) => item.id !== id);
  write(state);
  return true;
}

export function getSessions() {
  return read().sessions.slice().sort((a, b) => new Date(a.datetime) - new Date(b.datetime));
}

export function enrollInSession(sessionId, studentEmail) {
  const state = read();
  const s = state.sessions.find((x) => x.id === sessionId);
  if (!s) return false;
  if (!s.enrolled.includes(studentEmail)) s.enrolled.push(studentEmail);
  write(state);
  return true;
}

export function getSessionById(id) {
  return read().sessions.find((s) => s.id === id);
}

export function getTeacherStats() {
  const state = read();
  const totalStudents = state.courses.reduce((total, course) => total + (course.students?.length || 0), 0);
  const activeCourses = state.courses.length;
  const liveSessions = state.sessions.length;
  const quizzes = state.courses.reduce((total, course) => total + (course.quizzes?.length || 0), 0);
  return { totalStudents, activeCourses, liveSessions, quizzes };
}

export function getAiInsights() {
  return read().aiInsights;
}

export function getStudentRoster() {
  return read().courses.flatMap((course) =>
    (course.students || []).map((student) => ({ ...student, courseTitle: course.title, courseId: course.id }))
  );
}

const teacherStore = {
  getCourses,
  createCourse,
  updateCourse,
  deleteCourse,
  uploadMaterial,
  createQuiz,
  createAssessment,
  updateAssessment,
  deleteAssessment,
  scheduleSession,
  getSessions,
  enrollInSession,
  getSessionById,
  getTeacherStats,
  getAiInsights,
  getStudentRoster,
};

export { teacherStore as default };
