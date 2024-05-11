<script setup lang="ts">
import { formatDateTime, getWeekDay } from '@/utils/dates'
import { useBusServicesStore } from '@/store/busServices'

const busServicesStore = useBusServicesStore()
</script>

<template>
  <div class="bus-service-cards-header">
    <div class="title">
      Расписание автобуса
      {{ busServicesStore.busServices[0].value.departure_point.title }} -
      {{ busServicesStore.busServices[0].value.arrival_point.title }}
    </div>
    <div class="date">
      {{
        formatDateTime(
          busServicesStore.busServices[0].value.departure_date,
          'date',
          'numeric'
        )
      }}
      {{ getWeekDay(busServicesStore.busServices[0].value.departure_date) }}
    </div>
  </div>
</template>

<style lang="scss" scoped>
.bus-service-cards-header {
  margin-bottom: 1.5rem;
}

.title {
  font-size: 2rem;
  font-weight: 600;
}

.date {
  font-size: 1.8rem;
  font-weight: 500;
}
</style>
