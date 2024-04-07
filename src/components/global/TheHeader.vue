<script setup lang="ts">
import TheTopNavbar from '@/components/global/TheTopNavbar.vue'
import SearchCard from '@/components/cards/SearchCard.vue'
</script>

<template>
  <v-header>
    <TheTopNavbar />
    <div class="search-section">
      <v-container class="container">
        <SearchCard />
      </v-container>
    </div>
  </v-header>
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
