<script setup lang="ts">
import type { IBusService } from '@/interfaces/busServiceInterface'
import { onMounted, ref, type PropType } from 'vue'
import { formatDateTime } from '@/utils/dates'
import { useUsersStore } from '@/store/users'
import LoginModal from '../modals/LoginModal.vue'
import UsersService from '@/services/users.service'

const usersStore = useUsersStore()

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

const addToFavorites = async () => {
  await UsersService.addFavoriteBusService(props.busService)
  const updatedUser = await UsersService.getUserById(usersStore.user.data._id)
  usersStore.loginUser(updatedUser)
  isFavoriteRef.value = true
}

const removeFromFavorites = async () => {
  await UsersService.removeFavoriteBusService(props.busService)
  const updatedUser = await UsersService.getUserById(usersStore.user.data._id)
  usersStore.loginUser(updatedUser)
  isFavoriteRef.value = false
}

onMounted(() => {
  console.log(props.isFavorite)
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
                {{ formatDateTime(props.busService.departure_time, 'time') }}
              </div>
              <div class="date">
                {{ formatDateTime(props.busService.departure_date, 'date') }}
              </div>
            </div>
            <div class="title">
              {{ props.busService.departure_point[0].title }}
            </div>
          </v-col>
          <v-col col="4">
            <div class="date-and-time">
              <div class="time">
                {{ formatDateTime(props.busService.arrival_time, 'time') }}
              </div>
              <div class="date">
                {{ formatDateTime(props.busService.departure_date, 'date') }}
              </div>
            </div>
            <div class="title">
              {{ props.busService.arrival_point[0].title }}
            </div>
          </v-col>
          <v-col
            cols="4"
            class="last-column"
          >
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
            <div class="favorite-count">В избранном у 0 человек</div>
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
</style>
