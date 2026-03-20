<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usersApi } from '@/api';
import type { User } from '@/types';

const route = useRoute();
const router = useRouter();

const user = ref<User | null>(null);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchUser() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await usersApi.getById(route.params.id as string);
    user.value = data;
  } catch (e) {
    error.value = 'Failed to load user or access denied';
  } finally {
    loading.value = false;
  }
}

async function handleBlock() {
  if (!user.value) return;
  if (!confirm(`Are you sure you want to block ${user.value.fullName}?`)) return;

  try {
    await usersApi.block(user.value.id);
    await fetchUser();
  } catch {
    alert('Failed to block user');
  }
}

onMounted(fetchUser);
</script>

<template>
  <div class="user-detail-page">
    <h1>User Details</h1>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <div v-else-if="user" class="user-card">
      <div class="field">
        <span class="label">ID:</span>
        <span class="value">{{ user.id }}</span>
      </div>

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

      <div class="field">
        <span class="label">Created:</span>
        <span class="value">{{ new Date(user.createdAt).toLocaleString() }}</span>
      </div>

      <div class="actions">
        <button v-if="user.isActive" @click="handleBlock" class="danger">
          Block User
        </button>
        <button @click="router.back()" class="secondary">
          Back
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.user-detail-page {
  max-width: 500px;
  margin: 2rem auto;
  padding: 2rem;
}

h1 {
  text-align: center;
  margin-bottom: 2rem;
}

.loading,
.error {
  text-align: center;
  padding: 2rem;
}

.error {
  color: #dc3545;
}

.user-card {
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

.value {
  word-break: break-all;
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
}

button {
  flex: 1;
  padding: 0.75rem;
  border: none;
  border-radius: 4px;
  font-size: 1rem;
  cursor: pointer;
}

button.danger {
  background: #dc3545;
  color: white;
}

button.danger:hover {
  background: #c82333;
}

button.secondary {
  background: #6c757d;
  color: white;
}

button.secondary:hover {
  background: #545b62;
}
</style>
