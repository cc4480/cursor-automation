import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface WorkflowAction {
  id: string;
  type: string;
  config: Record<string, any>;
  order: number;
}

interface WorkflowCondition {
  id: string;
  type: string;
  config: Record<string, any>;
  order: number;
}

interface Workflow {
  id: string;
  name: string;
  description: string;
  enabled: boolean;
  trigger: {
    type: 'schedule' | 'event' | 'manual';
    config: Record<string, any>;
  };
  actions: WorkflowAction[];
  conditions: WorkflowCondition[];
  created_at: string;
  updated_at: string;
  last_run?: string;
  next_run?: string;
  stats: {
    runs: number;
    success: number;
    failure: number;
    avgDuration: number;
  };
}

interface WorkflowsState {
  workflows: Workflow[];
  loading: boolean;
  error: string | null;
  selectedWorkflow: Workflow | null;
  filters: {
    status: 'all' | 'enabled' | 'disabled';
    type: string[];
    dateRange: 'all' | 'today' | 'week' | 'month';
  };
}

const initialState: WorkflowsState = {
  workflows: [],
  loading: false,
  error: null,
  selectedWorkflow: null,
  filters: {
    status: 'all',
    type: [],
    dateRange: 'all',
  },
};

const workflowsSlice = createSlice({
  name: 'workflows',
  initialState,
  reducers: {
    setWorkflows: (state, action: PayloadAction<Workflow[]>) => {
      state.workflows = action.payload;
    },
    addWorkflow: (state, action: PayloadAction<Workflow>) => {
      state.workflows.push(action.payload);
    },
    updateWorkflow: (state, action: PayloadAction<Partial<Workflow> & { id: string }>) => {
      const index = state.workflows.findIndex((w) => w.id === action.payload.id);
      if (index !== -1) {
        state.workflows[index] = { ...state.workflows[index], ...action.payload };
      }
    },
    deleteWorkflow: (state, action: PayloadAction<string>) => {
      state.workflows = state.workflows.filter((w) => w.id !== action.payload);
    },
    setSelectedWorkflow: (state, action: PayloadAction<Workflow | null>) => {
      state.selectedWorkflow = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<WorkflowsState['filters']>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleWorkflow: (state, action: PayloadAction<string>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload);
      if (workflow) {
        workflow.enabled = !workflow.enabled;
      }
    },
    addAction: (state, action: PayloadAction<{ workflowId: string; action: WorkflowAction }>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        workflow.actions.push(action.payload.action);
      }
    },
    updateAction: (
      state,
      action: PayloadAction<{ workflowId: string; actionId: string; action: Partial<WorkflowAction> }>
    ) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        const actionIndex = workflow.actions.findIndex((a) => a.id === action.payload.actionId);
        if (actionIndex !== -1) {
          workflow.actions[actionIndex] = {
            ...workflow.actions[actionIndex],
            ...action.payload.action,
          };
        }
      }
    },
    deleteAction: (state, action: PayloadAction<{ workflowId: string; actionId: string }>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        workflow.actions = workflow.actions.filter((a) => a.id !== action.payload.actionId);
      }
    },
    addCondition: (state, action: PayloadAction<{ workflowId: string; condition: WorkflowCondition }>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        workflow.conditions.push(action.payload.condition);
      }
    },
    updateCondition: (
      state,
      action: PayloadAction<{ workflowId: string; conditionId: string; condition: Partial<WorkflowCondition> }>
    ) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        const conditionIndex = workflow.conditions.findIndex((c) => c.id === action.payload.conditionId);
        if (conditionIndex !== -1) {
          workflow.conditions[conditionIndex] = {
            ...workflow.conditions[conditionIndex],
            ...action.payload.condition,
          };
        }
      }
    },
    deleteCondition: (state, action: PayloadAction<{ workflowId: string; conditionId: string }>) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.workflowId);
      if (workflow) {
        workflow.conditions = workflow.conditions.filter((c) => c.id !== action.payload.conditionId);
      }
    },
    updateWorkflowStats: (
      state,
      action: PayloadAction<{ id: string; stats: Partial<Workflow['stats']> }>
    ) => {
      const workflow = state.workflows.find((w) => w.id === action.payload.id);
      if (workflow) {
        workflow.stats = { ...workflow.stats, ...action.payload.stats };
      }
    },
    clearWorkflows: (state) => {
      state.workflows = [];
      state.selectedWorkflow = null;
      state.error = null;
    },
  },
});

export const {
  setWorkflows,
  addWorkflow,
  updateWorkflow,
  deleteWorkflow,
  setSelectedWorkflow,
  setLoading,
  setError,
  setFilters,
  resetFilters,
  toggleWorkflow,
  addAction,
  updateAction,
  deleteAction,
  addCondition,
  updateCondition,
  deleteCondition,
  updateWorkflowStats,
  clearWorkflows,
} = workflowsSlice.actions;

export default workflowsSlice.reducer; 