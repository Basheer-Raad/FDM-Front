<script lang="ts" setup>
import { computed, ref, onMounted, watch } from "vue";
import { X } from "lucide-vue-next";
import { apiService } from "@/app/service/httpService/apiService";

const emit = defineEmits(["update:modelValue", "handleSubmit"]);

const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  dataEdit: {
    type: Boolean,
    default: false,
  },
  event: {
    type: Object,
    default: () => ({  todo: "", status: "pending", user_id: "", customers: null }),
  },
});

const showModal = computed({
  get() {
    return props.modelValue;
  },
  set(newVal) {
    emit("update:modelValue", newVal);
  },
});

const todoData = ref({ ...props.event, customers: props.event.customers || null });

watch(
  () => props.event,
  (newVal) => {
    // If customers is an id, map to full object from customerList
    let customerObj = newVal.customers;
    if (typeof customerObj === 'number' || typeof customerObj === 'string') {
      customerObj = customerList.value.find(c => c.id == customerObj) || null;
    }
    todoData.value = { ...newVal, customers: customerObj };
  },
  { immediate: true }
);

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

const userList = ref<{ id: number; name: string }[]>([]);
const customerList = ref<any[]>([]);

const fetchUsers = async () => {
  try {
    const data = await apiService.get("/users");
    userList.value = data;
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchCustomers = async () => {
  try {
    const response = await apiService.get('/getCustomers');
    const data = Array.isArray(response.data) ? response.data : response.data?.data || [];
    customerList.value = data;
  } catch (error) {
    console.error("Error fetching customers:", error);
  }
};

onMounted(() => {
  fetchUsers();
  fetchCustomers();
});

const handleSubmit = async (data: any) => {
  try {
    if (props.dataEdit) {
      // Edit existing task
      await apiService.put(`/tasks/${props.event.id}`, data);
    } else {
      // Create new task
      await apiService.post("/tasks", data);
    }
    
    // Close modal and emit success event
    emit("update:modelValue", false);
    emit("handleSubmit", { success: true, action: props.dataEdit ? 'edit' : 'create' });
  } catch (error) {
    console.error(`Error ${props.dataEdit ? 'updating' : 'creating'} todo:`, error);
    emit("handleSubmit", { success: false, error });
  }
};
</script>
<template>
  <TModal v-model="showModal">
    <template #content>
      <div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
        <h5 class="text-16" id="addTodoLabel">
          {{ props.dataEdit ? "Edit Todo" : "Create Todo" }}
        </h5>
        <button
          @click="showModal = false"
          id="addTodo"
          class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <X class="size-5" />
        </button>
      </div>
      <div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
        <form
         
          class="create-form"
          id="create-form"
        >
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
           
            <div class="xl:col-span-12">
              <TInputField
                label="Todo"
                placeholder="Enter todo"
                v-model="todoData.todo"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">Status</label>
              <select
                v-model="todoData.status"
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option value="pending">Pending</option>
                <option value="in_progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
              
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">User</label>
              <select
                v-model="todoData.user_id"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option v-for="user in userList" :key="user.id" :value="user.id">
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">Customer</label>
              <select
                v-model="todoData.customers"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option v-for="customer in customerList" :key="customer.id" :value="customer">
                  {{ customer.customerName }}
                </option>
              </select>
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton
              variant="ghost"
              color="red"
              id="close-modal"
              @click="showModal = false"
            >
              Cancel
            </TButton>
            <TButton type="submit" @click="handleSubmit(todoData)">
              {{ props.dataEdit ? "Save" : "Create Todo" }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
