import { getCourses, getSessions } from './teacherStore';

describe('teacherStore seed data', () => {
  beforeEach(() => {
    localStorage.removeItem('growup-teacher-store-v1');
  });

  it('provides realistic instructor courses, materials, quizzes, and live sessions', () => {
    const courses = getCourses();
    const sessions = getSessions();

    expect(courses.length).toBeGreaterThan(1);

    const course = courses.find((item) => item.title.includes('React'));
    expect(course).toBeDefined();
    expect(course.materials.length).toBeGreaterThan(0);
    expect(course.quizzes.length).toBeGreaterThan(0);

    const session = sessions.find((item) => item.accessCode);
    expect(session).toBeDefined();
    expect(session.meetLink).toContain('https://meet.google.com/');
    expect(Array.isArray(session.enrolled)).toBe(true);
  });
});
