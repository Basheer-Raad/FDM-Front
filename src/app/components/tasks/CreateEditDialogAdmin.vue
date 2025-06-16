<script lang="ts" setup>
import { computed, ref, onMounted, watch, reactive } from "vue";
import { X } from "lucide-vue-next";
import { apiService } from "@/app/service/httpService/apiService";
import { useI18n } from "vue-i18n";

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

const { t } = useI18n();

const todoData = reactive({
  todo: props.event.todo || "",
  status: props.event.status || "pending",
  user_id: props.event.user_id || "",
  customer: props.event.customer || null,
  mediaPath: props.event.mediaPath || "",
  service: props.event.service || "",
  meters: props.event.meters || [],
  description: props.event.description || "",
});

watch(
  () => props.event,
  (newVal) => {
    let customerObj = newVal.customer;
    if (typeof customerObj === "number" || typeof customerObj === "string") {
      customerObj = customerList.value.find((c) => c.id == customerObj) || null;
    }
    Object.assign(todoData, {
      todo: newVal.todo || "",
      status: newVal.status || "pending",
      user_id: newVal.user_id || "",
      customer: customerObj,
      mediaPath: newVal.mediaPath || "",
      service: newVal.service !== undefined ? newVal.service : todoData.service,
      meters: newVal.meters || [],
      description: newVal.description || "",
    });
  },
  { immediate: true }
);

const statusOptions = [
  { label: t('pending'), value: 'pending' },
  { label: t('in-progress'), value: 'in_progress' },
  { label: t('completed'), value: 'completed' },
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
  if (!todoData.customer || todoData.todo !== "repair_meter") {
    return [];
  }
  console.log(todoData.customer.infoMeterList);
  return todoData.customer.infoMeterList || [];
});

const isMeterEnabled = computed(() => {
  return todoData.todo === "repair_meter";
});

const isServiceEnabled = computed(() => {
  return todoData.todo === "repair_meter";
});

const fetchUsers = async () => {
  try {
    const data = await apiService.get("/users");
    userList.value = data as { id: number; name: string }[];
  } catch (error) {
    console.error("Error fetching users:", error);
  }
};

const fetchCustomers = async () => {
  try {
    const response = await apiService.get("/getCustomers");
    const data = Array.isArray((response as any).data)
      ? (response as any).data
      : (response as any).data?.data || [];
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
  // log the selected service
  console.log("Selected service:", data.service);
  try {
    const submitData = {
      ...data,
      meters: data.todo === "install_meter" ? [] : data.meters,
      service: isServiceEnabled.value ? data.service : null,
    };
    console.log("Submitting data:", submitData);

    if (props.dataEdit) {
      await apiService.put(`/tasks/${props.event.id}`, submitData);
    } else {
      await apiService.post("/tasks", submitData);
      console.log("Created task:", submitData);
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

const meterInstallOptions = ref<any[]>([]);

const fetchInstallMeterOptions = async () => {
  try {
    const response = await apiService.get("meter/findNoInstallPage");
    const data = (response as any).data?.content || [];
    console.log("Install meter API response:", data);
    meterInstallOptions.value = data;
  } catch (error) {
    console.error("Error fetching install meter options:", error);
    meterInstallOptions.value = [];
  }
};

onMounted(() => {
  fetchUsers();
  fetchCustomers();
  fetchInstallMeterOptions();
});
</script>
<template>
  <TModal v-model="showModal">
    <template #content>
      <div
        class="flex items-center justify-between p-4 border-b dark:border-zink-500"
      >
        <h5 class="text-16" id="addTodoLabel">
          {{ props.dataEdit ? t('t-edit-todo') : t('t-create-todo') }}
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
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-todo') }}</label>
              <select
                v-model="todoData.todo"
                required
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option value="install_meter">Install Meter</option>
                <option value="repair_meter">Repair Meter</option>
              </select>
            </div>
            <div class="xl:col-span-12" v-if="isServiceEnabled">
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-service') }}</label>
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
              <label class="block mb-2 text-base font-medium">{{ t('t-description') }}</label>
              <textarea
                v-model="todoData.description"
                class="block w-full form-textarea border-slate-200 p-2 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100 mb-2"
                rows="3"
                :placeholder="t('t-enter-task-description')"
              ></textarea>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-status') }}</label>
              <select
                v-model="todoData.status"
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option v-for="option in statusOptions" :key="option.value" :value="option.value">
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-user') }}</label>
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
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-customer') }}</label>
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
              <label class="inline-block mb-2 text-base font-medium">{{ t('t-meter') }}</label>
              <select
                v-model="todoData.meters"
                :disabled="!isMeterEnabled"
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
                :class="{ 'bg-gray-100': !isMeterEnabled }"
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
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton
              variant="ghost"
              color="red"
              id="close-modal"
              @click="showModal = false"
            >
              {{ t('t-cancel') }}
            </TButton>
            <TButton type="button" @click.prevent="handleSubmit(todoData)">
              {{ props.dataEdit ? t('t-save') : t('t-create-todo') }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
