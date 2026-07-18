const STORAGE_KEY = 'growup-student-purchases';

function read() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
  } catch (e) {
    return {};
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

export function getPurchasedCourses(email) {
  const data = read();
  return data[email] || [];
}

export function purchaseCourse(email, courseId) {
  const data = read();
  const purchases = new Set(data[email] || []);
  purchases.add(courseId);
  data[email] = Array.from(purchases);
  write(data);
  return data[email];
}

export function isCoursePurchased(email, courseId) {
  const purchases = getPurchasedCourses(email);
  return purchases.includes(courseId);
}

export default {
  getPurchasedCourses,
  purchaseCourse,
  isCoursePurchased,
};
