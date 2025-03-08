import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  language: string;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

interface SecuritySettings {
  twoFactorEnabled: boolean;
  lastPasswordChange: string;
  loginHistory: {
    timestamp: string;
    ip: string;
    device: string;
  }[];
  activeSessions: {
    id: string;
    device: string;
    lastActive: string;
  }[];
}

interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  lastBackup: string;
  backupLocation: string;
  retentionPeriod: number; // in days
}

interface UserProfile {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'suspended';
  preferences: UserPreferences;
  security: SecuritySettings;
  backup: BackupSettings;
  created_at: string;
  updated_at: string;
  last_login?: string;
}

interface ProfileState {
  profile: UserProfile | null;
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
}

const initialState: ProfileState = {
  profile: null,
  loading: false,
  error: null,
  isAuthenticated: false,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
      state.isAuthenticated = true;
    },
    updateProfile: (state, action: PayloadAction<Partial<UserProfile>>) => {
      if (state.profile) {
        state.profile = { ...state.profile, ...action.payload };
      }
    },
    updatePreferences: (state, action: PayloadAction<Partial<UserPreferences>>) => {
      if (state.profile) {
        state.profile.preferences = {
          ...state.profile.preferences,
          ...action.payload,
        };
      }
    },
    updateSecuritySettings: (state, action: PayloadAction<Partial<SecuritySettings>>) => {
      if (state.profile) {
        state.profile.security = {
          ...state.profile.security,
          ...action.payload,
        };
      }
    },
    updateBackupSettings: (state, action: PayloadAction<Partial<BackupSettings>>) => {
      if (state.profile) {
        state.profile.backup = {
          ...state.profile.backup,
          ...action.payload,
        };
      }
    },
    addLoginHistory: (
      state,
      action: PayloadAction<{ timestamp: string; ip: string; device: string }>
    ) => {
      if (state.profile) {
        state.profile.security.loginHistory.unshift(action.payload);
        // Keep only last 10 login history entries
        if (state.profile.security.loginHistory.length > 10) {
          state.profile.security.loginHistory.pop();
        }
      }
    },
    addActiveSession: (
      state,
      action: PayloadAction<{ id: string; device: string; lastActive: string }>
    ) => {
      if (state.profile) {
        state.profile.security.activeSessions.push(action.payload);
      }
    },
    removeActiveSession: (state, action: PayloadAction<string>) => {
      if (state.profile) {
        state.profile.security.activeSessions = state.profile.security.activeSessions.filter(
          (session) => session.id !== action.payload
        );
      }
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    logout: (state) => {
      state.profile = null;
      state.isAuthenticated = false;
      state.error = null;
    },
  },
});

export const {
  setProfile,
  updateProfile,
  updatePreferences,
  updateSecuritySettings,
  updateBackupSettings,
  addLoginHistory,
  addActiveSession,
  removeActiveSession,
  setLoading,
  setError,
  logout,
} = profileSlice.actions;

export default profileSlice.reducer; 