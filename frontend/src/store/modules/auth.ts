import type { Module } from 'vuex';
import { authApi } from '@/api';
import type { User } from '@/types';

interface AuthState {
  user: User | null;
  token: string | null;
  loading: boolean;
}

const auth: Module<AuthState, unknown> = {
  namespaced: true,

  state: () => ({
    user: null,
    token: localStorage.getItem('token'),
    loading: false,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    isAdmin: (state) => state.user?.role === 'admin',
    currentUser: (state) => state.user,
    isLoading: (state) => state.loading,
  },

  mutations: {
    setToken(state, token: string | null) {
      state.token = token;
      if (token) {
        localStorage.setItem('token', token);
      } else {
        localStorage.removeItem('token');
      }
    },
    setUser(state, user: User | null) {
      state.user = user;
    },
    setLoading(state, loading: boolean) {
      state.loading = loading;
    },
  },

  actions: {
    async fetchCurrentUser({ commit, state }) {
      if (!state.token) return;
      try {
        const { data } = await authApi.me();
        commit('setUser', data);
      } catch {
        commit('setToken', null);
        commit('setUser', null);
      }
    },

    logout({ commit }) {
      commit('setToken', null);
      commit('setUser', null);
    },
  },
};

export default auth;
