import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TrainingData {
  id: string;
  type: 'text' | 'json' | 'csv';
  source: string;
  size: number;
  lastUpdated: string;
}

interface TrainingConfig {
  model: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationSplit: number;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  personalityId: string;
  status: 'ready' | 'training' | 'error';
  trainingData: TrainingData[];
  config: TrainingConfig;
  created_at: string;
  updated_at: string;
  last_trained?: string;
  stats: {
    tasks: number;
    success: number;
    failure: number;
    avgResponseTime: number;
    trainingProgress: number;
  };
}

interface AgentsState {
  agents: Agent[];
  loading: boolean;
  error: string | null;
  selectedAgent: Agent | null;
  filters: {
    status: 'all' | 'ready' | 'training' | 'error';
    personality: string[];
    dateRange: 'all' | 'today' | 'week' | 'month';
  };
}

const initialState: AgentsState = {
  agents: [],
  loading: false,
  error: null,
  selectedAgent: null,
  filters: {
    status: 'all',
    personality: [],
    dateRange: 'all',
  },
};

const agentsSlice = createSlice({
  name: 'agents',
  initialState,
  reducers: {
    setAgents: (state, action: PayloadAction<Agent[]>) => {
      state.agents = action.payload;
    },
    addAgent: (state, action: PayloadAction<Agent>) => {
      state.agents.push(action.payload);
    },
    updateAgent: (state, action: PayloadAction<Partial<Agent> & { id: string }>) => {
      const index = state.agents.findIndex((a) => a.id === action.payload.id);
      if (index !== -1) {
        state.agents[index] = { ...state.agents[index], ...action.payload };
      }
    },
    deleteAgent: (state, action: PayloadAction<string>) => {
      state.agents = state.agents.filter((a) => a.id !== action.payload);
    },
    setSelectedAgent: (state, action: PayloadAction<Agent | null>) => {
      state.selectedAgent = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<AgentsState['filters']>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    updateAgentStats: (
      state,
      action: PayloadAction<{ id: string; stats: Partial<Agent['stats']> }>
    ) => {
      const agent = state.agents.find((a) => a.id === action.payload.id);
      if (agent) {
        agent.stats = { ...agent.stats, ...action.payload.stats };
      }
    },
    startTraining: (state, action: PayloadAction<string>) => {
      const agent = state.agents.find((a) => a.id === action.payload);
      if (agent) {
        agent.status = 'training';
        agent.stats.trainingProgress = 0;
      }
    },
    stopTraining: (state, action: PayloadAction<string>) => {
      const agent = state.agents.find((a) => a.id === action.payload);
      if (agent) {
        agent.status = 'ready';
        agent.last_trained = new Date().toISOString();
      }
    },
  },
});

export const {
  setAgents,
  addAgent,
  updateAgent,
  deleteAgent,
  setSelectedAgent,
  setLoading,
  setError,
  updateTrainingProgress,
  updateAgentStatus,
  updateAgentMetrics,
} = agentsSlice.actions;

export default agentsSlice.reducer; 