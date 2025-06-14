<script lang="ts" setup>
import { ref, computed } from "vue";
import { X } from "lucide-vue-next";

const emit = defineEmits([
  "update:modelValue",
  "handleSubmit",
  "update:showModal",
  "statusChanged",
]);

const props = defineProps({
  showModal: Boolean,
  currentStatus: String,
  meterId: Number,
  title: {
    type: String,
    default: "Change Meter Status",
  },
});

const modalVisible = computed({
  get() {
    return props.showModal;
  },
  set(val) {
    emit("update:showModal", val);
  },
});

const status = ref(props.currentStatus || "");
const reason = ref("");
const changedBy = ref("");
const dateOfChange = ref(new Date().toISOString().split("T")[0]);
const comments = ref("");
const approvalRequired = ref(false);
const referenceNumber = ref("");

const statusOptions = [
  { value: "active", label: "Active" },
  { value: "inactive", label: "Inactive" },
  { value: "maintenance", label: "Maintenance" },
];

const handleSubmit = () => {
  emit("statusChanged", {
    id: props.meterId,
    status: status.value,
    reason: reason.value,
    changedBy: changedBy.value,
    dateOfChange: dateOfChange.value,
    previousStatus: props.currentStatus,
    comments: comments.value,
    approvalRequired: approvalRequired.value,
    referenceNumber: referenceNumber.value,
  });
  emit("update:showModal", false);
};
</script>

<template>
  <TModal v-model="modalVisible">
    <template #content>
      <div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
        <h5 class="text-16">{{ props.title }}</h5>
        <button
          @click="modalVisible = false"
          class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <X class="size-5" />
        </button>
      </div>
      <div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
        <form @submit.prevent="handleSubmit" class="create-form">
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div class="xl:col-span-12">
              <TInputField
                label="Reason for Change"
                v-model="reason"
                placeholder="Enter reason"
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Changed By"
                v-model="changedBy"
                placeholder="Enter name"
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField label="Date of Change" v-model="dateOfChange" type="date" />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Previous Status"
                :modelValue="props.currentStatus"
                disabled
              />
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">New Status</label>
              <select
                v-model="status"
                class="form-select w-full dark:bg-zink-700 dark:text-zink-100"
              >
                <option
                  v-for="option in statusOptions"
                  :key="option.value"
                  :value="option.value"
                >
                  {{ option.label }}
                </option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Comments"
                v-model="comments"
                type="textarea"
                placeholder="Enter comments"
              />
            </div>
            <div class="xl:col-span-12 flex items-center gap-2">
              <input
                v-model="approvalRequired"
                type="checkbox"
                id="approvalRequired"
                class="dark:bg-zink-700"
              />
              <label for="approvalRequired" class="text-base font-medium"
                >Approval Required</label
              >
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Reference Number"
                v-model="referenceNumber"
                placeholder="Enter reference number"
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton variant="ghost" color="red" @click="modalVisible = false">
              Cancel
            </TButton>
            <TButton type="submit">Save Changes</TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
