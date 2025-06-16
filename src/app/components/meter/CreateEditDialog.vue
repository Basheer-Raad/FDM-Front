<script lang="ts" setup>
import { computed, ref, watch } from "vue";
import { X } from "lucide-vue-next";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

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
          {{ props.dataEdit ? t('m-edit-meter') : t('m-add-meter') }}
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
                :label="t('m-id')"
                :modelValue="meterData.id ? '#' + meterData.id : t('m-auto')"
                hide-details
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                :label="t('m-type')"
                :placeholder="t('m-enter-meter-type')"
                v-model="meterData.type"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                :label="t('m-serial-number')"
                :placeholder="t('m-enter-serial-number')"
                v-model="meterData.serial_number"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                :label="t('m-customer-id')"
                type="number"
                v-model="meterData.customer_id"
                :placeholder="t('m-enter-customer-id')"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                :label="t('m-location')"
                :placeholder="t('m-enter-location')"
                v-model="meterData.location"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <label class="inline-block mb-2 text-base font-medium">{{ t('m-status') }}</label>
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
                :label="t('m-installation-date')"
                type="date"
                v-model="meterData.installed_at"
                hide-details
                required
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton variant="ghost" color="red" @click="showModal = false">
              {{ t('m-cancel') }}
            </TButton>
            <TButton type="submit">
              {{ props.dataEdit ? t('m-save') : t('m-add-meter') }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
