<script setup lang="ts">
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { authApi } from '@/api';

const store = useStore();
const router = useRouter();

const fullName = ref('');
const birthDate = ref('');
const email = ref('');
const password = ref('');
const error = ref<string | null>(null);

const loading = computed(() => store.getters['auth/isLoading']);

async function handleSubmit() {
  store.commit('auth/setLoading', true);
  error.value = null;

  try {
    await authApi.register({
      fullName: fullName.value,
      birthDate: birthDate.value,
      email: email.value,
      password: password.value,
    });
    router.push('/login');
  } catch (e: unknown) {
    const err = e as { response?: { data?: { message?: string } } };
    error.value = err.response?.data?.message || 'Registration failed';
  } finally {
    store.commit('auth/setLoading', false);
  }
}
</script>

<template>
  <div class="auth-page">
    <h1>Register</h1>

    <form @submit.prevent="handleSubmit" class="auth-form">
      <div class="form-group">
        <label for="fullName">Full Name</label>
        <input
          id="fullName"
          v-model="fullName"
          type="text"
          required
          placeholder="Enter your full name"
        />
      </div>

      <div class="form-group">
        <label for="birthDate">Birth Date</label>
        <input
          id="birthDate"
          v-model="birthDate"
          type="date"
          required
        />
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input
          id="email"
          v-model="email"
          type="email"
          required
          placeholder="Enter your email"
        />
      </div>

      <div class="form-group">
        <label for="password">Password</label>
        <input
          id="password"
          v-model="password"
          type="password"
          required
          minlength="6"
          placeholder="Enter your password (min 6 characters)"
        />
      </div>

      <div v-if="error" class="error">{{ error }}</div>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Loading...' : 'Register' }}
      </button>

      <p class="link">
        Already have an account?
        <router-link to="/login">Login</router-link>
      </p>
    </form>
  </div>
</template>

<style scoped>
.auth-page {
  max-width: 400px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.auth-form {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.form-group {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

label {
  font-weight: 500;
}

input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 1rem;
}

input:focus {
  outline: none;
  border-color: #007bff;
}

button {
  padding: 0.75rem;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 1rem;
}

button:hover:not(:disabled) {
  background: #0056b3;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  color: #dc3545;
  padding: 0.5rem;
  background: #f8d7da;
  border-radius: 4px;
}

.link {
  text-align: center;
  margin-top: 1rem;
}

.link a {
  color: #007bff;
}
</style>
