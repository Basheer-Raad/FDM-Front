<script lang="ts" setup>
import { computed, ref } from "vue";
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
      id: 0,
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      age: 0,
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

const employeeData = ref({ ...props.event });
</script>

<template>
  <TModal v-model="showModal">
    <template #content>
      <div class="flex items-center justify-between p-4 border-b dark:border-zink-500">
        <h5 class="text-16" id="addEmployeeLabel">
          {{ props.dataEdit ? t('e-edit-employee') : t('e-create-employee') }}
        </h5>
        <button
          @click="showModal = false"
          id="addEmployee"
          class="transition-all duration-200 ease-linear text-slate-400 hover:text-red-500"
        >
          <X class="size-5" />
        </button>
      </div>
      <div class="max-h-[calc(theme('height.screen')_-_180px)] p-4 overflow-y-auto">
        <form
          @submit.prevent="emit('handleSubmit', employeeData)"
          class="create-form"
          id="create-form"
        >
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div class="xl:col-span-12">
              <TInputField
                id="employeeId"
                disabled
                :label="t('e-id')"
                :modelValue="employeeData.id ? '#' + employeeData.id : t('e-auto')"
                hide-details
              />
            </div>
            <div class="xl:col-span-6">
              <TInputField
                :label="t('e-first-name')"
                :placeholder="t('e-enter-first-name')"
                v-model="employeeData.firstName"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-6">
              <TInputField
                :label="t('e-last-name')"
                :placeholder="t('e-enter-last-name')"
                v-model="employeeData.lastName"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-12">
              <TInputField
                :label="t('e-email')"
                type="email"
                v-model="employeeData.email"
                :placeholder="t('e-enter-email')"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-6">
              <TInputField
                :label="t('e-phone')"
                v-model="employeeData.phone"
                :placeholder="t('e-enter-phone')"
                hide-details
                required
              />
            </div>
            <div class="xl:col-span-6">
              <TInputField
                :label="t('e-age')"
                type="number"
                v-model="employeeData.age"
                :placeholder="t('e-enter-age')"
                hide-details
                required
              />
            </div>
          </div>
          <div class="flex justify-end gap-2 mt-4">
            <TButton
              variant="ghost"
              color="red"
              id="close-modal"
              @click="showModal = false"
            >
              {{ t('e-cancel') }}
            </TButton>
            <TButton type="submit">
              {{ props.dataEdit ? t('e-save') : t('e-create-employee') }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
