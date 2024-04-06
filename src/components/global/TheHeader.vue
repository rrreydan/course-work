<script setup lang="ts">
import TheTopNavbar from './TheTopNavbar.vue'
import SearchCard from '../cards/SearchCard.vue'
</script>

<template>
  <header>
    <TheTopNavbar />
    <div class="search-section">
      <v-container class="container">
        <SearchCard />
      </v-container>
    </div> 
  </header>
</template>

<style lang="scss" scoped>
.search-section {
  height: 30rem;
  background: url('../../assets/images/—Pngtree—street road bus advertising background_968613.jpg') center;
  background-size: contain;
}

.container {
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
} 
</style>
