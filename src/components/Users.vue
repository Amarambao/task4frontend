<script setup lang="ts">
import type {AppUserGetDto} from "../dto/AppUserGetDto.ts";
import {computed, onMounted, ref} from "vue";
import {apiClient} from "../services/apiClient.ts";
import {
  BButton, BButtonGroup, BFormCheckbox, BFormInput,
  BTable, type BTableSortBy, type TableFieldRaw
} from 'bootstrap-vue-next'
import type {ChangeUsersStatusDto} from "../dto/ChangeUsersStatusDto.ts";
import {DateFormatter} from "../services/dateFormatter.ts";
import router from "../router/router.ts";
import {useJwtStore} from "../stores/JwtStore.ts";

onMounted(async () => {
  await loadUsers();
});

const jwtStore = useJwtStore();
const dateFormater = new DateFormatter();
const dto = ref<ChangeUsersStatusDto>({
  requestedStatus: false,
  userIds: [],
});
const users = ref<AppUserGetDto[]>([]);
const fields: TableFieldRaw<AppUserGetDto>[] = [
  {
    key: 'selected',
    label: 'Select',
    sortable: true,
    tdClass: 'text-center'
  },
  {
    key: 'isBlocked',
    label: 'Status',
    sortable: true,
    formatter: (value) => value ? 'Blocked' : 'Active',
  },
  {
    key: 'name',
    label: 'Full Name',
    sortable: false,
  },
  {
    key: 'email',
    label: 'Email',
    sortable: true,
  },
  {
    key: "lastLoginTime",
    label: "Last Login",
    sortable: true
  }];
const multiSortBy = ref<BTableSortBy[]>([
  {key: 'isBlocked', order: 'asc'},
  {key: 'lastLoginTime', order: 'desc'},
])
const searchValue = ref<string>("");
const filteredUsers = computed(() => {
  const search = searchValue.value.toLowerCase();
  return users.value.filter((z) => z.name.toLowerCase().includes(search) || z.email.toLowerCase().includes(search) || z.userName.toLowerCase().includes(search));
});

function isSelected(id: string) {
  return dto.value.userIds.includes(id)
}

function toggleSelection(id: string) {
  if (isSelected(id)) {
    dto.value.userIds = dto.value.userIds.filter(userId => userId !== id)
  } else {
    dto.value.userIds = [...dto.value.userIds, id]
  }
}

async function loadUsers() {
  try {
    const response = await apiClient.get<AppUserGetDto[]>('get-all', null);

    if (response.data) {
      users.value = response.data;
    }
  } catch (error) {
    alert("Users loading error");
    console.error('Users loading error:', error);
    jwtStore.clearToken();
    await router.push('/');
  }
}

async function changeUsersStatus(requestedStatus: boolean) {
  dto.value.requestedStatus = requestedStatus
  try {
    await apiClient.post('change-users-status', dto.value);

    await loadUsers();

    dto.value.userIds = [];
  } catch (error) {
    alert("Users changing status error");
    console.error('Users changing status error:', error);
    jwtStore.clearToken();
    await router.push('/');
  }
}

async function deleteUsers() {
  try {
    await apiClient.delete('delete-selected', {
      userIds: dto.value.userIds
    });

    await loadUsers();

    dto.value.userIds = [];
  } catch (error) {
    alert("Users deletion error");
    console.error('Users deletion error:', error);
    jwtStore.clearToken();
    await router.push('/');
  }
}
</script>

<template>
  <div class="container-fluid">
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="btn-group me-2">
        <BButtonGroup
            size="lg"
            class="mt-lg-auto">
          <BButton
              variant="outline-primary"
              @click="changeUsersStatus(true)">
            <i class="bi bi-lock-fill"></i>
          </BButton>
          <BButton
              variant="outline-primary"
              @click="changeUsersStatus(false)">
            <i class="bi bi-unlock-fill"></i>
          </BButton>
          <BButton
              variant="outline-danger"
              @click="deleteUsers()">
            <i class="bi bi-trash3-fill"></i>
          </BButton>
        </BButtonGroup>
      </div>
      <BFormInput
          id="floatingSearch"
          size="lg"
          type="search"
          placeholder="Search"
          v-model="searchValue"/>
    </nav>
    <BTable
        v-model:sort-by="multiSortBy"
        hover
        sticky-header="18%"
        :items="filteredUsers"
        :fields="fields">
      <template #cell(selected)="row">
        <BFormCheckbox
            :checked="isSelected(row.item.id)"
            @change="toggleSelection(row.item.id)"
            @click.stop/>
      </template>
      <template #cell(lastLoginTime)="date">
        {{ dateFormater.format(date.value) }}
      </template>
      <template #cell(name)="{ item, value }">
      <span :class="{ 'text-decoration-line-through': item.isBlocked }">
        {{ value }}
      </span>
      </template>
    </BTable>
  </div>
</template>

<style scoped>

</style>