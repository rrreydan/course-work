<script setup lang="ts">
import type { IBusService } from '@/interfaces/busServiceInterface'
import type { PropType } from 'vue'
import { formatDateTime } from '@/utils/dates'

const props = defineProps({
  busService: {
    type: Object as PropType<IBusService>,
    required: true
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
            <v-btn
              class="search-button text-none"
              size="large"
              rounded="lg"
              variant="flat"
              color="#1A5EC6"
              prepend-icon="mdi-star"
            >
              Добавить в избранное
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
