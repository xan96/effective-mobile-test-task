<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { usersApi } from '@/api';
import type { User } from '@/types';

const router = useRouter();
const users = ref<User[]>([]);
const loading = ref(true);
const error = ref<string | null>(null);

async function fetchUsers() {
  loading.value = true;
  error.value = null;
  try {
    const { data } = await usersApi.getAll();
    users.value = data.users;
  } catch (e) {
    error.value = 'Failed to load users';
  } finally {
    loading.value = false;
  }
}

async function handleBlock(user: User) {
  if (!confirm(`Are you sure you want to block ${user.fullName}?`)) return;

  try {
    await usersApi.block(user.id);
    await fetchUsers();
  } catch {
    alert('Failed to block user');
  }
}

onMounted(fetchUsers);
</script>

<template>
  <div class="users-page">
    <h1>Users Management</h1>

    <div v-if="loading" class="loading">Loading...</div>

    <div v-else-if="error" class="error">{{ error }}</div>

    <table v-else class="users-table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Role</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.fullName }}</td>
          <td>{{ user.email }}</td>
          <td>
            <span class="badge" :class="user.role">{{ user.role }}</span>
          </td>
          <td>
            <span class="badge" :class="user.isActive ? 'active' : 'blocked'">
              {{ user.isActive ? 'Active' : 'Blocked' }}
            </span>
          </td>
          <td class="actions">
            <button @click="router.push(`/users/${user.id}`)" class="view">
              View
            </button>
            <button
              v-if="user.isActive && user.role !== 'admin'"
              @click="handleBlock(user)"
              class="block"
            >
              Block
            </button>
          </td>
        </tr>
      </tbody>
    </table>

    <button @click="router.push('/profile')" class="back">
      Back to Profile
    </button>
  </div>
</template>

<style scoped>
.users-page {
  max-width: 900px;
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

.users-table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 2rem;
}

.users-table th,
.users-table td {
  padding: 1rem;
  text-align: left;
  border-bottom: 1px solid #dee2e6;
}

.users-table th {
  background: #f8f9fa;
  font-weight: 600;
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
  gap: 0.5rem;
}

button {
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.875rem;
}

button.view {
  background: #007bff;
  color: white;
}

button.view:hover {
  background: #0056b3;
}

button.block {
  background: #dc3545;
  color: white;
}

button.block:hover {
  background: #c82333;
}

button.back {
  background: #6c757d;
  color: white;
  padding: 0.75rem 1.5rem;
}

button.back:hover {
  background: #545b62;
}
</style>
