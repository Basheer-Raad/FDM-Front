<script lang="ts" setup>
import { ref, computed } from "vue";
import { ChevronsRight } from "lucide-vue-next";

import Language from "@/app/layout/navbar/Language.vue";
import SiteMode from "@/app/layout/navbar/SiteMode.vue";
import Notification from "@/app/layout/navbar/Notification.vue";
import Settings from "@/app/layout/navbar/Settings.vue";
import Profile from "@/app/layout/navbar/Profile.vue";
import CustomizerDrawer from "@/app/layout/navbar/customizer/Drawer.vue";
import { useLayoutStore } from "@/store/layout";
import logoDarkMain from "@/assets/images/Larsatron_Logo-Eng-light.png";
import  logoLight from "@/assets/images/Larsatron_Logo-Eng.png";
import { useRoute } from "vue-router";
import { getMenuItems } from "@/app/layout/utils";
import { useI18n } from 'vue-i18n';
// import logoEmblem from '@/assets/images/Larsatron_Logo-emblem-small.png';

const customizerDrawer = ref(false);
const layoutStore = computed(() => useLayoutStore());
const siteMode = computed(() => layoutStore.value.mode);
const navClass = computed(() => {
  if (siteMode.value === 'dark') {
    return 'bg-zink-800 text-zink-100 border-zink-700';
  }
  return 'bg-topbar text-topbar-item border-topbar-border';
});
const toggleCustomizerDrawer = () => {
  customizerDrawer.value = !customizerDrawer.value;
};

const props = defineProps<{ openMenu: () => void }>();
const route = useRoute();
const { t } = useI18n();

const logoMain = computed(() => siteMode.value === 'dark' ? logoDarkMain : logoLight);

const activeMenuClass = computed(() => {
  if (siteMode.value === 'dark') {
    return 'bg-zink-700 text-green-400';
  }
  return 'bg-green-100 text-green-700';
});

const user = JSON.parse(localStorage.getItem('user') || '{}');
const menuItems = getMenuItems;
</script>
<template>
  <header id="page-topbar" class="fixed right-0 z-[1000] left-0 print:hidden transition-all ease-linear duration-300" :class="navClass">
    <div class="layout-width">
      <div class="flex items-center px-4 mx-auto border-b-2 h-header" :class="navClass">
        <div class="flex items-center w-full navbar-header">
          <button class="mr-2 md:hidden p-2 rounded hover:bg-slate-200 dark:hover:bg-zink-700" @click="props.openMenu">
            <ChevronsRight class="w-6 h-6" />
          </button>
          <router-link to="/">
            <img :src="logoMain" alt="Logo" class="h-10 mx-auto" />
          </router-link>
          <!-- Main navigation tabs -->
          <nav class="hidden md:flex gap-2 ltr:ml-6 rtl:mr-6">
            <template v-for="item in menuItems" :key="item.title">
              <router-link
                v-if="!item.isHeader && item.path"
                :to="item.path"
                class="flex items-center px-4 py-2 rounded-md transition-all duration-75 text-base font-medium"
                :class="[route.path === item.path ? activeMenuClass : '']"
              >
                <span class="ml-2" v-if="item.icon">
                  <component :is="item.icon" class="inline-block size-5" />
                </span>
                {{ t(`t-${item.title}`) }}
              </router-link>
            </template>
          </nav>
          <!-- End main navigation tabs -->
          <div class="flex gap-3 ms-auto">
            <div class="relative flex items-center dropdown h-header">
              <Language />
            </div>
            <SiteMode />
            <div class="relative flex items-center h-header hidden md:flex">
              <Notification />
            </div>
            <div class="relative items-center flex h-header hidden md:flex">
              <Settings @toggleDrawer="toggleCustomizerDrawer" />
            </div>
            <Profile />
          </div>
        </div>
      </div>
    </div>
  </header>
  <TDrawer v-model="customizerDrawer" width="md:w-96">
    <template #title>
      <div class="flex justify-between border-slate-200 dark:border-zink-500">
        <div class="grow">
          <h5 class="mb-1 text-16">Theme Customizer</h5>
          <p class="font-normal text-slate-500 dark:text-zink-200">Choose your themes & layouts etc.</p>
        </div>
      </div>
    </template>
    <template #content>
      <CustomizerDrawer v-if="customizerDrawer" />
    </template>
  </TDrawer>
</template>
