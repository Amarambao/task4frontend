<script setup lang="ts">
import {BNavbar, BNavForm, BButton} from 'bootstrap-vue-next'
import {useJwtStore} from "../stores/JwtStore.ts";
import router from "../router/router.ts";

const jwtStore = useJwtStore();

function exit() {
  jwtStore.clearToken();
  router.push("/");
}
</script>

<template>
  <BNavbar
      toggleable="lg"
      variant="primary">
    <BNavForm class="d-flex">
      <BButton
          variant="outline-danger"
          size="lg"
          @click="exit">
        Exit
      </BButton>
    </BNavForm>
  </BNavbar>
</template>

<style scoped>

</style>