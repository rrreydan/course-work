<script setup lang="ts">
import { onMounted, ref } from 'vue'
import type { ICity } from '@/interfaces/cityInterface'
import { useCitiesStore } from '@/store/cities'
import BusServicesService from '@/services/busServices.service'

const citiesStore = useCitiesStore()
const busServicesService = new BusServicesService()

const departurePoints = ref([] as ICity[])
const arrivalPoints = ref([] as ICity[])

const selectedDeparturePoint = ref(null as ICity | null | undefined)
const selectedArrivalPoint = ref(null as ICity | null | undefined)
const departureDate = ref(null as Date | null)
const arrivalDate = ref(null as Date | null)

const itemProps = (item: ICity) => {
  return {
    title: item.value.title,
    subtitle: item.value.country + ', ' + item.value.region
  }
}

// Функция добавления рейса
const addBusService = async () => {
  // Проверка корректности введенных данных
  if (
    selectedDeparturePoint.value === null ||
    selectedArrivalPoint.value === null ||
    selectedDeparturePoint.value?.value.title ===
      selectedArrivalPoint.value?.value.title ||
    departureDate.value === null ||
    arrivalDate.value === null ||
    arrivalDate.value.getTime() < departureDate.value.getTime()
  ) {
    alert('Некоторые данные некорректны. Измените их и попробуйте еще раз')
    return
  }

  // Формирование нового автобусного рейса для отправки его в БД
  const timezoneOffset = departureDate.value!.getTimezoneOffset() * 60000
  const newBusService = {
    id:
      departureDate.value.toISOString() +
      arrivalDate.value.toISOString() +
      selectedArrivalPoint.value?.value.title +
      selectedArrivalPoint.value?.value.title,
    key: '',
    value: {
      departure_point: {
        _id: selectedDeparturePoint.value!.id,
        title: '',
        region: '',
        country: ''
      },
      arrival_point: {
        _id: selectedArrivalPoint.value!.id,
        title: '',
        region: '',
        country: ''
      },
      departure_date: new Date(
        departureDate.value!.getTime() - timezoneOffset
      ).toISOString(),
      arrival_date: new Date(
        arrivalDate.value!.getTime() - timezoneOffset
      ).toISOString()
    }
  }
  Object.assign(
    newBusService.value.departure_point,
    selectedDeparturePoint.value?.value
  )
  Object.assign(
    newBusService.value.arrival_point,
    selectedArrivalPoint.value?.value
  )

  // Отправка автобусного рейса в БД
  await busServicesService.addBusService(newBusService)
  location.reload()
}

// Подгрузка городов из БД
onMounted(async () => {
  await citiesStore.getCities()
  departurePoints.value = citiesStore.cities
  arrivalPoints.value = citiesStore.cities
})
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <div
        v-bind="activatorProps"
        class="hover-underline-animation"
      >
        Добавить рейс
      </div>
    </template>

    <template v-slot:default>
      <v-card
        class="edit-bus-service-card"
        title="Добавить рейс"
      >
        <v-card-text>
          <div class="inputs">
            <v-select
              v-model="selectedDeparturePoint"
              :items="departurePoints"
              :item-props="itemProps"
              item-title="title"
              item-value=""
              label="Пункт отправления"
              variant="outlined"
              hide-details
            />
            <v-select
              v-model="selectedArrivalPoint"
              :items="arrivalPoints"
              :item-props="itemProps"
              item-title="title"
              item-value=""
              label="Пункт прибытия"
              variant="outlined"
              hide-details
            />
            <VueDatePicker
              v-model="departureDate"
              auto-apply
              locale="ru"
              format="dd.MM.yyyy, HH:mm"
              placeholder="Дата выезда"
              :min-date="new Date()"
              :month-change-on-scroll="false"
            />
            <VueDatePicker
              v-model="arrivalDate"
              auto-apply
              locale="ru"
              format="dd.MM.yyyy, HH:mm"
              placeholder="Дата выезда"
              :min-date="new Date()"
              :month-change-on-scroll="false"
            />
          </div>
          <v-btn
            class="text-none edit-button"
            size="large"
            rounded="lg"
            variant="flat"
            color="#1A5EC6"
            append-icon="mdi-plus"
            @click="addBusService"
          >
            Добавить
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
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

.edit-bus-service-card {
  overflow: visible !important;
}

.inputs {
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.edit-button {
  width: 100%;
  margin-top: 1.5rem;
}
</style>

