<script setup lang="ts">
import { onMounted, type PropType, ref } from 'vue'
import type { IBusService } from '@/interfaces/busServiceInterface'
import type { ICity } from '@/interfaces/cityInterface'
import { useCitiesStore } from '@/store/cities'
import BusServicesService from '@/services/busServices.service'

const props = defineProps({
  busService: {
    type: Object as PropType<IBusService>,
    required: true
  }
})

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

// Функция изменения автобусного рейса
const editBusService = async () => {
  // Проверка корректности введенных данных
  if (
    selectedDeparturePoint.value?.value.title ===
      selectedArrivalPoint.value?.value.title ||
    departureDate.value === null ||
    arrivalDate.value === null ||
    arrivalDate.value.getTime() < departureDate.value.getTime()
  ) {
    alert('Некоторые данные некорректны. Измените их и попробуйте еще раз')
    return
  }

  // Формирования автобусного рейса
  const timezoneOffset = departureDate.value!.getTimezoneOffset() * 60000
  const editedBusService = {
    id: props.busService!.id,
    key: props.busService!.key,
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
    editedBusService.value.departure_point,
    selectedDeparturePoint.value?.value
  )
  Object.assign(
    editedBusService.value.arrival_point,
    selectedArrivalPoint.value?.value
  )

  // Отправка в БД
  await busServicesService.updateBusService(editedBusService)
  location.reload()
}

// Подгрузка городов и заполнение предыдущих данных рейса
onMounted(async () => {
  await citiesStore.getCities()
  departurePoints.value = citiesStore.cities
  arrivalPoints.value = citiesStore.cities

  selectedDeparturePoint.value = citiesStore.cities.find(
    (city) => city.id === props.busService?.value.departure_point._id
  )
  selectedArrivalPoint.value = citiesStore.cities.find(
    (city) => city.id === props.busService?.value.arrival_point._id
  )

  const bsDepartureDate = new Date(props.busService?.value.departure_date)
  const bsArrivalDate = new Date(props.busService?.value.arrival_date)
  const timezoneOffset = bsDepartureDate.getTimezoneOffset() * 60000
  departureDate.value = new Date(bsDepartureDate.getTime() + timezoneOffset)
  arrivalDate.value = new Date(bsArrivalDate.getTime() + timezoneOffset)
})
</script>

<template>
  <v-dialog max-width="500">
    <template v-slot:activator="{ props: activatorProps }">
      <v-btn
        v-bind="activatorProps"
        rounded="lg"
        variant="flat"
        color="#2e72da"
        icon="mdi-pencil"
      />
    </template>

    <template v-slot:default>
      <v-card
        class="edit-bus-service-card"
        title="Изменить рейс"
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
            append-icon="mdi-pencil"
            @click="editBusService"
          >
            Изменить
          </v-btn>
        </v-card-text>
      </v-card>
    </template>
  </v-dialog>
</template>

<style scoped lang="scss">
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

