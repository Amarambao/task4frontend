<script setup lang="ts">
import {ref} from "vue";
import SignIn from "./SignIn.vue";
import SignUp from "./SignUp.vue";

const isShowLogin = ref<boolean>(true);

function switchLoginAndRegistration() {
  isShowLogin.value = !isShowLogin.value;
}
</script>

<template>
  <div class="container">
    <SignIn
        v-if="isShowLogin"
        @switch="switchLoginAndRegistration"/>
    <SignUp
        v-else
        @switch="switchLoginAndRegistration"/>
  </div>
</template>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>