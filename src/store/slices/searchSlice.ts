import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface SearchResult {
  id: string;
  type: 'workflow' | 'agent' | 'personality' | 'settings';
  title: string;
  description: string;
  path: string;
}

interface SearchState {
  query: string;
  results: SearchResult[];
  history: string[];
  loading: boolean;
  error: string | null;
  filters: {
    type: ('workflow' | 'agent' | 'personality' | 'settings')[];
    dateRange: 'all' | 'today' | 'week' | 'month';
    status: 'all' | 'active' | 'inactive';
  };
}

const initialState: SearchState = {
  query: '',
  results: [],
  history: [],
  loading: false,
  error: null,
  filters: {
    type: ['workflow', 'agent', 'personality', 'settings'],
    dateRange: 'all',
    status: 'all',
  },
};

const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    setQuery: (state, action: PayloadAction<string>) => {
      state.query = action.payload;
    },
    setResults: (state, action: PayloadAction<SearchResult[]>) => {
      state.results = action.payload;
    },
    addToHistory: (state, action: PayloadAction<string>) => {
      const query = action.payload.trim();
      if (query && !state.history.includes(query)) {
        state.history = [query, ...state.history].slice(0, 10);
      }
    },
    removeFromHistory: (state, action: PayloadAction<string>) => {
      state.history = state.history.filter((item) => item !== action.payload);
    },
    clearHistory: (state) => {
      state.history = [];
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (
      state,
      action: PayloadAction<Partial<SearchState['filters']>>
    ) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    clearSearch: (state) => {
      state.query = '';
      state.results = [];
      state.error = null;
    },
  },
});

export const {
  setQuery,
  setResults,
  addToHistory,
  removeFromHistory,
  clearHistory,
  setLoading,
  setError,
  setFilters,
  resetFilters,
  clearSearch,
} = searchSlice.actions;

export default searchSlice.reducer; 