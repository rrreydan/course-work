<script setup lang="ts">
import type { IBusService } from '@/interfaces/busServiceInterface'
import { onMounted, type PropType, ref } from 'vue'
import { formatDateTime } from '@/utils/dates'
import { useUsersStore } from '@/store/users'
import LoginModal from '../modals/LoginModal.vue'
import UsersService from '@/services/users.service'
import BusServicesService from '@/services/busServices.service'
import { useBusServicesStore } from '@/store/busServices'
import EditBusServiceModal from '@/components/modals/EditBusServiceModal.vue'

const usersStore = useUsersStore()
const busServicesStore = useBusServicesStore()

const props = defineProps({
  busService: {
    type: Object as PropType<IBusService>,
    required: true
  },
  isFavorite: {
    type: Boolean,
    required: true
  }
})

const isFavoriteRef = ref(props.isFavorite)
const favoriteCount = ref(0)

const addToFavorites = async () => {
  await UsersService.addFavoriteBusService(props.busService)
  const updatedUser = await UsersService.getUserById(usersStore.user.data.id)
  usersStore.loginUser(updatedUser)
  isFavoriteRef.value = true
  favoriteCount.value++
}

const removeFromFavorites = async () => {
  await UsersService.removeFavoriteBusService(props.busService)
  const updatedUser = await UsersService.getUserById(usersStore.user.data.id)
  usersStore.loginUser(updatedUser)
  isFavoriteRef.value = false
  favoriteCount.value--
}

const deleteBusService = async (busServiceId: string) => {
  await BusServicesService.deleteBusService(busServiceId)
  busServicesStore.busServices = busServicesStore.busServices.filter(busService => busService.id !== busServiceId)
}

onMounted(async () => {
  await usersStore.getUsers()

  for (const user of usersStore.users) {
    for (const busService of user.value.favorite_bus_services) {
      if (busService.id === props.busService.id) {
        favoriteCount.value++
      }
    }
  }
})
</script>

<template>
  <div>
    <v-card
      width="1200"
      elevation="5"
      class="bus-service-card"
    >
      <v-card-text>
        <v-row>
          <v-col col="4">
            <div class="date-and-time">
              <div class="time">
                {{
                  formatDateTime(props.busService.value.departure_date, 'time')
                }}
              </div>
              <div class="date">
                {{
                  formatDateTime(props.busService.value.departure_date, 'date')
                }}
              </div>
            </div>
            <div class="title">
              {{ props.busService.value.departure_point.title }}
            </div>
          </v-col>
          <v-col col="4">
            <div class="date-and-time">
              <div class="time">
                {{
                  formatDateTime(props.busService.value.arrival_date, 'time')
                }}
              </div>
              <div class="date">
                {{
                  formatDateTime(props.busService.value.departure_date, 'date')
                }}
              </div>
            </div>
            <div class="title">
              {{ props.busService.value.arrival_point.title }}
            </div>
          </v-col>
          <v-col
            cols="4"
            class="last-column"
          >
            <div class="last-column-buttons">
              <LoginModal
                v-if="!usersStore.user.status.loggedIn"
                :is-favorite-button="true"
              />
              <v-btn
                v-else-if="!isFavoriteRef"
                class="text-none"
                size="large"
                rounded="lg"
                variant="flat"
                color="#1A5EC6"
                prepend-icon="mdi-star"
                @click="addToFavorites"
              >
                Добавить в избранное
              </v-btn>
              <v-btn
                v-else-if="isFavoriteRef"
                class="text-none"
                size="large"
                rounded="lg"
                variant="outlined"
                prepend-icon="mdi-star"
                @click="removeFromFavorites"
              >
                В избранном
              </v-btn>
              <v-btn
                v-if="usersStore.user.status.loggedIn && usersStore.user.data.value.is_admin"
                rounded="lg"
                variant="flat"
                color="#ff0f0f"
                icon="mdi-delete"
                @click="deleteBusService(props.busService.id)"
              />
              <EditBusServiceModal
                v-if="usersStore.user.status.loggedIn && usersStore.user.data.value.is_admin"
                :bus-service="props.busService"
              />
            </div>
            <div class="favorite-count">
              В избранном у {{ favoriteCount }} человек
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped>
.bus-service-card {
  height: 10rem;
}

.v-card-text {
  height: 100%;
}

.v-row {
  height: 100%;
  margin: unset;
}

.date-and-time {
  display: flex;
  align-items: first baseline;
  gap: 0.5rem;
}

.time {
  font-size: 1.5rem;
  font-weight: 500;
}

.title {
  margin-top: 1rem;
  font-size: 1.5rem;
  font-weight: 500;
}

.last-column {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  justify-content: center;
  gap: 0.3rem;
}

.last-column-buttons {
  display: flex;
  align-items: center;
  gap: 0.3rem;
}
</style>
