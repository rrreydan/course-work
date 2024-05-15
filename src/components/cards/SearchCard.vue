<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { useCitiesStore } from '@/store/cities'
import { useBusServicesStore } from '@/store/busServices'
import type { ICity } from '@/interfaces/cityInterface'

const citiesStore = useCitiesStore()
const busServicesStore = useBusServicesStore()

const departurePoints = ref([] as ICity[])
const arrivalPoints = ref([] as ICity[])

const selectedDeparturePoint = ref(null)
const selectedArrivalPoint = ref(null)
const departureDate = ref(null)

const itemProps = (item: ICity) => {
  return {
    title: item.value.title,
    subtitle: item.value.country + ', ' + item.value.region
  }
}

// Функция поиска необходимых рейсов
const searchBusServices = async () => {
  // Если введенные данные пустые, то ничего не показываем
  if (
    selectedDeparturePoint.value === null ||
    selectedArrivalPoint.value === null ||
    departureDate.value === null
  )
    return

  // Получаем данные из БД
  await busServicesStore.getBusServices(
    selectedDeparturePoint.value,
    selectedArrivalPoint.value,
    departureDate.value
  )
}

// Подгружаем города
onMounted(async () => {
  await citiesStore.getCities()
  departurePoints.value = citiesStore.cities
  arrivalPoints.value = citiesStore.cities
})
</script>

<template>
  <v-card
    class="search-card"
    title="Найти билет на автобус"
    width="1200"
    elevation="16"
  >
    <v-card-text class="card-content">
      <v-row>
        <v-col>
          <v-select
            v-model="selectedDeparturePoint"
            :items="departurePoints"
            :item-props="itemProps"
            item-title="title"
            label="Пункт отправления"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col>
          <v-select
            v-model="selectedArrivalPoint"
            :items="arrivalPoints"
            :item-props="itemProps"
            item-title="title"
            label="Пункт прибытия"
            variant="outlined"
            hide-details
          />
        </v-col>
        <v-col>
          <VueDatePicker
            v-model="departureDate"
            auto-apply
            locale="ru"
            format="dd.MM.yyyy"
            model-type="yyyy-MM-dd"
            placeholder="Дата выезда"
            :min-date="new Date()"
            :enable-time-picker="false"
            :month-change-on-scroll="false"
          />
        </v-col>
      </v-row>
      <v-btn
        class="search-button text-none"
        size="large"
        rounded="lg"
        variant="flat"
        color="#1A5EC6"
        prepend-icon="mdi-magnify"
        @click="searchBusServices"
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
  margin-top: 1.5rem;
}

.search-button {
  float: right;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 10rem;
}
</style>
