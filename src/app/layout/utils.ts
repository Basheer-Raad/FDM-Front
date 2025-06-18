import {
  MonitorDot,
  Users,
  Table,
  Diameter
} from "lucide-vue-next";
import { MenuItemType } from "@/app/layout/types";
import { useAuthStore } from "@/store/auth";
import { computed } from 'vue';

export const getMenuItems = computed(() => {
  const authStore = useAuthStore();
  
  const baseMenuItems: MenuItemType[] = [
    { isHeader: true, title: "menu" },
    {
      icon: MonitorDot,
      title: "welcome",
      path: "/",
    }
  ];

  const adminMenuItem = {
    icon: Table,
    title: "admin-tasks",
    path: "/admin-tasks",
  };

  const commonMenuItems: MenuItemType[] = [
    {
      icon: Table,
      title: "technician-tasks",
      path: "/technician-tasks",
    },
    {
      icon: Users,
      title: "employees",
      path: "/employees",
    },
    {
      icon: Users,
      title: "customers",
      path: "/customers",
    },
    {
      icon: Diameter,
      title: "meters",
      path: "/meters",
    }
  ];

  return [
    ...baseMenuItems,
    ...(authStore.isAdmin ? [adminMenuItem] : []),
    ...commonMenuItems
  ];
});
