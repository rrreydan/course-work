<script setup lang="ts">
import TheTopNavbar from '@/components/global/TheTopNavbar.vue'
import SearchCard from '@/components/cards/SearchCard.vue'
import { useRouter } from 'vue-router'
import { ref, watch } from 'vue'

const router = useRouter()
const currentRoute = ref('' as string | undefined)

watch(router.currentRoute, () => {
  currentRoute.value = router.currentRoute.value.name?.toString()
})
</script>

<template>
  <header>
    <TheTopNavbar />
    <div
      v-if="currentRoute === 'home'"
      class="search-section"
    >
      <v-container class="container">
        <SearchCard />
      </v-container>
    </div>
  </header>
</template>

<style lang="scss" scoped>
.search-section {
  height: 30rem;
  background: url('../../assets/images/—Pngtree—street road bus advertising background_968613.jpg')
    center;
  background-size: contain;
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
