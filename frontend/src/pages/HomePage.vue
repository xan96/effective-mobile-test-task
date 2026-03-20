<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
</script>

<template>
  <div class="home">
    <h1>User Service</h1>
    <p>Welcome to the user management system</p>

    <div class="actions" v-if="!isAuthenticated">
      <button @click="router.push('/login')">Login</button>
      <button @click="router.push('/register')" class="secondary">Register</button>
    </div>

    <div class="actions" v-else>
      <button @click="router.push('/profile')">Go to Profile</button>
    </div>
  </div>
</template>

<style scoped>
.home {
  text-align: center;
  padding: 2rem;
}

h1 {
  margin-bottom: 1rem;
}

.actions {
  margin-top: 2rem;
  display: flex;
  gap: 1rem;
  justify-content: center;
}

button {
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  cursor: pointer;
  border: none;
  border-radius: 4px;
  background: #007bff;
  color: white;
}

button:hover {
  background: #0056b3;
}

button.secondary {
  background: #6c757d;
}

button.secondary:hover {
  background: #545b62;
}
</style>
