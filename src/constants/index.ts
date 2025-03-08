// Application constants
export const APP_NAME = 'AI Agent Platform';
export const APP_VERSION = '1.0.0';
export const APP_DESCRIPTION = 'A platform for managing AI agents and workflows';

// API constants
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';
export const API_TIMEOUT = 30000; // 30 seconds

// Authentication constants
export const AUTH_TOKEN_KEY = 'token';
export const AUTH_REFRESH_TOKEN_KEY = 'refreshToken';
export const AUTH_TOKEN_EXPIRY = 3600; // 1 hour
export const AUTH_REFRESH_TOKEN_EXPIRY = 604800; // 7 days

// Route constants
export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  WORKFLOWS: '/workflows',
  WORKFLOW_BUILDER: '/workflows/builder',
  WORKFLOW_EDIT: '/workflows/:id/edit',
  AGENTS: '/agents',
  AGENT_TRAINING: '/agents/training',
  AGENT_EDIT: '/agents/:id/edit',
  PERSONALITIES: '/personalities',
  PERSONALITY_EDIT: '/personalities/:id/edit',
  ANALYTICS: '/analytics',
  SETTINGS: '/settings',
  PROFILE: '/profile',
  DOCUMENTATION: '/documentation',
  LOGIN: '/login',
  REGISTER: '/register',
  FORGOT_PASSWORD: '/forgot-password',
  RESET_PASSWORD: '/reset-password',
} as const;

// Theme constants
export const THEME = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
} as const;

// Language constants
export const LANGUAGES = {
  EN: 'en',
  ES: 'es',
  FR: 'fr',
  DE: 'de',
} as const;

// Notification types
export const NOTIFICATION_TYPES = {
  SUCCESS: 'success',
  ERROR: 'error',
  WARNING: 'warning',
  INFO: 'info',
} as const;

// Workflow trigger types
export const WORKFLOW_TRIGGER_TYPES = {
  SCHEDULE: 'schedule',
  EVENT: 'event',
  MANUAL: 'manual',
} as const;

// Agent status types
export const AGENT_STATUS = {
  READY: 'ready',
  TRAINING: 'training',
  ERROR: 'error',
} as const;

// Chart types
export const CHART_TYPES = {
  LINE: 'line',
  BAR: 'bar',
  PIE: 'pie',
  SCATTER: 'scatter',
} as const;

// Time range options
export const TIME_RANGES = {
  DAY: 'day',
  WEEK: 'week',
  MONTH: 'month',
  YEAR: 'year',
  CUSTOM: 'custom',
} as const;

// File upload constants
export const FILE_UPLOAD = {
  MAX_SIZE: 10 * 1024 * 1024, // 10MB
  ALLOWED_TYPES: [
    'text/plain',
    'text/csv',
    'application/json',
    'application/xml',
    'application/pdf',
    'image/jpeg',
    'image/png',
    'image/gif',
  ],
} as const;

// Pagination constants
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50, 100],
} as const;

// Form validation constants
export const VALIDATION = {
  EMAIL_REGEX: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  PASSWORD_REGEX: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/,
  URL_REGEX: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
  MIN_PASSWORD_LENGTH: 8,
  MAX_PASSWORD_LENGTH: 32,
} as const;

// Error messages
export const ERROR_MESSAGES = {
  REQUIRED_FIELD: 'This field is required',
  INVALID_EMAIL: 'Please enter a valid email address',
  INVALID_PASSWORD: 'Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number',
  INVALID_URL: 'Please enter a valid URL',
  NETWORK_ERROR: 'Network error. Please check your internet connection',
  SERVER_ERROR: 'Server error. Please try again later',
  UNAUTHORIZED: 'You are not authorized to perform this action',
  NOT_FOUND: 'The requested resource was not found',
  VALIDATION_ERROR: 'Please check your input and try again',
} as const;

// Success messages
export const SUCCESS_MESSAGES = {
  LOGIN: 'Successfully logged in',
  LOGOUT: 'Successfully logged out',
  REGISTER: 'Account created successfully',
  PROFILE_UPDATE: 'Profile updated successfully',
  PASSWORD_RESET: 'Password reset successfully',
  WORKFLOW_CREATE: 'Workflow created successfully',
  WORKFLOW_UPDATE: 'Workflow updated successfully',
  WORKFLOW_DELETE: 'Workflow deleted successfully',
  AGENT_CREATE: 'Agent created successfully',
  AGENT_UPDATE: 'Agent updated successfully',
  AGENT_DELETE: 'Agent deleted successfully',
  PERSONALITY_CREATE: 'Personality created successfully',
  PERSONALITY_UPDATE: 'Personality updated successfully',
  PERSONALITY_DELETE: 'Personality deleted successfully',
} as const;

// Local storage keys
export const STORAGE_KEYS = {
  THEME: 'theme',
  LANGUAGE: 'language',
  USER_PREFERENCES: 'userPreferences',
  RECENT_WORKFLOWS: 'recentWorkflows',
  RECENT_AGENTS: 'recentAgents',
} as const;

// API endpoints
export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    FORGOT_PASSWORD: '/auth/forgot-password',
    RESET_PASSWORD: '/auth/reset-password',
  },
  PROFILE: {
    GET: '/profile',
    UPDATE: '/profile',
    PREFERENCES: '/profile/preferences',
    SECURITY: '/profile/security',
    BACKUP: '/profile/backup',
  },
  WORKFLOWS: {
    LIST: '/workflows',
    CREATE: '/workflows',
    GET: (id: string) => `/workflows/${id}`,
    UPDATE: (id: string) => `/workflows/${id}`,
    DELETE: (id: string) => `/workflows/${id}`,
    TOGGLE: (id: string) => `/workflows/${id}/toggle`,
  },
  AGENTS: {
    LIST: '/agents',
    CREATE: '/agents',
    GET: (id: string) => `/agents/${id}`,
    UPDATE: (id: string) => `/agents/${id}`,
    DELETE: (id: string) => `/agents/${id}`,
    TRAIN: (id: string) => `/agents/${id}/train`,
    STOP_TRAINING: (id: string) => `/agents/${id}/stop-training`,
  },
  PERSONALITIES: {
    LIST: '/personalities',
    CREATE: '/personalities',
    GET: (id: string) => `/personalities/${id}`,
    UPDATE: (id: string) => `/personalities/${id}`,
    DELETE: (id: string) => `/personalities/${id}`,
  },
  ANALYTICS: {
    METRICS: '/analytics/metrics',
    CHARTS: '/analytics/charts',
    CREATE_CHART: '/analytics/charts',
    UPDATE_CHART: (id: string) => `/analytics/charts/${id}`,
    DELETE_CHART: (id: string) => `/analytics/charts/${id}`,
  },
} as const; 