import { api } from './api';
import { store } from '../store';
import { setProfile, logout } from '../store/slices/profileSlice';
import { addNotification } from '../store/slices/notificationsSlice';

class AuthService {
  private tokenKey = 'token';
  private refreshTokenKey = 'refreshToken';

  constructor() {
    // Check for existing token on initialization
    const token = this.getToken();
    if (token) {
      this.validateToken(token);
    }
  }

  private getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  private setRefreshToken(token: string): void {
    localStorage.setItem(this.refreshTokenKey, token);
  }

  private removeTokens(): void {
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  private async validateToken(token: string): Promise<boolean> {
    try {
      const response = await api.getProfile();
      store.dispatch(setProfile(response));
      return true;
    } catch (error) {
      this.handleAuthError(error);
      return false;
    }
  }

  private async refreshAuthToken(): Promise<boolean> {
    try {
      const refreshToken = this.getRefreshToken();
      if (!refreshToken) {
        throw new Error('No refresh token available');
      }

      const response = await api.refreshToken();
      this.setToken(response.token);
      return true;
    } catch (error) {
      this.handleAuthError(error);
      return false;
    }
  }

  private handleAuthError(error: any): void {
    if (error.response?.status === 401) {
      this.logout();
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Session Expired',
          message: 'Your session has expired. Please log in again.',
        })
      );
    }
  }

  async login(email: string, password: string): Promise<boolean> {
    try {
      const response = await api.login(email, password);
      this.setToken(response.token);
      this.setRefreshToken(response.token); // In a real app, you'd get a separate refresh token
      store.dispatch(setProfile(response.user));
      store.dispatch(
        addNotification({
          type: 'success',
          title: 'Welcome Back',
          message: 'You have successfully logged in.',
        })
      );
      return true;
    } catch (error) {
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Login Failed',
          message: error.response?.data?.message || 'Invalid email or password.',
        })
      );
      return false;
    }
  }

  async register(userData: any): Promise<boolean> {
    try {
      const response = await api.register(userData);
      this.setToken(response.token);
      this.setRefreshToken(response.token); // In a real app, you'd get a separate refresh token
      store.dispatch(setProfile(response.user));
      store.dispatch(
        addNotification({
          type: 'success',
          title: 'Welcome',
          message: 'Your account has been created successfully.',
        })
      );
      return true;
    } catch (error) {
      store.dispatch(
        addNotification({
          type: 'error',
          title: 'Registration Failed',
          message: error.response?.data?.message || 'Failed to create account.',
        })
      );
      return false;
    }
  }

  async logout(): Promise<void> {
    try {
      await api.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      this.removeTokens();
      store.dispatch(logout());
      store.dispatch(
        addNotification({
          type: 'info',
          title: 'Logged Out',
          message: 'You have been successfully logged out.',
        })
      );
    }
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  async checkAuth(): Promise<boolean> {
    const token = this.getToken();
    if (!token) {
      return false;
    }

    const isValid = await this.validateToken(token);
    if (!isValid) {
      const refreshed = await this.refreshAuthToken();
      if (refreshed) {
        return this.validateToken(this.getToken()!);
      }
    }

    return isValid;
  }
}

export const auth = new AuthService(); 