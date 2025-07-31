<script setup lang="ts">
import {BButton, BButtonGroup, BCard, BForm, BFormFloatingLabel, BFormInput} from "bootstrap-vue-next";
import {ref} from "vue";
import type {RegistrationDto} from "../dto/RegistrationDto.ts";
import {apiClient} from "../services/apiClient.ts";
import router from "../router/router.ts";
import {useJwtStore} from "../stores/JwtStore.ts";

const emit = defineEmits(['switch']);

const jwtStore = useJwtStore();
const dto = ref<RegistrationDto>({
  firstName: '',
  lastName: '',
  email: '',
  userName: '',
  password: '',
})

async function signUp() {
  try {
    const response = await apiClient.post<string>('sign-up', dto.value);

    if (response.status === 200) {
      jwtStore.setToken(response.data);
      await router.push('/users')
    }
  } catch (error) {
    alert("Registration failure");
    console.error('Registration error:', error);
  }
}
</script>

<template>
  <BCard
      title="Registration form"
      tag="form"
      style="max-width: 25rem">
    <BForm>
      <BFormFloatingLabel
          label="First name"
          label-for="floatingFirstName"
          class="my-2">
        <BFormInput
            id="floatingFirstName"
            size="lg"
            placeholder="First name"
            v-model="dto.firstName"
            required/>
      </BFormFloatingLabel>
      <BFormFloatingLabel
          label="Last name"
          label-for="floatingLastName"
          class="my-2">
        <BFormInput
            id="floatingLastName"
            size="lg"
            placeholder="Last name"
            v-model="dto.lastName"
            required/>
      </BFormFloatingLabel>
      <BFormFloatingLabel
          label="Username"
          label-for="floatingUsername"
          class="my-2">
        <BFormInput
            id="floatingUsername"
            size="lg"
            placeholder="Username"
            v-model="dto.userName"
            required/>
      </BFormFloatingLabel>
      <BFormFloatingLabel
          label="Email"
          label-for="floatingEmail"
          class="my-2">
        <BFormInput
            id="floatingEmail"
            size="lg"
            type="email"
            placeholder="Email"
            v-model="dto.email"
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
            type="submit"
            variant="primary"
            @click="signUp()">
          Register
        </BButton>
        <BButton
            variant="outline-secondary"
            @click="emit('switch')">
          Login
        </BButton>
      </BButtonGroup>
    </BForm>
  </BCard>
</template>

<style scoped>

</style>
