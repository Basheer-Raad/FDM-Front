import { TableHeaderType } from "@/app/components/tables/types";

export const tableHeader: TableHeaderType[] = [
  { title: "Event Name", value: "event_name" },
  { title: "Start Date", value: "start_date" },
  { title: "End Date", value: "end_date" },
  { title: "Number Registered", value: "number" },
  { title: "Total", value: "total" },
  { title: "Status", value: "status" },
  { title: "Action", value: "action" },
];

export const tableData = [
  {
    event_name: "Business Conference",
    start_date: "03 June, 2023",
    end_date: "19 June, 2023",
    number: "231",
    total: "1,000",
    status: "Ongoing",
    statusColor: "green",
  },
  {
    event_name: "Graduation Ceremony",
    start_date: "01 Jan, 2023",
    end_date: "01 Jan, 2023",
    number: "0",
    total: "1,500",
    status: "Draft",
    statusColor: "custom",
  },
  {
    event_name: "Cultural Festival",
    start_date: "05 Aug, 2023",
    end_date: "10 Aug, 2023",
    number: "19,121",
    total: "20,000",
    status: "Closed",
    statusColor: "red",
  },
  {
    event_name: "Award Ceremony",
    start_date: "11 Nov, 2023",
    end_date: "11 Nov, 2023",
    number: "748",
    total: "1,100",
    status: "Ongoing",
    statusColor: "green",
  },
  {
    event_name: "Sports Game",
    start_date: "01 Dec, 2023",
    end_date: "07 Dec, 2023",
    number: "24,130",
    total: "30,000",
    status: "Ongoing",
    statusColor: "green",
  },
  {
    event_name: "Theater Performance",
    start_date: "18 Feb, 2024",
    end_date: "18 Feb, 2024",
    number: "0",
    total: "800",
    status: "Draft",
    statusColor: "custom",
  },
  {
    event_name: "Community Clean-Up Day",
    start_date: "15 Oct, 2023",
    end_date: "15 Oct, 2023",
    number: "1,142",
    total: "1200",
    status: "Closed",
    statusColor: "red",
  },
];
