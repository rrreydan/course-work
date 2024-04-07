<script lang="ts" setup></script>

<template>
  <v-main>
    <v-container class="container">
      <div class="empty-search">
        Здесь пока ничего нет. Воспользуйтесь поиском
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
</style>
