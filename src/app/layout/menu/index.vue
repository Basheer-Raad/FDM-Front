<script lang="ts" setup>
import { computed, ref, onMounted, watch, onBeforeUnmount } from "vue";
import { useRoute, useRouter } from "vue-router";
import { logoDark, logoLight, logoSm } from "@/assets/images/utils";
import { getMenuItems } from "@/app/layout/utils";
import SubMenu from "@/app/layout/menu/SubMenu.vue";
import { useLayoutStore } from "@/store/layout";
import { LucideNetwork, X } from "lucide-vue-next";
import { LAYOUTS } from "@/app/const";
import { v4 as uuidv4 } from "uuid";
import { MenuItemType, SubMenuType } from "@/app/layout/types";
import { useI18n } from 'vue-i18n';
import { fakeBackendService } from "@/app/service/httpService/httpServiceProvider.ts";

const layoutStore = computed(() => useLayoutStore());
const layoutType = computed(() => layoutStore.value.layoutType);
const route = useRoute();
const router = useRouter();
const path = computed(() => route.path);
const onLogoClick = () => {
  router.push("/");
};
const user = JSON.parse(localStorage.getItem('user') || '{}');
const userRoles = user?.roles || [];

const menuItems = getMenuItems;

const mappedData: any = computed(() => menuItems.value.map((item) => {
  if (item.subMenu) {
    const nestedSubMenu = item.subMenu.map((subMenu: SubMenuType) => {
      if (subMenu.subMenu) {
        return {
          ...subMenu,
          isActive: false,
          id: uuidv4()
        };
      }
      return {
        ...subMenu
      };
    });
    return {
      ...item,
      subMenu: nestedSubMenu,
      isActive: false,
      id: uuidv4()
    };
  }
  return {
    ...item,
    id: uuidv4()
  };
}));

const menuItemData = computed(() => mappedData.value);
const toggleActivation = (menuItemId: string) => {
  menuItemData.value = menuItemData.value.map((item: MenuItemType) => {
    if (item.id === menuItemId) {
      return {
        ...item,
        isActive: !item.isActive
      };
    } else if (item.subMenu) {
      const nestedSubmenu = getActivations(menuItemId, item);
      const firstLevelMenu = {
        ...item,
        isActive: nestedSubmenu.some((subMenu: SubMenuType) => subMenu.isActive),
        subMenu: nestedSubmenu
      };
      return firstLevelMenu;
    }
    return { ...item, isActive: false };
  });
};
const getActivations: any = (menuItemId: string, menuItem: MenuItemType) => {
  const preparedData = menuItem.subMenu?.map((subMenu: SubMenuType) => {
    if (menuItemId && subMenu.id === menuItemId) {
      return {
        ...subMenu,
        isActive: !subMenu.isActive
      };
    } else {
      if (subMenu.subMenu) {
        const nestedSubmenu = getActivations(menuItemId, subMenu);
        const temp = {
          ...subMenu,
          subMenu: nestedSubmenu,
          isActive: nestedSubmenu.some((item: SubMenuType) => item.isActive)
        };
        return temp;
      }
      return { ...subMenu, isActive: false };
    }
  });
  return preparedData;
};
const hideActivation = () => {
  menuItemData.value = menuItemData.value.map((item) => {
    if (item.subMenu) {
      const nestedSubmenu = item.subMenu.map((subMenu) => {
        return {
          ...subMenu,
          isActive: false
        };
      });
      return {
        ...item,
        isActive: false,
        subMenu: nestedSubmenu
      };
    }
    return { ...item, isActive: false };
  });
};
const sideBarColor = computed(() => layoutStore.value.sideBarColor);
const sidebarClass = computed(() => {
  if (sideBarColor.value === 'dark') {
    return 'bg-zink-800 text-zink-100 border-zink-700';
  }
  // Add more cases for 'brand', 'modern', etc. if needed
  return 'bg-vertical-menu text-vertical-menu-item border-vertical-menu-border';
});
const siteMode = computed(() => layoutStore.value.mode);
const activeMenuClass = computed(() => {
  if (siteMode.value === 'dark') {
    return 'bg-vertical-menu-item-bg-active-dark text-vertical-menu-item-active-dark';
  }
  return 'bg-vertical-menu-item-bg-active text-vertical-menu-item-active';
});
const props = defineProps<{ menuOpen: boolean; closeMenu: () => void }>();
const { t } = useI18n();
</script>
<template>
  <div v-if="props.menuOpen" class="app-menu w-vertical-menu ltr:border-r rtl:border-l fixed bottom-0 top-0 z-drawer transition-all duration-75 ease-linear" :class="sidebarClass">
    <div class="flex items-center justify-between px-5 text-center h-header">
      <div @click="onLogoClick" class="cursor-pointer">
        <!-- <img :src="logoEmblem" alt="" class="h-6 mx-auto" /> -->
      </div>
      <button @click="props.closeMenu" class="p-2 ml-auto text-xl text-zink-400 hover:text-red-500 focus:outline-none">
        <X class="size-5" />
      </button>
    </div>
    <div id="menu-scrollbar">
      <div>
        <ul id="navbar-nav">
          <template v-for="menuItem in menuItemData" :key="menuItem.title">
            <li v-if="menuItem.isHeader" class="px-4 py-1 text-vertical-menu-item uppercase font-medium text-[11px] cursor-default tracking-wider inline-block underline text-center">
              <span :data-key="`t-${menuItem.title}`">
                {{ t(`t-${menuItem.title}`) }}
              </span>
            </li>
            <template v-else-if="menuItem.subMenu">
              <SubMenu :menuItem="menuItem" @toggleActivation="toggleActivation" />
            </template>
            <li v-else-if="!menuItem.subMenu && menuItem.path" class="relative">
              <router-link
                class="relative flex items-center pl-3 pr-5 mx-3 my-1 text-vertical-menu-item-font-size font-normal transition-all duration-75 ease-linear rounded-md py-2.5 text-vertical-menu-item hover:text-vertical-menu-item-hover hover:bg-vertical-menu-item-bg-hover dark:text-vertical-menu-item-dark dark:hover:text-vertical-menu-item-hover-dark dark:hover:bg-vertical-menu-item-bg-hover-dark"
                :class="[path === menuItem.path ? activeMenuClass : '', 'menu-link']"
                :to="menuItem.path"
                @click="() => { if (menuItem.id) { toggleActivation(menuItem.id); } props.closeMenu(); }"
              >
                <span class="min-w-[1.75rem] inline-block text-start text-[16px]">
                  <component :is="menuItem.icon" class="h-4 transition" />
                </span>
                <span class="align-middle" :data-key="`t-${menuItem.title}`">
                  {{ t(`t-${menuItem.title}`) }}
                </span>
              </router-link>
            </li>
          </template>
        </ul>
      </div>
    </div>
  </div>
</template>
