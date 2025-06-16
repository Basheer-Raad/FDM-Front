import {
  MonitorDot,
  Users,
  // PictureInPicture2,
  // MessagesSquare,
  // Mail,
  // CalendarDays,
  // ShoppingBag,
  // CircuitBoard,
  // ScrollText,
  // RadioTower,
  // FileText,
  // User2,
  // Award,
  // Codesandbox,
  // LifeBuoy,
  // PackagePlus,
  // LocateFixed,
  Table,
  // PieChart,
  // Trophy,
  // Map,
  // Share2
  Diameter
} from "lucide-vue-next";
import { MenuItemType } from "@/app/layout/types";

export const menuItems: MenuItemType[] = [
  { isHeader: true, title: "menu" },
  {
    icon: MonitorDot,
    title: "welcome",
    path: "/",
  },
  {
    icon: Table,
    title: "admin-tasks",
    path: "/admin-tasks",
  },
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
