<script setup lang="ts">
import { ref } from 'vue'

const departurePoints = ref([
  { id: 1, title: 'Смоленск', value: 'Smolensk' },
  { id: 2, title: 'Смоленск', value: 'Smolensk' },
  { id: 3, title: 'Смоленск', value: 'Smolensk' },
  { id: 4, title: 'Смоленск', value: 'Smolensk' }
])
const arrivalPoints = ref([
  { id: 1, title: 'Ярцево', value: 'Yartsevo' },
  { id: 2, title: 'Ярцево', value: 'Yartsevo' },
  { id: 3, title: 'Ярцево', value: 'Yartsevo' },
  { id: 4, title: 'Ярцево', value: 'Yartsevo' }
])
</script>

<template>
  <v-card
    class="search-card"
    title="Найти билет на автобус"
    width="1200"
    elevation="16"
  >
    <v-card-text class="card-content">
      <div class="inputs">
        <v-select
          :items="departurePoints"
          item-title="title"
          item-value="value"
          label="Пункт отправления"
          variant="outlined"
        />
        <v-select
          :items="arrivalPoints"
          item-title="title"
          item-value="value"
          label="Пункт прибытия"
          variant="outlined"
        />
        <VueDatePicker
          class="date-picker"
          auto-apply
          locale="ru"
          format="dd.MM.yyyy"
          placeholder="Дата выезда"
          :enable-time-picker="false"
          :month-change-on-scroll="false"
        />
      </div>
      <v-btn
        class="search-button text-none"
        size="large"
        rounded="lg"
        variant="flat"
        color="#1A5EC6"
        prepend-icon="mdi-magnify"
      >
        Найти
      </v-btn>
    </v-card-text>
  </v-card>
</template>

<style lang="scss" scoped>
.search-card {
  overflow: visible;
}

.card-content {
  margin-top: 2rem;
}

.inputs {
  display: flex;
  gap: 1rem;
}

.date-picker {
  width: auto;
}

.search-button {
  float: right;
  margin-bottom: 1rem;
  width: 10rem;
}
</style>
