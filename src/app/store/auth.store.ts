import { computed } from '@angular/core';
import { signalStore, withState, withComputed, withMethods } from '@ngrx/signals';

interface User {
  id: string;
  email: string;
  name?: string;
  // Add other user properties as needed
}

interface AuthState {
  token: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  loading: boolean;
}

const initialState: AuthState = {
  token: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  loading: false,
};

export const AuthStore = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    isLoggedIn: computed(() => store.isAuthenticated() && store.token() !== null),
    currentUser: computed(() => store.user()),
  })),
  withMethods((store) => ({
    // Set authentication tokens
    setTokens(token: string, refreshToken?: string) {
      return {
        token,
        refreshToken: refreshToken ?? store.refreshToken(),
        isAuthenticated: true,
      };
    },

    // Set user information
    setUser(user: User) {
      return { user };
    },

    // Login success
    loginSuccess(token: string, user: User, refreshToken?: string) {
      return {
        token,
        refreshToken: refreshToken ?? null,
        user,
        isAuthenticated: true,
        loading: false,
      };
    },

    // Logout
    logout() {
      return {
        token: null,
        refreshToken: null,
        user: null,
        isAuthenticated: false,
        loading: false,
      };
    },

    // Set loading state
    setLoading(loading: boolean) {
      return { loading };
    },

    // Get token
    getToken(): string | null {
      return store.token();
    },

    // Update token
    updateToken(token: string) {
      return { token };
    },
  }))
);
