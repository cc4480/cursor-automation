import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { store } from '../store';
import { logout } from '../store/slices/profileSlice';
import { addNotification } from '../store/slices/notificationsSlice';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

class ApiService {
  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  private setupInterceptors() {
    // Request interceptor
    this.api.interceptors.request.use(
      (config) => {
        const token = localStorage.getItem('token');
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response) {
          switch (error.response.status) {
            case 401:
              store.dispatch(logout());
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Session Expired',
                  message: 'Your session has expired. Please log in again.',
                })
              );
              break;
            case 403:
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Access Denied',
                  message: 'You do not have permission to perform this action.',
                })
              );
              break;
            case 404:
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Not Found',
                  message: 'The requested resource was not found.',
                })
              );
              break;
            case 500:
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Server Error',
                  message: 'An unexpected error occurred. Please try again later.',
                })
              );
              break;
            default:
              store.dispatch(
                addNotification({
                  type: 'error',
                  title: 'Error',
                  message: error.response.data.message || 'An error occurred.',
                })
              );
          }
        } else if (error.request) {
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Network Error',
              message: 'Unable to connect to the server. Please check your internet connection.',
            })
          );
        } else {
          store.dispatch(
            addNotification({
              type: 'error',
              title: 'Error',
              message: 'An unexpected error occurred.',
            })
          );
        }
        return Promise.reject(error);
      }
    );
  }

  // Generic request methods
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.get(url, config);
    return response.data;
  }

  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.post(url, data, config);
    return response.data;
  }

  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.put(url, data, config);
    return response.data;
  }

  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    const response: AxiosResponse<T> = await this.api.delete(url, config);
    return response.data;
  }

  // Auth methods
  async login(email: string, password: string): Promise<{ token: string; user: any }> {
    return this.post('/auth/login', { email, password });
  }

  async register(userData: any): Promise<{ token: string; user: any }> {
    return this.post('/auth/register', userData);
  }

  async logout(): Promise<void> {
    return this.post('/auth/logout');
  }

  async refreshToken(): Promise<{ token: string }> {
    return this.post('/auth/refresh');
  }

  // Profile methods
  async getProfile(): Promise<any> {
    return this.get('/profile');
  }

  async updateProfile(profileData: any): Promise<any> {
    return this.put('/profile', profileData);
  }

  async updatePreferences(preferences: any): Promise<any> {
    return this.put('/profile/preferences', preferences);
  }

  async updateSecuritySettings(settings: any): Promise<any> {
    return this.put('/profile/security', settings);
  }

  async updateBackupSettings(settings: any): Promise<any> {
    return this.put('/profile/backup', settings);
  }

  // Workflow methods
  async getWorkflows(): Promise<any[]> {
    return this.get('/workflows');
  }

  async getWorkflow(id: string): Promise<any> {
    return this.get(`/workflows/${id}`);
  }

  async createWorkflow(workflowData: any): Promise<any> {
    return this.post('/workflows', workflowData);
  }

  async updateWorkflow(id: string, workflowData: any): Promise<any> {
    return this.put(`/workflows/${id}`, workflowData);
  }

  async deleteWorkflow(id: string): Promise<void> {
    return this.delete(`/workflows/${id}`);
  }

  async toggleWorkflow(id: string): Promise<any> {
    return this.put(`/workflows/${id}/toggle`);
  }

  // Agent methods
  async getAgents(): Promise<any[]> {
    return this.get('/agents');
  }

  async getAgent(id: string): Promise<any> {
    return this.get(`/agents/${id}`);
  }

  async createAgent(agentData: any): Promise<any> {
    return this.post('/agents', agentData);
  }

  async updateAgent(id: string, agentData: any): Promise<any> {
    return this.put(`/agents/${id}`, agentData);
  }

  async deleteAgent(id: string): Promise<void> {
    return this.delete(`/agents/${id}`);
  }

  async startTraining(id: string): Promise<any> {
    return this.post(`/agents/${id}/train`);
  }

  async stopTraining(id: string): Promise<any> {
    return this.post(`/agents/${id}/stop-training`);
  }

  // Personality methods
  async getPersonalities(): Promise<any[]> {
    return this.get('/personalities');
  }

  async getPersonality(id: string): Promise<any> {
    return this.get(`/personalities/${id}`);
  }

  async createPersonality(personalityData: any): Promise<any> {
    return this.post('/personalities', personalityData);
  }

  async updatePersonality(id: string, personalityData: any): Promise<any> {
    return this.put(`/personalities/${id}`, personalityData);
  }

  async deletePersonality(id: string): Promise<void> {
    return this.delete(`/personalities/${id}`);
  }

  // Analytics methods
  async getMetrics(timeRange: string): Promise<any[]> {
    return this.get('/analytics/metrics', { params: { timeRange } });
  }

  async getCharts(): Promise<any[]> {
    return this.get('/analytics/charts');
  }

  async createChart(chartData: any): Promise<any> {
    return this.post('/analytics/charts', chartData);
  }

  async updateChart(id: string, chartData: any): Promise<any> {
    return this.put(`/analytics/charts/${id}`, chartData);
  }

  async deleteChart(id: string): Promise<void> {
    return this.delete(`/analytics/charts/${id}`);
  }
}

export const api = new ApiService(); 