<script lang="ts" setup>
import { computed, ref } from "vue";
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
    default: () => ({ id: "", todo: "", completed: false, userId: "" }),
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

const todoData = ref({ ...props.event });
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
          @submit.prevent="emit('handleSubmit', todoData)"
          class="create-form"
          id="create-form"
        >
          <div class="grid grid-cols-1 gap-4 xl:grid-cols-12">
            <div class="xl:col-span-12">
              <TInputField
                id="todoId"
                disabled
                label="ID"
                :modelValue="todoData.id ? '#' + todoData.id : 'Auto'"
                hide-details
              />
            </div>
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
              <TSwitch
                v-model="todoData.completed"
                :true-value="true"
                :false-value="false"
                label="Completed"
                class="mb-2"
              />
              <span class="text-xs text-slate-500">{{
                todoData.completed ? "Completed" : "Pending"
              }}</span>
            </div>
            <div class="xl:col-span-12">
              <TInputField
                label="User ID"
                type="number"
                v-model="todoData.userId"
                placeholder="Enter user ID"
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
              Cancel
            </TButton>
            <TButton type="submit">
              {{ props.dataEdit ? "Save" : "Create Todo" }}
            </TButton>
          </div>
        </form>
      </div>
    </template>
  </TModal>
</template>
