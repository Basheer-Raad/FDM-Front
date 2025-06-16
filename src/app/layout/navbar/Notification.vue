<script lang="ts" setup>
import NavBtn from "@/app/layout/navbar/Button.vue";
import { BellRing } from "lucide-vue-next";
import { notificationData } from "@/app/layout/navbar/utils.ts";
import { computed } from "vue";

const getParsedData = computed(() => notificationData);
</script>
<template>
  <TMenu>
    <NavBtn class="dropdown">
      <BellRing
        class="inline-block size-5 stroke-1 fill-slate-100 group-data-[topbar=dark]:fill-topbar-item-bg-hover-dark group-data-[topbar=brand]:fill-topbar-item-bg-hover-brand"
      />
      <span class="absolute top-0 right-0 flex w-1.5 h-1.5">
        <span
          class="absolute inline-flex w-full h-full rounded-full opacity-75 animate-ping bg-sky-400"
        />
        <span
          class="relative inline-flex w-1.5 h-1.5 rounded-full bg-sky-500"
        />
      </span>
    </NavBtn>
    <template #content>
      <div class="min-w-[16rem] lg:min-w-[18rem] pb-4">
        <div class="p-4">
          <h6 class="mb-4 text-16">Notifications</h6>
        </div>
        <simplebar class="max-h-[350px]">
          <div class="flex flex-col gap-1">
            <div v-if="getParsedData.length === 0" class="p-4 text-center text-slate-500 dark:text-zink-300">
              No notifications
            </div>
          
          </div>
        </simplebar>
      </div>
    </template>
  </TMenu>
</template>
