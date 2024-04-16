<script lang="ts" setup>
import { useBusServicesStore } from '@/store/busServices'
import type { IBusService } from '@/interfaces/busServiceInterface'
import BusServiceCard from '@/components/cards/BusServiceCard.vue'
import BusServiceCardsHeader from '@/components/ui/BusServiceCardsHeader.vue'
import { ref } from 'vue'

const busServicesStore = useBusServicesStore()

const busServices = ref([] as IBusService[])

busServicesStore.$subscribe((_, state) => {
  busServices.value = state.busServices
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
        <BusServiceCard
          v-for="busService in busServices"
          :key="busService._id"
          :bus-service="busService"
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
</style>
