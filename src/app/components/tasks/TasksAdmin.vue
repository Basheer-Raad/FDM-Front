<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-vue-next";
import CreateEditDialogAdmin from "./CreateEditDialogAdmin.vue";
import { apiService } from "@/app/service/httpService/apiService";
import { Pencil } from "lucide-vue-next";

interface Todo {
  id: number;
  todo: string;
  completed: boolean;
  userId: number;
  status: string;
  customers: any;
  user: {
    id: number;
    name: string;
    email: string;
  };
  mediaPath: string;
}

const todoList = ref<Todo[]>([]);
const searchQuery = ref("");
const addTodoModal = ref(false);
const page = ref(1);

const tableHeader = [
  { label: "ID", value: "id", align: "left" },
  { label: "Todo", value: "todo", align: "left" },
  { label: "Customer", value: "customer", align: "left" },
  { label: "Status", value: "status", align: "left" },
  { label: "User", value: "user", align: "left" },
  // { label: "Media", value: "mediaPath", align: "left" },
];

const tableConfig = {
  page: 1,
  itemsPerPage: 10,
};

// Submitted state
const submitted = ref(false);

// Todo modal states
const dataEdit = ref(false);
const event = ref({
  id: 0,
  todo: "",
  completed: false,
  userId: 0,
  status: "pending",
  customer: [],
  mediaPath: "",
  service: "",
});

// Computed property for filtered and displayed lists
const displayedLists = computed(() => {
  if (!searchQuery.value) return todoList.value;

  const query = searchQuery.value.toLowerCase();
  return todoList.value.filter((todo) =>
    todo.todo.toLowerCase().includes(query)
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

const fetchTodos = async () => {
  try {
    const data = await apiService.get<Todo[]>("/tasks");
    todoList.value = data;
  } catch (error) {
    console.error("Error fetching todos:", error);
  }
};

onMounted(() => {
  fetchTodos();
});

const handleCreateModal = () => {
  event.value = {
    id: Math.floor(Math.random() * 9000000) + 1000000,
    todo: "",
    completed: false,
    userId: 1,
    status: "pending",
    customer: [],
    service: "",
    meters: [],
    description: "",
  };
  dataEdit.value = false;
  addTodoModal.value = true;
};

const handleEditModal = (task) => {
  event.value = {
    id: task.id,
    todo: task.todo,
    status: task.status,
    user_id: task.user_id || task.userId,
    customer: task.customer?.id || task.customer,
    mediaPath: task.mediaPath || "",
    service: task.service || "",
    meters: task.meters || [],
    description: task.description || "",
  };
  dataEdit.value = true;
  addTodoModal.value = true;
};

const handleTaskSubmit = async (result) => {
  if (result.success) {
    await fetchTodos();
  }
};
</script>

<template>
  <TCard id="todoTable">
    <div class="flex items-center gap-3 mb-4">
      <h6 class="text-15 grow">
        Tasks (<b>{{ todoList.length }}</b
        >)
      </h6>
      <div class="flex items-center gap-3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            class="form-input ltr:pl-8 rtl:pr-8 focus:z-10 dark:bg-zink-700 dark:border-zink-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            placeholder="Search tasksukFlag..."
          />
          <Search
            class="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200"
          />
        </div>
        <TButton @click="handleCreateModal">
          <Plus class="inline-block size-4" /> Add Task
        </TButton>
      </div>
    </div>

    <div class="overflow-x-auto">
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
            <!-- <th
              class="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500 text-center"
            >
              Actions
            </th> -->
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="'table-row-' + index"
            class="border-y border-slate-200 dark:border-zink-500"
          >
            <td
              v-for="(header, index) in tableHeader"
              :key="'basic-table-tr-' + index"
              class="px-3.5 py-2.5"
            >
              <template v-if="header.value === 'status'">
                <span
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium',
                    item[header.value] === 'completed'
                      ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                      : item[header.value] === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400'
                      : 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400',
                  ]"
                >
                  {{
                    item[header.value] === "completed"
                      ? "Completed"
                      : item[header.value] === "in_progress"
                      ? "In Progress"
                      : "Pending"
                  }}
                </span>
              </template>
              <template v-else-if="header.value === 'customer'">
                {{ item.customer?.customerName || "-" }}
              </template>
              <template v-else-if="header.value === 'user'">
                {{ item.user?.name || "-" }}
              </template>
              <!-- <template v-else-if="header.value === 'mediaPath'">
                <img :src="item.mediaPath" alt="Media" class="w-10 h-10 rounded-full" />
              </template> -->
              <template v-else>
                {{ item[header.value] }}
              </template>
            </td>
            <!-- <td class="px-3.5 py-2.5 text-center">
              <button
                @click="handleEditModal(item)"
                class="text-blue-500 hover:text-blue-700"
              >
                <Pencil class="inline-block size-4" />
              </button>
            </td> -->
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!displayedLists.length" class="noresult">
      <div class="py-6 text-center">
        <Search
          class="size-6 mx-auto mb-3 text-sky-500 fill-sky-100 dark:fill-sky-500/20"
        />
        <h5 class="mt-2 mb-1">Sorry! No Result Found</h5>
        <p class="mb-0 text-slate-500 dark:text-zink-200">
          We've searched but did not find any todos matching your search.
        </p>
      </div>
    </div>

    <div
      v-if="displayedLists.length"
      class="flex flex-col items-center mt-4 md:flex-row gap-4 px-4"
    >
      <div class="grow">
        <p class="text-slate-500 dark:text-zink-200">
          Showing <b class="showing">{{ getEndIndex }}</b> of
          <b class="total-records">{{ totalItems }}</b> Results
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
            Prev
          </template>
          <template #next>
            Next
            <ChevronRight class="size-4 ml-1 rtl:rotate-180" />
          </template>
        </TPagination>
      </div>
    </div>
  </TCard>
  <CreateEditDialogAdmin
    v-model="addTodoModal"
    :data-edit="dataEdit"
    :event="event"
    @handle-submit="handleTaskSubmit"
  />
</template>
