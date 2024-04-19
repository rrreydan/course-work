<script setup lang="ts">
import { useUsersStore } from '@/store/users'
import { ref } from 'vue'
import type { IUser } from '@/interfaces/userInterface'
import RegisterModal from '@/components/modals/RegisterModal.vue'

const props = defineProps({
  isFavoriteButton: {
    type: Boolean,
    required: false,
    default: false
  }
})

const usersStore = useUsersStore()

const email = ref('')
const password = ref('')
const users = ref([] as IUser[])
const dialog = ref(false)

const loginHandler = async () => {
  await usersStore.getUsers()
  users.value = usersStore.users
  const user = users.value.find(
    (user) => user.email === email.value && user.password === password.value
  )

  if (user === undefined) {
    alert('Неправильный логин или пароль')
  } else {
    usersStore.loginUser(user)
    dialog.value = false
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    activator="#favorite-open-auth-modal"
    max-width="500"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <v-icon
        v-if="!props.isFavoriteButton"
        v-bind="activatorProps"
        icon="mdi-account-circle-outline"
        size="large"
        @click="dialog = true"
      />
      <v-btn
        v-else
        v-bind="activatorProps"
        class="text-none"
        size="large"
        rounded="lg"
        variant="flat"
        color="#1A5EC6"
        prepend-icon="mdi-star"
        @click="dialog = true"
      >
        Добавить в избранное
      </v-btn>
    </template>

    <template v-slot:default>
      <v-card title="Вход в личный кабинет">
        <v-card-text>
          <v-text-field
            v-model="email"
            variant="outlined"
            label="Email"
          />
          <v-text-field
            v-model="password"
            variant="outlined"
            type="password"
            label="Пароль"
          />
          <v-btn
            class="text-none login-button"
            size="large"
            rounded="lg"
            variant="flat"
            color="#1A5EC6"
            append-icon="mdi-arrow-right-thin"
            @click="loginHandler"
          >
            Войти
          </v-btn>
          <RegisterModal />
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped>
.login-button {
  margin-top: 0.5rem;
  width: 100%;
}
</style>
