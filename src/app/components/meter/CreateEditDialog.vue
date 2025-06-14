<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { X } from "lucide-vue-next";

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
      id: "",
      type: "",
      serial_number: "",
      customer_id: 1,
      location: "",
      status: "active",
      installed_at: new Date().toISOString().split("T")[0],
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

const meterData = ref({ ...props.event });

watch(
  () => props.event,
  (val) => {
    meterData.value = { ...val };
  }
);
</script>

<template>
  <TModal v-model="showModal">
    <template #content>
      <div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
        <h5 class="text-16">
          {{ props.dataEdit ? "Edit Meter" : "Add Meter" }}
        </h5>
        <button
          @click="showModal = false"
          class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <X class="size-5" />
        </button>
      </div>
      <div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
        <form
          @submit.prevent="emit('handleSubmit', meterData)"
          class="create-form"
          id="create-form"
        >
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div class="xl:col-span-12">
              <TInputField
                id="meterId"
                disabled
                label="ID"
                :modelValue="meterData.id ? '#' + meterData.id : 'Auto'"
                hide-details
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Type"
                placeholder="Enter meter type"
                v-model="meterData.type"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Serial Number"
                placeholder="Enter serial number"
                v-model="meterData.serial_number"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Customer ID"
                type="number"
                v-model="meterData.customer_id"
                placeholder="Enter customer ID"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Location"
                placeholder="Enter location"
                v-model="meterData.location"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">Status</label>
              <select
                v-model="meterData.status"
                class="form-select border-slate-200 dark:border-zink-500 focus:outline-none focus:border-custom-500 dark:bg-zink-700 dark:text-zink-100"
              >
                <option value="active">Active</option>
                <option value="inactive">Inactive</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="Installation Date"
                type="date"
                v-model="meterData.installed_at"
                hide-details
                required
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton variant="ghost" color="red" @click="showModal = false">
              Cancel
            </TButton>
            <TButton type="submit">
              {{ props.dataEdit ? "Save" : "Add Meter" }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
