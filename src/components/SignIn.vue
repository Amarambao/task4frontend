<script setup lang="ts">
import {BCard, BForm, BFormInput, BFormFloatingLabel, BButtonGroup, BButton,} from 'bootstrap-vue-next'
import {ref} from 'vue'
import type {LoginDto} from "../dto/LoginDto.ts";
import router from "../router/router.ts";
import {useJwtStore} from "../stores/JwtStore.ts";
import {apiClient} from "../services/apiClient.ts";

const emit = defineEmits(['switch']);

const jwtStore = useJwtStore();
const dto = ref<LoginDto>({
  emailOrUserName: '',
  password: '',
})

async function signIn() {
  try {
    const response = await apiClient.post<string>('sign-in', dto.value);

    if (response.status === 200) {
      jwtStore.setToken(response.data);
      await router.push('/users')
    }
  } catch (error) {
    alert("Login failure");
    console.error('Login error:', error);
  }
}
</script>

<template>
  <BCard
      title="Login form"
      tag="form"
      style="max-width: 25rem">
    <BForm>
      <BFormFloatingLabel
          label="Email or username"
          label-for="floatingEmail"
          class="my-2">
        <BFormInput
            id="floatingEmail"
            size="lg"
            placeholder="Email or username"
            v-model="dto.emailOrUserName"
            required/>
      </BFormFloatingLabel>
      <BFormFloatingLabel
          label="Password"
          label-for="floatingPassword"
          class="my-2">
        <BFormInput
            id="floatingPassword"
            type="password"
            placeholder="Password"
            v-model="dto.password"
            required/>
      </BFormFloatingLabel>
      <BButtonGroup
          size="lg"
          class="mt-lg-auto">
        <BButton
            variant="primary"
            @click="signIn()">
          Login
        </BButton>
        <BButton
            variant="outline-secondary"
            @click="emit('switch')">
          Registration
        </BButton>
      </BButtonGroup>
    </BForm>
  </BCard>
</template>

<style scoped>

</style>