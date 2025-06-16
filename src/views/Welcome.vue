<script lang="ts" setup>
import { onMounted } from "vue";
import { fakeBackendService } from "@/app/service/httpService/httpServiceProvider.ts";
import { useI18n } from "vue-i18n";

const user = fakeBackendService.getUser();
const { t } = useI18n();
</script>
<template>
  <div class="p-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-custom-500 dark:text-custom-500 mb-4">
        {{ t('welcome-title') }}
      </h1>
      <p class="text-slate-500 dark:text-zink-200 text-lg mb-6">
        {{ t('welcome-greeting', { username: user.username }) }}
      </p>
      <div class="bg-white dark:bg-zink-600 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold mb-4">{{ t('welcome-getting-started') }}</h2>
        <p class="text-slate-500 dark:text-zink-200 mb-4">
          {{ t('welcome-quick-links') }}
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link
            to="/tasks"
            class="p-4 bg-slate-50 dark:bg-zink-500 rounded-lg hover:bg-slate-100 dark:hover:bg-zink-400 transition-colors"
          >
            <h3 class="font-medium mb-2">{{ t('welcome-tasks-title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-zink-200">
              {{ t('welcome-tasks-desc') }}
            </p>
          </router-link>
          <router-link
            to="/employees"
            class="p-4 bg-slate-50 dark:bg-zink-500 rounded-lg hover:bg-slate-100 dark:hover:bg-zink-400 transition-colors"
          >
            <h3 class="font-medium mb-2">{{ t('welcome-employees-title') }}</h3>
            <p class="text-sm text-slate-500 dark:text-zink-200">
              {{ t('welcome-employees-desc') }}
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
