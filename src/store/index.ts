import { configureStore } from '@reduxjs/toolkit';
import profileReducer from './slices/profileSlice';
import workflowsReducer from './slices/workflowsSlice';
import agentsReducer from './slices/agentsSlice';
import personalitiesReducer from './slices/personalitiesSlice';
import analyticsReducer from './slices/analyticsSlice';
import notificationsReducer from './slices/notificationsSlice';

export const store = configureStore({
  reducer: {
    profile: profileReducer,
    workflows: workflowsReducer,
    agents: agentsReducer,
    personalities: personalitiesReducer,
    analytics: analyticsReducer,
    notifications: notificationsReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: ['notifications/addNotification'],
        // Ignore these field paths in all actions
        ignoredActionPaths: ['payload.action.onClick'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 