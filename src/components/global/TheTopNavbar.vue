<script setup lang="ts">
import LoginModal from '@/components/modals/LoginModal.vue'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()

const logoutHandler = () => {
  usersStore.logoutUser()
  window.location.reload()
}
</script>

<template>
  <div class="wrapper">
    <v-container class="container">
      <router-link
        to="/"
        class="logo"
      >
        <v-icon
          icon="mdi-compass-outline"
          size="large"
        />
        <p>Andrey Bus {{ usersStore.user.status.loggedIn && usersStore.user.data.value.is_admin ? '(Админ)' : '' }}</p>
      </router-link>
      <div class="other-buttons">
        <LoginModal v-if="!usersStore.user.status.loggedIn" />
        <div
          class="logged-in-menu"
          v-else
        >
          <router-link
            class="hover-underline-animation"
            :to="`/personal-cabinet/${usersStore.user.data.id}`"
          >
            Личный кабинет
          </router-link>
          <div
            class="hover-underline-animation"
            @click="logoutHandler"
          >
            Выйти
          </div>
        </div>
      </div>
    </v-container>
  </div>
</template>

<style lang="scss" scoped>
.wrapper {
  color: #fff;
  background: #1a5ec6;
  font-weight: 500;
  font-size: 1.2rem;
}

.container {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.5rem;
  font-weight: 700;
}

.hover-underline-animation {
  cursor: pointer;
  display: inline-block;
  position: relative;
}

.hover-underline-animation:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(0);
  height: 3px;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transform-origin: bottom right;
  transition: transform 0.25s ease-out;
}

.toggle:after {
  content: '';
  position: absolute;
  width: 100%;
  transform: scaleX(1);
  height: 3px;
  border-radius: 3px;
  bottom: 0;
  left: 0;
  background-color: #fff;
  transform-origin: bottom right;
}

.hover-underline-animation:hover:after {
  transform: scaleX(1);
  transform-origin: bottom left;
}

.logged-in-menu {
  display: flex;
  align-items: center;
  gap: 2rem;
}
</style>
