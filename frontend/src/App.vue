<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const store = useStore();
const router = useRouter();

const isAuthenticated = computed(() => store.getters['auth/isAuthenticated']);
const user = computed(() => store.getters['auth/currentUser']);

onMounted(() => {
  if (isAuthenticated.value && !user.value) {
    store.dispatch('auth/fetchCurrentUser');
  }
});

function handleLogout() {
  store.dispatch('auth/logout');
  router.push('/');
}
</script>

<template>
  <div id="app">
    <header>
      <nav>
        <router-link to="/" class="logo">User Service</router-link>

        <div class="nav-links">
          <template v-if="isAuthenticated">
            <router-link to="/profile">Profile</router-link>
            <span class="user-email" v-if="user">{{ user.email }}</span>
            <button @click="handleLogout">Logout</button>
          </template>
          <template v-else>
            <router-link to="/login">Login</router-link>
            <router-link to="/register">Register</router-link>
          </template>
        </div>
      </nav>
    </header>

    <main>
      <router-view />
    </main>
  </div>
</template>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, sans-serif;
  line-height: 1.6;
  color: #333;
}

#app {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

header {
  background: #343a40;
  padding: 1rem 2rem;
}

nav {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  color: white;
  font-size: 1.25rem;
  font-weight: 600;
  text-decoration: none;
}

.nav-links {
  display: flex;
  align-items: center;
  gap: 1.5rem;
}

.nav-links a {
  color: #adb5bd;
  text-decoration: none;
}

.nav-links a:hover,
.nav-links a.router-link-active {
  color: white;
}

.user-email {
  color: #6c757d;
  font-size: 0.875rem;
}

.nav-links button {
  background: transparent;
  border: 1px solid #6c757d;
  color: #adb5bd;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  cursor: pointer;
}

.nav-links button:hover {
  background: #6c757d;
  color: white;
}

main {
  flex: 1;
  background: #fff;
}
</style>
