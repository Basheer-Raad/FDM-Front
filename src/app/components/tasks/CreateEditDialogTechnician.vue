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
    default: () => ({
      todo: "",
      status: "pending",
      user_id: "",
      customer: null,
      mediaPath: "",
      service: "",
    }),
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

const todoData = ref({
  ...props.event,
  customer: props.event.customer || null,
  mediaPath: props.event.mediaPath || "",
  service: props.event.service || "",
});

const selectedFile = ref<File | null>(null);

watch(
  () => props.event,
  (newVal) => {
    let customerObj = newVal.customer;
    if (typeof customerObj === "number" || typeof customerObj === "string") {
      customerObj = customerList.value.find((c) => c.id == customerObj) || null;
    }
    todoData.value = {
      ...newVal,
      customer: customerObj,
      service: newVal.service || "",
    };
  },
  { immediate: true }
);

const statusOptions = [
  { label: "Pending", value: "pending" },
  { label: "In Progress", value: "in_progress" },
  { label: "Completed", value: "completed" },
];

const serviceOptions = [
  { value: "replace_display", label: "Replace Display" },
  { value: "fix_power_issue", label: "Fix Power Issue" },
  { value: "reset_connection", label: "Reset Connection" },
  { value: "calibration_check", label: "Calibration Check" },
  { value: "replace_battery", label: "Replace Battery" },
  { value: "software_update", label: "Software Update" },
  { value: "change_location", label: "Change Location" },
];

const userList = ref<{ id: number; name: string }[]>([]);
const customerList = ref<any[]>([]);

const meterOptions = computed(() => {
  if (todoData.value.todo === "install_meter") {
    // For install_meter, fetch from API (handled below)
    return meterInstallOptions.value;
  }
  if (!todoData.value.customer || todoData.value.todo !== "repair_meter") {
    return [];
  }
  return todoData.value.customer.infoMeterList || [];
});

const meterInstallOptions = ref<any[]>([]);

watch(
  () => todoData.value.todo,
  async (newVal) => {
    if (newVal === "install_meter") {
      try {
        const response = await apiService.get("meter/findNoInstallPage");
        console.log("Install meter API response:", response.data.content);
        meterInstallOptions.value = response.data.content || [];
      } catch (error) {
        console.error("Error fetching install meter options:", error);
        meterInstallOptions.value = [];
      }
    }
  },
  { immediate: true }
);

const isMeterEnabled = computed(() => {
  return todoData.value.todo === "repair_meter";
});

const isServiceEnabled = computed(() => {
  return todoData.value.todo === "repair_meter";
});

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
    const response = await apiService.get("/getCustomers");
    const data = Array.isArray(response.data)
      ? response.data
      : response.data?.data || [];
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
    const submitData = {
      ...data,
      meters: data.todo === "install_meter" ? [] : data.meters,
      media: selectedFile.value,
    };
    console.log(submitData);

    if (props.dataEdit) {
      // Edit existing task
      await apiService.put(`/tasks/${props.event.id}`, submitData);
    } else {
      // Create new task
      await apiService.post("/tasks", submitData);
    }

    // Close modal and emit success event
    emit("update:modelValue", false);
    emit("handleSubmit", {
      success: true,
      action: props.dataEdit ? "edit" : "create",
    });
  } catch (error) {
    console.error(
      `Error ${props.dataEdit ? "updating" : "creating"} todo:`,
      error
    );
    emit("handleSubmit", { success: false, error });
  }
};

const handleFileChange = (event: Event) => {
  const target = event.target as HTMLInputElement;
  if (target.files && target.files.length > 0) {
    selectedFile.value = target.files[0];
    // Log available file info
    console.log("File name:", selectedFile.value.name);
    console.log("File type:", selectedFile.value.type);
    console.log("File size:", selectedFile.value.size);
    console.log("webkitRelativePath:", selectedFile.value.webkitRelativePath); // usually empty
  }
};
</script>
<template>
  <TModal v-model="showModal">
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b dark:border-zink-500"
      >
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
      <div
        class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto"
      >
        <form @submit.prevent class="create-form" id="create-form">
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium"
                >Todo</label
              >
              <select
                v-model="todoData.todo"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option value="install_meter">Install Meter</option>
                <option value="repair_meter">Repair Meter</option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="block mb-2 text-base font-medium"
                >Description (Optional)</label
              >
              <textarea
                v-model="todoData.description"
                class="block w-full form-textarea border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100 mb-2"
                rows="3"
                placeholder="Enter task description..."
              ></textarea>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium"
                >Status</label
              >
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
              <label class="inline-block mb-2 text-base font-medium"
                >User</label
              >
              <select
                v-model="todoData.user_id"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option
                  v-for="user in userList"
                  :key="user.id"
                  :value="user.id"
                >
                  {{ user.name }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium"
                >Customer</label
              >
              <select
                v-model="todoData.customer"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option
                  v-for="customer in customerList"
                  :key="customer.id"
                  :value="customer"
                >
                  {{ customer.customerName }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium"
                >Meter</label
              >
              <select
                v-model="todoData.meters"
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option
                  v-for="meter in meterOptions"
                  :key="meter.id"
                  :value="meter"
                >
                  {{ meter.meterNo }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12" v-if="isServiceEnabled">
              <label class="inline-block mb-2 text-base font-medium"
                >Service</label
              >
              <select
                v-model="todoData.service"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option
                  v-for="service in serviceOptions"
                  :key="service.value"
                  :value="service.value"
                >
                  {{ service.label }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium"
                >Media</label
              >
              <input type="file" @change="handleFileChange" />
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
            <TButton type="button" @click.prevent="handleSubmit(todoData)">
              {{ props.dataEdit ? "Save" : "Create Todo" }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
