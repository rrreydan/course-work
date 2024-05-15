<script lang="ts" setup>
import { useBusServicesStore } from '@/store/busServices'
import { useUsersStore } from '@/store/users'
import type { IBusService } from '@/interfaces/busServiceInterface'
import BusServiceCard from '@/components/cards/BusServiceCard.vue'
import BusServiceCardsHeader from '@/components/ui/BusServiceCardsHeader.vue'
import { onMounted, ref, watch } from 'vue'
import type { IUser } from '@/interfaces/userInterface'

const busServicesStore = useBusServicesStore()
const usersStore = useUsersStore()

const busServices = ref([] as IBusService[])
const sortedBusServices = ref([] as IBusService[])
const user = ref({} as { status: { loggedIn: boolean }; data: IUser })
const sortingDown = ref(true)

// Если пользователь выбрал новые данные для поиска, то обновляем список рейсов
busServicesStore.$subscribe((_, state) => {
  busServices.value = state.busServices
  // Сортируем их по времени
  sortedBusServices.value = state.busServices.sort(
    (a, b) =>
      new Date(a.value.departure_date).getTime() -
      new Date(b.value.departure_date).getTime()
  )
})

// Если пользователь обновляется, то обновляем его на странице
usersStore.$subscribe((_, state) => {
  user.value = state.user
})

// Функция сортировки автобусных рейсов по времени
const sortBusServices = (): void => {
  sortedBusServices.value = busServices.value
  if (sortingDown.value) {
    sortedBusServices.value.sort(
      (a, b) =>
        new Date(b.value.departure_date).getTime() -
        new Date(a.value.departure_date).getTime()
    )
  } else {
    sortedBusServices.value.sort(
      (a, b) =>
        new Date(a.value.departure_date).getTime() -
        new Date(b.value.departure_date).getTime()
    )
  }
  sortingDown.value = !sortingDown.value
}

watch(busServices, () => {
  sortingDown.value = true
})

// Подгружаем пользователя
onMounted(() => {
  user.value = usersStore.user
})
</script>

<template>
  <v-main>
    <v-container class="container">
      <div
        v-if="busServices.length === 0"
        class="empty-search"
      >
        Здесь пока ничего нет. Воспользуйтесь поиском
      </div>
      <div
        class="bus-service-cards"
        v-else
      >
        <BusServiceCardsHeader :bus-services="busServices" />
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
          :is-favorite="
            user.status.loggedIn &&
            user.data.value.favorite_bus_services.find(
              (_busService: IBusService) => _busService.id === busService.id
            ) !== undefined
          "
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

.empty-search {
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
