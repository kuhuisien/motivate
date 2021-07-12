export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

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

// ==========================
// SystemSetting
// ==========================
export const GET_SYSTEM_SETTINGS_URL = `${API_BASE_URL}/systemSettings`;
