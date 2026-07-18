const otpMap = new Map();

export function generateOTP(email) {
  const code = String(Math.floor(100000 + Math.random() * 900000));
  otpMap.set(email, { code, created: Date.now() });
  return code;
}

export function verifyOTP(email, code) {
  const entry = otpMap.get(email);
  if (!entry) return false;
  const isValid = entry.code === String(code);
  if (isValid) otpMap.delete(email);
  return isValid;
}

export function peekOTP(email) {
  // For demo purposes only: return the code if exists
  const entry = otpMap.get(email);
  return entry ? entry.code : null;
}

export default { generateOTP, verifyOTP, peekOTP };
