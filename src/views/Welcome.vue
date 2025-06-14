<script lang="ts" setup>
import { onMounted } from "vue";
import { fakeBackendService } from "@/app/service/httpService/httpServiceProvider.ts";

const user = fakeBackendService.getUser();
</script>
<template>
  <div class="p-6">
    <div class="text-center">
      <h1 class="text-3xl font-bold text-custom-500 dark:text-custom-500 mb-4">
        Welcome to Smart Meter Electricity
      </h1>
      <p class="text-slate-500 dark:text-zink-200 text-lg mb-6">
        Hello {{ user.username }}, we're glad to have you back!
      </p>
      <div class="bg-white dark:bg-zink-600 rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
        <h2 class="text-xl font-semibold mb-4">Getting Started</h2>
        <p class="text-slate-500 dark:text-zink-200 mb-4">
          Here are some quick links to help you get started:
        </p>
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <router-link
            to="/tasks"
            class="p-4 bg-slate-50 dark:bg-zink-500 rounded-lg hover:bg-slate-100 dark:hover:bg-zink-400 transition-colors"
          >
            <h3 class="font-medium mb-2">Tasks</h3>
            <p class="text-sm text-slate-500 dark:text-zink-200">
              View your analytics and statistics
            </p>
          </router-link>
          <router-link
            to="/employees"
            class="p-4 bg-slate-50 dark:bg-zink-500 rounded-lg hover:bg-slate-100 dark:hover:bg-zink-400 transition-colors"
          >
            <h3 class="font-medium mb-2">Employees</h3>
            <p class="text-sm text-slate-500 dark:text-zink-200">
              Manage your users and permissions
            </p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>
