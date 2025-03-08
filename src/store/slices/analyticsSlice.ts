import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DataPoint {
  timestamp: string;
  value: number;
}

interface Metric {
  id: string;
  name: string;
  description: string;
  unit: string;
  data: DataPoint[];
  trend: number; // Percentage change
  lastUpdated: string;
}

interface ChartConfig {
  id: string;
  name: string;
  type: 'line' | 'bar' | 'pie' | 'scatter';
  metrics: string[];
  timeRange: 'day' | 'week' | 'month' | 'year' | 'custom';
  startDate?: string;
  endDate?: string;
  options: Record<string, any>;
}

interface AnalyticsState {
  metrics: Metric[];
  charts: ChartConfig[];
  loading: boolean;
  error: string | null;
  selectedTimeRange: 'day' | 'week' | 'month' | 'year' | 'custom';
  customDateRange: {
    start: string;
    end: string;
  };
  filters: {
    metrics: string[];
    charts: string[];
    categories: string[];
  };
}

const initialState: AnalyticsState = {
  metrics: [],
  charts: [],
  loading: false,
  error: null,
  selectedTimeRange: 'week',
  customDateRange: {
    start: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    end: new Date().toISOString(),
  },
  filters: {
    metrics: [],
    charts: [],
    categories: [],
  },
};

const analyticsSlice = createSlice({
  name: 'analytics',
  initialState,
  reducers: {
    setMetrics: (state, action: PayloadAction<Metric[]>) => {
      state.metrics = action.payload;
    },
    addMetric: (state, action: PayloadAction<Metric>) => {
      state.metrics.push(action.payload);
    },
    updateMetric: (state, action: PayloadAction<Partial<Metric> & { id: string }>) => {
      const index = state.metrics.findIndex((m) => m.id === action.payload.id);
      if (index !== -1) {
        state.metrics[index] = { ...state.metrics[index], ...action.payload };
      }
    },
    deleteMetric: (state, action: PayloadAction<string>) => {
      state.metrics = state.metrics.filter((m) => m.id !== action.payload);
    },
    setCharts: (state, action: PayloadAction<ChartConfig[]>) => {
      state.charts = action.payload;
    },
    addChart: (state, action: PayloadAction<ChartConfig>) => {
      state.charts.push(action.payload);
    },
    updateChart: (state, action: PayloadAction<Partial<ChartConfig> & { id: string }>) => {
      const index = state.charts.findIndex((c) => c.id === action.payload.id);
      if (index !== -1) {
        state.charts[index] = { ...state.charts[index], ...action.payload };
      }
    },
    deleteChart: (state, action: PayloadAction<string>) => {
      state.charts = state.charts.filter((c) => c.id !== action.payload);
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setTimeRange: (state, action: PayloadAction<AnalyticsState['selectedTimeRange']>) => {
      state.selectedTimeRange = action.payload;
    },
    setCustomDateRange: (state, action: PayloadAction<{ start: string; end: string }>) => {
      state.customDateRange = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<AnalyticsState['filters']>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateMetricData: (
      state,
      action: PayloadAction<{ id: string; data: DataPoint[] }>
    ) => {
      const metric = state.metrics.find((m) => m.id === action.payload.id);
      if (metric) {
        metric.data = action.payload.data;
        metric.lastUpdated = new Date().toISOString();
      }
    },
    updateMetricTrend: (
      state,
      action: PayloadAction<{ id: string; trend: number }>
    ) => {
      const metric = state.metrics.find((m) => m.id === action.payload.id);
      if (metric) {
        metric.trend = action.payload.trend;
      }
    },
    clearAnalytics: (state) => {
      state.metrics = [];
      state.charts = [];
      state.error = null;
    },
  },
});

export const {
  setMetrics,
  addMetric,
  updateMetric,
  deleteMetric,
  setCharts,
  addChart,
  updateChart,
  deleteChart,
  setLoading,
  setError,
  setTimeRange,
  setCustomDateRange,
  setFilters,
  resetFilters,
  updateMetricData,
  updateMetricTrend,
  clearAnalytics,
} = analyticsSlice.actions;

export default analyticsSlice.reducer; 