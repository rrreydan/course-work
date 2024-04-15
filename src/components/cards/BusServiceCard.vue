<script setup lang="ts">
import type { IBusService } from '@/interfaces/busServiceInterface'
import type { PropType } from 'vue'

const props = defineProps({
  busService: {
    type: Object as PropType<IBusService>,
    required: true
  }
})

const formatDateTime = (date: string, type: string): string => {
  if (type === 'time') {
    const tIndex = date.indexOf('T')
    return date.slice(tIndex + 1, tIndex + 6)
  } else if (type === 'date') {
    return new Date(date).toLocaleDateString('ru-RU')
  }

  return ''
}
</script>

<template>
  <div>
    <v-card
      width="1200"
      elevation="16"
    >
      <v-card-text>
        <v-row>
          <v-col col="6">
            <div class="date-and-time">
              {{ formatDateTime(props.busService.departure_time, 'time') }}
              {{ formatDateTime(props.busService.departure_date, 'date') }}
            </div>
            <div class="title">
              {{ props.busService.departure_point[0].title }}
            </div>
          </v-col>
          <v-col col="6">
            <div class="date-and-time">
              {{ formatDateTime(props.busService.arrival_time, 'time') }}
              {{ formatDateTime(props.busService.departure_date, 'date') }}
            </div>
            <div class="title">
              {{ props.busService.arrival_point[0].title }}
            </div>
          </v-col>
        </v-row>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="scss" scoped></style>
