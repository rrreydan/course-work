<script setup lang="ts">
import { ref } from 'vue'
import { useUsersStore } from '@/store/users'

const usersStore = useUsersStore()

const email = ref('')
const password = ref('')
const repeatPassword = ref('')
const dialog = ref(false)

// Функция регистрации пользователя
const registerHandler = async () => {
  // Если пароли не совпадают, то выводим ошибку
  if (password.value !== repeatPassword.value) {
    alert('Пароли не совпадают')
    return
  }

  // Отлавливаем ошибку регистрации существующего пользователя
  try {
    await usersStore.registerUser(email.value, password.value)
    dialog.value = false
  } catch {
    alert('Пользователь с таким email уже существует')
  }
}
</script>

<template>
  <v-dialog
    v-model="dialog"
    max-width="500"
  >
    <template v-slot:activator="{ props: activatorProps }">
      <div class="action-suggestion">
        Нет аккаунта?
        <span v-bind="activatorProps">Зарегистрироваться</span>
      </div>
    </template>

    <template v-slot:default>
      <v-card title="Зарегистрироваться">
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
          <v-text-field
            v-model="repeatPassword"
            variant="outlined"
            type="password"
            label="Повторите пароль"
          />
          <v-btn
            class="text-none register-button"
            size="large"
            rounded="lg"
            variant="flat"
            color="#1A5EC6"
            append-icon="mdi-arrow-right-thin"
            @click="registerHandler"
          >
            Зарегистрироваться
          </v-btn>
          <div class="action-suggestion">
            Уже есть аккаунт?
            <span @click="dialog = false">Войти</span>
          </div>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style lang="scss" scoped>
.register-button {
  margin-top: 0.5rem;
  width: 100%;
}

.action-suggestion {
  margin-top: 0.5rem;
  text-align: center;

  span {
    color: #1a5ec6;
    cursor: pointer;

    &:hover {
      color: #2e72da;
    }
  }
}
</style>
