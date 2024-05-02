<script setup lang="ts">
import BusServiceCard from '@/components/cards/BusServiceCard.vue'
import type { IBusService } from '@/interfaces/busServiceInterface'
import { useBusServicesStore } from '@/store/busServices'
import { useUsersStore } from '@/store/users'
import { onMounted, ref, watch } from 'vue'

const usersStore = useUsersStore()
const busServicesStore = useBusServicesStore()
const busServices = ref([] as IBusService[])
const favoriteBusServices = ref([] as IBusService[])
const sortedBusServices = ref([] as IBusService[])
const sortingDown = ref(true)

const sortBusServices = (): void => {
  sortedBusServices.value = favoriteBusServices.value
  if (sortingDown.value) {
    sortedBusServices.value.sort(
      (a, b) =>
        new Date(b.value.departure_time).getTime() -
        new Date(a.value.departure_time).getTime()
    )
  } else {
    sortedBusServices.value.sort(
      (a, b) =>
        new Date(a.value.departure_time).getTime() -
        new Date(b.value.departure_time).getTime()
    )
  }
  sortingDown.value = !sortingDown.value
}

watch(busServices, () => {
  sortingDown.value = true
})

onMounted(async () => {
  await busServicesStore.getBusServices(null, null, null)
  busServices.value = busServicesStore.busServices
  console.log(busServices.value)

  for (const busService of busServices.value) {
    if (
      usersStore.user.data.value.favorite_bus_services.find(
        (_busService: IBusService) => _busService.id === busService.id
      ) !== undefined
    ) {
      favoriteBusServices.value.push(busService)
    }
  }

  sortedBusServices.value = favoriteBusServices.value
})
</script>

<template>
  <v-main>
    <v-container class="container">
      <h1 class="title">Личный кабинет</h1>
      <div
        v-if="favoriteBusServices.length === 0"
        class="empty-favorite"
      >
        Вы пока не добавили ни одного рейса в избранное
      </div>
      <div
        v-else
        class="bus-service-cards"
      >
        <h2 class="bus-services-title">Избранные рейсы</h2>
        <div class="sorting">
          Сортировать:
          <span
            class="sorting-by-time"
            @click="sortBusServices"
          >
            по времени
            <v-icon
              v-if="sortingDown"
              icon="mdi-arrow-down-thin"
            />
            <v-icon
              v-else
              icon="mdi-arrow-up-thin"
            />
          </span>
        </div>
        <BusServiceCard
          v-for="busService in sortedBusServices"
          :key="busService.id"
          :bus-service="busService"
          :is-favorite="true"
        />
      </div>
    </v-container>
  </v-main>
</template>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.title {
  font-size: 2.5rem;
  font-weight: 600;
}

.empty-favorite {
  font-size: 2rem;
  font-weight: 700;
}

.bus-service-cards {
  margin-top: 2rem;
  margin-bottom: 2rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
}

.bus-services-title {
  font-size: 2rem;
  font-weight: 600;
}

.sorting {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.sorting-by-time {
  display: flex;
  align-items: center;
  color: #1a5ec6;
  cursor: pointer;

  &:hover {
    color: #2e72da;
  }
}
</style>
