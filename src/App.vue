<script setup lang="ts">
import TheHeader from '@/components/global/TheHeader.vue'
import TheFooter from '@/components/global/TheFooter.vue'
</script>

<template>
  <v-app>
    <TheHeader />
    <RouterView />
    <TheFooter />
  </v-app>
</template>

<style scoped></style>
