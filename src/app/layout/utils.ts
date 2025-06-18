import {
  MonitorDot,
  Users,
  Table,
  Diameter
} from "lucide-vue-next";
import { MenuItemType } from "@/app/layout/types";

const userRole = localStorage.getItem('role');

export const menuItems: MenuItemType[] = [
  { isHeader: true, title: "menu" },
  {
    icon: MonitorDot,
    title: "welcome",
    path: "/",
  },
  ...(userRole !== '"technician"' ? [{
    icon: Table,
    title: "admin-tasks",
    path: "/admin-tasks",
  }] : []),
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
  },

  
];
