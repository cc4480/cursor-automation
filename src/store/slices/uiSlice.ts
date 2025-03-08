import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  timestamp: number;
}

interface UiState {
  sidebarOpen: boolean;
  notifications: Notification[];
  loading: boolean;
  error: string | null;
  searchQuery: string;
  searchHistory: string[];
  selectedTab: string;
  dialogOpen: boolean;
  dialogType: string | null;
  snackbar: {
    open: boolean;
    message: string;
    type: 'success' | 'error' | 'warning' | 'info';
  };
}

const initialState: UiState = {
  sidebarOpen: true,
  notifications: [],
  loading: false,
  error: null,
  searchQuery: '',
  searchHistory: [],
  selectedTab: 'dashboard',
  dialogOpen: false,
  dialogType: null,
  snackbar: {
    open: false,
    message: '',
    type: 'info',
  },
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    addNotification: (state, action: PayloadAction<Omit<Notification, 'id' | 'timestamp'>>) => {
      const notification: Notification = {
        ...action.payload,
        id: Date.now().toString(),
        timestamp: Date.now(),
      };
      state.notifications.push(notification);
    },
    removeNotification: (state, action: PayloadAction<string>) => {
      state.notifications = state.notifications.filter((n) => n.id !== action.payload);
    },
    clearNotifications: (state) => {
      state.notifications = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    addToSearchHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.searchHistory.includes(query)) {
        state.searchHistory = [query, ...state.searchHistory].slice(0, 10);
      }
    },
    clearSearchHistory: (state) => {
      state.searchHistory = [];
    },
    setSelectedTab: (state, action: PayloadAction<string>) => {
      state.selectedTab = action.payload;
    },
    openDialog: (state, action: PayloadAction<string>) => {
      state.dialogOpen = true;
      state.dialogType = action.payload;
    },
    closeDialog: (state) => {
      state.dialogOpen = false;
      state.dialogType = null;
    },
    showSnackbar: (
      state,
      action: PayloadAction<{ message: string; type: 'success' | 'error' | 'warning' | 'info' }>
    ) => {
      state.snackbar = {
        open: true,
        message: action.payload.message,
        type: action.payload.type,
      };
    },
    hideSnackbar: (state) => {
      state.snackbar.open = false;
    },
  },
});

export const {
  toggleSidebar,
  addNotification,
  removeNotification,
  clearNotifications,
  setLoading,
  setError,
  setSearchQuery,
  addToSearchHistory,
  clearSearchHistory,
  setSelectedTab,
  openDialog,
  closeDialog,
  showSnackbar,
  hideSnackbar,
} = uiSlice.actions;

export default uiSlice.reducer; 