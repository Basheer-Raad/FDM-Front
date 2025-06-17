<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-vue-next";
import CreateEditDialog from "./CreateEditDialog.vue";
import { apiService } from "@/app/service/httpService/apiService";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface User {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  age: number;
}

const userList = ref<User[]>([]);
const searchQuery = ref("");
const addUserModal = ref(false);
const page = ref(1);
const loading = ref(false);

const tableHeader = [
  { label: t("e-id"), value: "id", align: "left" },
  { label: t("e-name"), value: "name", align: "left" },
  { label: t("e-email"), value: "email", align: "left" },
  { label: t("e-created-at"), value: "created_at", align: "left" },
];

const tableConfig = {
  page: 1,
  itemsPerPage: 10,
};

// Submitted state
const submitted = ref(false);

// User modal states
const dataEdit = ref(false);
const event = ref({
  id: 0,
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  age: 0,
});

// Computed property for filtered and displayed lists
const displayedLists = computed(() => {
  if (!searchQuery.value) return userList.value;

  const query = searchQuery.value.toLowerCase();
  return userList.value.filter(
    (user) =>
      `${user.firstName} ${user.lastName}`.toLowerCase().includes(query) ||
      user.email.toLowerCase().includes(query)
  );
});

// Pagination computed properties
const totalItems = computed(() => displayedLists.value.length);

const getTotalPages = computed(() => {
  return Math.ceil(totalItems.value / tableConfig.itemsPerPage);
});

const getStartIndex = computed(() => {
  return (page.value - 1) * tableConfig.itemsPerPage;
});

const getEndIndex = computed(() => {
  return Math.min(
    getStartIndex.value + tableConfig.itemsPerPage,
    totalItems.value
  );
});

const paginatedData = computed(() => {
  return displayedLists.value.slice(getStartIndex.value, getEndIndex.value);
});

const fetchUsers = async () => {
  loading.value = true;
  try {
    const data = await apiService.get<User[]>("/users");
    userList.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  } finally {
    loading.value = false;
  }
};

const createUser = async (user: User) => {
  try {
    const newUser = await apiService.post<User>("/users", user);
    userList.value.unshift(newUser);
    addUserModal.value = false;
  } catch (error) {
    console.error("Error creating user:", error);
  }
};

const updateUser = async (user: User) => {
  try {
    const updatedUser = await apiService.put<User>(`/users/${user.id}`, user);
    const index = userList.value.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      userList.value[index] = updatedUser;
    }
  } catch (error) {
    console.error("Error updating user:", error);
  }
};

const deleteUser = async (id: number) => {
  try {
    await apiService.delete(`/users/${id}`);
    userList.value = userList.value.filter((user) => user.id !== id);
  } catch (error) {
    console.error("Error deleting user:", error);
  }
};

onMounted(() => {
  fetchUsers();
});

const handleCreateModal = () => {
  event.value = {
    id: Math.floor(Math.random() * 9000000) + 1000000,
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    age: 0,
  };
  addUserModal.value = true;
};
</script>

<template>
  <TCard id="userTable" class="mt-8">
    <div class="flex items-center gap-3 mb-4">
      <h6 class="text-15 grow">
        {{ t('e-employees') }} (<b>{{ userList.length }}</b>)
      </h6>
      <div class="flex items-center gap-3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            class="form-input ltr:pl-8 rtl:pr-8 focus:z-10 dark:bg-zink-700 dark:border-zink-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            :placeholder="t('e-search-employees')"
          />
          <Search
            class="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200"
          />
        </div>
        <TButton @click="handleCreateModal">
          <Plus class="inline-block size-4" /> {{ t('e-add-employee') }}
        </TButton>
      </div>
    </div>

    <div v-if="loading" class="text-center py-4">
      <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-primary mx-auto"></div>
      <p class="mt-2 text-slate-500">{{ t('e-loading-employees') }}</p>
    </div>

    <div v-else class="overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="bg-slate-100 dark:bg-zink-600">
            <th
              v-for="(item, index) in tableHeader"
              :key="'table-header-' + index"
              class="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
            >
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="'table-row-' + index"
            class="border-y border-slate-200 dark:border-zink-500"
          >
            <td class="px-3.5 py-2.5">{{ item.id }}</td>
            <td class="px-3.5 py-2.5">
              {{ `${item.name}` }}
            </td>
            <td class="px-3.5 py-2.5">{{ item.email }}</td>
            <td class="px-3.5 py-2.5">{{ item.created_at }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!displayedLists.length" class="noresult">
      <div class="py-6 text-center">
        <Search
          class="size-6 mx-auto mb-3 text-sky-500 fill-sky-100 dark:fill-sky-500/20"
        />
        <h5 class="mt-2 mb-1">{{ t('e-no-result-found') }}</h5>
        <p class="mb-0 text-slate-500 dark:text-zink-200">
          {{ t('e-no-employees-match') }}
        </p>
      </div>
    </div>

    <div
      v-if="displayedLists.length"
      class="flex flex-col items-center mt-4 md:flex-row gap-4 px-4"
    >
      <div class="grow">
        <p class="text-slate-500 dark:text-zink-200">
          {{ t('e-showing') }} <b class="showing">{{ getEndIndex }}</b> {{ t('e-of') }}
          <b class="total-records">{{ totalItems }}</b> {{ t('e-results') }}
        </p>
      </div>

      <div class="col-sm-auto mt-sm-0">
        <TPagination
          v-model="page"
          :totalPages="getTotalPages"
          pageClass="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
          actionClass="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
        >
          <template #prev>
            <ChevronLeft class="size-4 mr-1 rtl:rotate-180" />
            {{ t('e-prev') }}
          </template>
          <template #next>
            {{ t('e-next') }}
            <ChevronRight class="size-4 ml-1 rtl:rotate-180" />
          </template>
        </TPagination>
      </div>
    </div>
  </TCard>
  <CreateEditDialog 
    v-model="addUserModal" 
    :user="event"
    @save="createUser"
  />
</template>
