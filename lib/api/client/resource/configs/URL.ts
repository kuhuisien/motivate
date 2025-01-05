export const PROJECT_BASE_URL = process.env.NEXTAUTH_URL
  ? process.env.NEXT_PUBLIC_VERCEL_URL
  : process.env.NEXT_PUBLIC_URL;

export const API_BASE_URL = `${PROJECT_BASE_URL}/api`;

// ==========================
// Authentication
// ==========================
export const SIGN_UP_URL = `${API_BASE_URL}/auth/signup`;
export const GOOGLE_URL = `${API_BASE_URL}/auth/google`;

// ==========================
// Habit
// ==========================
export const ADD_HABIT_URL = `${API_BASE_URL}/habits/add`;
export const GET_HABITS_URL = `${API_BASE_URL}/habits`;
export const EDIT_HABIT_URL = `${API_BASE_URL}/habits`;
export const DELETE_HABIT_URL = `${API_BASE_URL}/habits`;

export const GET_TAGS_UEL = `${API_BASE_URL}/tags`;
// ==========================
// SystemSetting
// ==========================
export const GET_SYSTEM_SETTINGS_URL = `${API_BASE_URL}/systemSettings`;
