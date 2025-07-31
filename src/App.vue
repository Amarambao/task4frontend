<script setup lang="ts">
import AppHeader from "./components/AppHeader.vue";
import {useJwtStore} from "./stores/JwtStore.ts";

const jwtStore = useJwtStore();
</script>

<template>
  <div class="app-container">
    <div class="content-container">
      <appHeader v-if="jwtStore.isAnyToken()"/>
      <router-view class="content"/>
    </div>
  </div>
</template>

<style scoped>
.app-container {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  background-color: #f4f7fb;
}

.content-container {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;
}

.content {
  flex-grow: 1;
  padding: 1rem;
}
</style>
