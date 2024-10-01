<script setup>
import { RouterLink, RouterView } from 'vue-router'
import { useAuthStore } from './stores/auth.js'
</script>

<template>
  <header>
    <nav>
      <RouterLink to="/">Главная</RouterLink>
      <RouterLink to="/favorites" v-if="useAuthStore.isLogined">Избранное</RouterLink>
      <RouterLink to="/upload" v-if="!useAuthStore.isLogined">Войти</RouterLink>
      <RouterLink to="/about" v-else>Выйти</RouterLink>
    </nav>
    <div>
      <RouterLink to="/upload" v-if="useAuthStore.isLogined" class="upload-link">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none">
          <path d="M15 21H9C6.17157 21 4.75736 21 3.87868 20.1213C3 19.2426 3 17.8284 3 15M21 15C21 17.8284 21 19.2426 20.1213 20.1213C19.8215 20.4211 19.4594 20.6186 19 20.7487" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
          <path d="M12 16V3M12 3L16 7.375M12 3L8 7.375" stroke="#1C274C" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        </svg>
      </RouterLink>
    </div>
  </header>

  <RouterView />
<footer>

</footer>
</template>

<style scoped>
header {
  padding: 1rem 3rem;
  border-bottom: 1px solid black;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 2;
  background-color: #fff;
}
footer {
  min-height: 100px;
}

nav {
  text-align: center;
  display: flex;
}

nav a {
  color: black;
}


nav a.router-link-exact-active {
  color: white;
  background-color: #34495e;
}

nav a {
  display: inline-block;
  padding: .5rem 1rem;
}

.upload-link {
  display: flex; 
  justify-content: center; 
  align-items: center; 
  padding: .5rem;
  border-radius: 100%;
  border: 1px solid hsla(160, 100%, 37%, 1);;
}
</style>
