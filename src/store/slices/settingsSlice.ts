import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AppearanceSettings {
  theme: 'light' | 'dark' | 'system';
  language: string;
}

interface NotificationSettings {
  email: boolean;
  push: boolean;
  inApp: boolean;
}

interface PrivacySettings {
  dataCollection: boolean;
  analytics: boolean;
  sharing: boolean;
}

interface PerformanceSettings {
  batchSize: number;
  maxWorkers: number;
  cacheSize: number;
}

interface ApiSettings {
  endpoint: string;
  apiKey: string;
  timeout: number;
}

interface SettingsState {
  appearance: AppearanceSettings;
  notifications: NotificationSettings;
  privacy: PrivacySettings;
  performance: PerformanceSettings;
  api: ApiSettings;
}

const initialState: SettingsState = {
  appearance: {
    theme: 'system',
    language: 'en',
  },
  notifications: {
    email: true,
    push: true,
    inApp: true,
  },
  privacy: {
    dataCollection: true,
    analytics: true,
    sharing: false,
  },
  performance: {
    batchSize: 100,
    maxWorkers: 4,
    cacheSize: 1000,
  },
  api: {
    endpoint: 'https://api.example.com',
    apiKey: '',
    timeout: 5000,
  },
};

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    updateAppearance: (state, action: PayloadAction<AppearanceSettings>) => {
      state.appearance = action.payload;
    },
    updateNotifications: (state, action: PayloadAction<NotificationSettings>) => {
      state.notifications = action.payload;
    },
    updatePrivacy: (state, action: PayloadAction<PrivacySettings>) => {
      state.privacy = action.payload;
    },
    updatePerformance: (state, action: PayloadAction<PerformanceSettings>) => {
      state.performance = action.payload;
    },
    updateApi: (state, action: PayloadAction<ApiSettings>) => {
      state.api = action.payload;
    },
    resetSettings: (state) => {
      Object.assign(state, initialState);
    },
  },
});

export const {
  updateAppearance,
  updateNotifications,
  updatePrivacy,
  updatePerformance,
  updateApi,
  resetSettings,
} = settingsSlice.actions;

export default settingsSlice.reducer; 