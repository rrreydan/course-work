<script setup lang="ts">
import { ref } from 'vue'
import LoginModal from '@/components/modals/LoginModal.vue'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()

const textButtons = ref([
  {
    id: 1,
    text: 'Главная',
    href: '/',
    isToggle: true
  },
  {
    id: 2,
    text: 'Автовокзал',
    href: '#',
    isToggle: false
  },
  {
    id: 3,
    text: 'Контакты',
    href: '#',
    isToggle: false
  }
])

const changeToggle = (id: number): void => {
  for (let button of textButtons.value) {
    if (button.id === id) {
      button.isToggle = true
    } else {
      button.isToggle = false
    }
  }
}

const logoutHandler = () => {
  usersStore.logoutUser()
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
        <p>Andrey Bus</p>
      </router-link>
      <ul class="text-buttons">
        <li
          v-for="button in textButtons"
          :key="button.id"
          class="hover-underline-animation"
          :class="{ toggle: button.isToggle }"
          @click="changeToggle(button.id)"
        >
          <router-link :to="button.href">
            {{ button.text }}
          </router-link>
        </li>
      </ul>
      <div class="other-buttons">
        <LoginModal v-if="!usersStore.user.status.loggedIn" />
        <div
          class="logged-in-menu"
          v-else
        >
          <router-link
            class="hover-underline-animation"
            to="#"
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

.text-buttons {
  display: flex;
  align-items: center;
  gap: 2rem;
  list-style: none;
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
