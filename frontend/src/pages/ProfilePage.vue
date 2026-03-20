<script setup lang="ts">
import { computed, ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { usersApi } from '@/api';

const store = useStore();
const router = useRouter();

const user = computed(() => store.getters['auth/currentUser']);
const isAdmin = computed(() => store.getters['auth/isAdmin']);
const blocking = ref(false);

onMounted(() => {
  store.dispatch('auth/fetchCurrentUser');
});

async function handleBlock() {
  if (!user.value) return;
  if (!confirm('Are you sure you want to block your account?')) return;

  blocking.value = true;
  try {
    await usersApi.block(user.value.id);
    store.dispatch('auth/logout');
    router.push('/login');
  } catch (error) {
    alert('Failed to block account');
  } finally {
    blocking.value = false;
  }
}

function handleLogout() {
  store.dispatch('auth/logout');
  router.push('/');
}
</script>

<template>
  <div class="profile-page">
    <h1>Profile</h1>

    <div v-if="user" class="profile-card">
      <div class="field">
        <span class="label">Full Name:</span>
        <span class="value">{{ user.fullName }}</span>
      </div>

      <div class="field">
        <span class="label">Email:</span>
        <span class="value">{{ user.email }}</span>
      </div>

      <div class="field">
        <span class="label">Birth Date:</span>
        <span class="value">{{ new Date(user.birthDate).toLocaleDateString() }}</span>
      </div>

      <div class="field">
        <span class="label">Role:</span>
        <span class="value badge" :class="user.role">{{ user.role }}</span>
      </div>

      <div class="field">
        <span class="label">Status:</span>
        <span class="value badge" :class="user.isActive ? 'active' : 'blocked'">
          {{ user.isActive ? 'Active' : 'Blocked' }}
        </span>
      </div>

      <div class="actions">
        <button v-if="isAdmin" @click="router.push('/users')" class="primary">
          Manage Users
        </button>
        <button v-if="!isAdmin" @click="handleBlock" :disabled="blocking" class="danger">
          {{ blocking ? 'Blocking...' : 'Block Account' }}
        </button>
        <button @click="handleLogout" class="secondary">
          Logout
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile-page {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.profile-card {
  background: #f8f9fa;
  border-radius: 8px;
  padding: 2rem;
}

.field {
  display: flex;
  justify-content: space-between;
  padding: 0.75rem 0;
  border-bottom: 1px solid #dee2e6;
}

.field:last-of-type {
  border-bottom: none;
}

.label {
  font-weight: 500;
  color: #666;
}

.badge {
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.875rem;
}

.badge.admin {
  background: #6f42c1;
  color: white;
}

.badge.user {
  background: #17a2b8;
  color: white;
}

.badge.active {
  background: #28a745;
  color: white;
}

.badge.blocked {
  background: #dc3545;
  color: white;
}

.actions {
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  flex-wrap: wrap;
}

button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
  min-width: 120px;
}

button.primary {
  background: #007bff;
  color: white;
}

button.primary:hover {
  background: #0056b3;
}

button.secondary {
  background: #6c757d;
  color: white;
}

button.secondary:hover {
  background: #545b62;
}

button.danger {
  background: #dc3545;
  color: white;
}

button.danger:hover:not(:disabled) {
  background: #c82333;
}

button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}
</style>
