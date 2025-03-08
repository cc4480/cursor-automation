// Common types
export type ThemeMode = 'light' | 'dark' | 'system';
export type Language = 'en' | 'es' | 'fr' | 'de';
export type NotificationType = 'success' | 'error' | 'warning' | 'info';
export type TimeRange = 'day' | 'week' | 'month' | 'year' | 'custom';
export type ChartType = 'line' | 'bar' | 'pie' | 'scatter';

// User types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'user' | 'guest';
  status: 'active' | 'inactive' | 'suspended';
  created_at: string;
  updated_at: string;
  last_login?: string;
}

export interface UserPreferences {
  theme: ThemeMode;
  language: Language;
  timezone: string;
  dateFormat: string;
  notifications: {
    email: boolean;
    push: boolean;
    inApp: boolean;
  };
}

export interface SecuritySettings {
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

export interface BackupSettings {
  autoBackup: boolean;
  backupFrequency: 'daily' | 'weekly' | 'monthly';
  lastBackup: string;
  backupLocation: string;
  retentionPeriod: number;
}

export interface UserProfile extends User {
  preferences: UserPreferences;
  security: SecuritySettings;
  backup: BackupSettings;
}

// Workflow types
export interface WorkflowAction {
  id: string;
  type: string;
  config: Record<string, any>;
  order: number;
}

export interface WorkflowCondition {
  id: string;
  type: string;
  config: Record<string, any>;
  order: number;
}

export interface Workflow {
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

// Agent types
export interface TrainingData {
  id: string;
  type: 'text' | 'json' | 'csv';
  source: string;
  size: number;
  lastUpdated: string;
}

export interface TrainingConfig {
  model: string;
  epochs: number;
  batchSize: number;
  learningRate: number;
  validationSplit: number;
}

export interface Agent {
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

// Personality types
export interface Trait {
  name: string;
  value: number;
  description: string;
}

export interface StyleGuide {
  tone: string;
  formality: string;
  personality: string;
  examples: string[];
}

export interface ResponseTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  description: string;
}

export interface KnowledgeBase {
  id: string;
  name: string;
  content: string;
  source: string;
  lastUpdated: string;
}

export interface Personality {
  id: string;
  name: string;
  description: string;
  traits: Trait[];
  styleGuide: StyleGuide;
  responseTemplates: ResponseTemplate[];
  knowledgeBase: KnowledgeBase[];
  created_at: string;
  updated_at: string;
  stats: {
    usageCount: number;
    avgRating: number;
    lastUsed: string;
  };
}

// Analytics types
export interface DataPoint {
  timestamp: string;
  value: number;
}

export interface Metric {
  id: string;
  name: string;
  description: string;
  unit: string;
  data: DataPoint[];
  trend: number;
  lastUpdated: string;
}

export interface ChartConfig {
  id: string;
  name: string;
  type: ChartType;
  metrics: string[];
  timeRange: TimeRange;
  startDate?: string;
  endDate?: string;
  options: Record<string, any>;
}

// Notification types
export interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
  metadata?: Record<string, any>;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  message?: string;
  status: number;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Form types
export interface LoginForm {
  email: string;
  password: string;
}

export interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface ForgotPasswordForm {
  email: string;
}

export interface ResetPasswordForm {
  token: string;
  password: string;
  confirmPassword: string;
}

// Component props types
export interface LayoutProps {
  children: React.ReactNode;
}

export interface PageProps {
  title: string;
  description?: string;
}

export interface CardProps {
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export interface DialogProps {
  open: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  actions?: React.ReactNode;
}

export interface FormFieldProps {
  name: string;
  label: string;
  type?: string;
  required?: boolean;
  disabled?: boolean;
  helperText?: string;
  error?: boolean;
}

// Redux state types
export interface RootState {
  profile: {
    profile: UserProfile | null;
    loading: boolean;
    error: string | null;
    isAuthenticated: boolean;
  };
  workflows: {
    workflows: Workflow[];
    loading: boolean;
    error: string | null;
    selectedWorkflow: Workflow | null;
    filters: {
      status: 'all' | 'enabled' | 'disabled';
      type: string[];
      dateRange: TimeRange;
    };
  };
  agents: {
    agents: Agent[];
    loading: boolean;
    error: string | null;
    selectedAgent: Agent | null;
    filters: {
      status: 'all' | 'ready' | 'training' | 'error';
      personality: string[];
      dateRange: TimeRange;
    };
  };
  personalities: {
    personalities: Personality[];
    loading: boolean;
    error: string | null;
    selectedPersonality: Personality | null;
    filters: {
      search: string;
      sortBy: 'name' | 'usage' | 'rating' | 'date';
      sortOrder: 'asc' | 'desc';
    };
  };
  analytics: {
    metrics: Metric[];
    charts: ChartConfig[];
    loading: boolean;
    error: string | null;
    selectedTimeRange: TimeRange;
    customDateRange: {
      start: string;
      end: string;
    };
    filters: {
      metrics: string[];
      charts: string[];
      categories: string[];
    };
  };
  notifications: {
    notifications: Notification[];
    unreadCount: number;
    filters: {
      types: NotificationType[];
      read: boolean | null;
      search: string;
    };
    settings: {
      email: boolean;
      push: boolean;
      inApp: boolean;
      sound: boolean;
      desktop: boolean;
    };
  };
} 