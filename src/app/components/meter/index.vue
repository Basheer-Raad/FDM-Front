<script lang="ts" setup>
import { ref, computed, onMounted } from "vue";
import { Plus, Search, ChevronLeft, ChevronRight } from "lucide-vue-next";
import CreateEditDialog from "./CreateEditDialog.vue";
import StatusChangeDialog from "./StatusChangeDialog.vue";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

interface Meter {
  id: number;
  type: string;
  serial_number: string;
  customer_id: number;
  location: string;
  status: string;
  installed_at: string;
}

const meterList = ref<Meter[]>([]);
const searchQuery = ref("");
const addMeterModal = ref(false);
const page = ref(1);

const tableHeader = computed(() => [
  { label: t("m-id"), value: "id", align: "left" },
  { label: t("m-type"), value: "type", align: "left" },
  { label: t("m-serial-number"), value: "serial_number", align: "left" },
  { label: t("m-customer-id"), value: "customer_id", align: "left" },
  { label: t("m-location"), value: "location", align: "left" },
  { label: t("m-status"), value: "status", align: "left" },
  { label: t("m-installed-at"), value: "installed_at", align: "left" },
]);

const tableConfig = {
  page: 1,
  itemsPerPage: 10,
};

// Submitted state
const submitted = ref(false);

// Meter modal states
const dataEdit = ref(false);
const event = ref({
  id: 0,
  type: "",
  serial_number: "",
  customer_id: 0,
  location: "",
  status: "active",
  installed_at: new Date().toISOString().split("T")[0],
});

// Add these new refs after the existing refs
const statusChangeModal = ref(false);
const selectedMeter = ref<Meter | null>(null);

// Computed property for filtered and displayed lists
const displayedLists = computed(() => {
  if (!searchQuery.value) return meterList.value;

  const query = searchQuery.value.toLowerCase();
  return meterList.value.filter(
    (meter) =>
      meter.serial_number.toLowerCase().includes(query) ||
      meter.location.toLowerCase().includes(query) ||
      meter.type.toLowerCase().includes(query)
  );
});

// Pagination computed properties
const totalItems = computed(() => displayedLists.value.length);

const getTotalPages = computed(() => {
  return Math.ceil(totalItems.value / tableConfig.itemsPerPage);
});

const getStartIndex = computed(() => {
  return (page.value - 1) * tableConfig.itemsPerPage;
});

const getEndIndex = computed(() => {
  return Math.min(getStartIndex.value + tableConfig.itemsPerPage, totalItems.value);
});

const paginatedData = computed(() => {
  return displayedLists.value.slice(getStartIndex.value, getEndIndex.value);
});

const fetchMeters = async () => {
  try {
    const response = await fetch("https://dummyjson.com/c/1092-077d-4ace-a6d8");
    const data = await response.json();
    meterList.value = data;
  } catch (error) {
    console.error("Error fetching meters:", error);
  }
};

onMounted(() => {
  fetchMeters();
});

const handleCreateModal = () => {
  event.value = {
    id: Math.floor(Math.random() * 9000000) + 1000000,
    type: "",
    serial_number: "",
    customer_id: 1,
    location: "",
    status: "active",
    installed_at: new Date().toISOString().split("T")[0],
  };
  addMeterModal.value = true;
};

const handleStatusChange = (meter: Meter) => {
  selectedMeter.value = meter;
  statusChangeModal.value = true;
};

const updateMeterStatus = (data: { id: number; status: string }) => {
  const meterIndex = meterList.value.findIndex((m) => m.id === data.id);
  if (meterIndex !== -1) {
    meterList.value[meterIndex].status = data.status;
  }
};
</script>

<template>
  <TCard id="meterTable">
    <div class="flex items-center gap-3 mb-4">
      <h6 class="text-15 grow">
        {{ t('m-meters') }} (<b>{{ meterList.length }}</b
        >)
      </h6>
      <div class="flex items-center gap-3">
        <div class="relative">
          <input
            type="text"
            v-model="searchQuery"
            class="form-input ltr:pl-8 rtl:pr-8 focus:z-10 dark:bg-zink-700 dark:border-zink-500 dark:text-zink-100 dark:focus:border-custom-800 placeholder:text-slate-400 dark:placeholder:text-zink-200"
            :placeholder="t('m-search-meters')"
          />
          <Search
            class="inline-block size-4 absolute ltr:left-2.5 rtl:right-2.5 top-2.5 text-slate-500 dark:text-zink-200"
          />
        </div>
        <TButton @click="handleCreateModal">
          <Plus class="inline-block size-4" /> {{ t('m-add-meter') }}
        </TButton>
      </div>
    </div>

    <div class="overflow-x-auto">
      <table class="w-full whitespace-nowrap">
        <thead class="ltr:text-left rtl:text-right">
          <tr class="bg-slate-100 dark:bg-zink-600">
            <th
              v-for="(item, index) in tableHeader"
              :key="'table-header-' + index"
              class="px-3.5 py-2.5 font-semibold border-b border-slate-200 dark:border-zink-500"
            >
              {{ item.label }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="(item, index) in paginatedData"
            :key="'table-row-' + index"
            class="border-y border-slate-200 dark:border-zink-500"
          >
            <td
              v-for="(header, index) in tableHeader"
              :key="'basic-table-tr-' + index"
              class="px-3.5 py-2.5"
            >
              <template v-if="header.value === 'status'">
                <span
                  @click="handleStatusChange(item)"
                  :class="[
                    'inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium cursor-pointer hover:opacity-80',
                    item[header.value as keyof Meter] === 'active'
                      ? 'bg-green-100 text-green-800 dark:bg-green-500/20 dark:text-green-400'
                      : item[header.value as keyof Meter] === 'inactive'
                      ? 'bg-red-100 text-red-800 dark:bg-red-500/20 dark:text-red-400'
                      : 'bg-yellow-100 text-yellow-800 dark:bg-yellow-500/20 dark:text-yellow-400',
                  ]"
                >
                  {{ item[header.value as keyof Meter] }}
                </span>
              </template>
              <template v-else>
                {{ item[header.value as keyof Meter] }}
              </template>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-if="!displayedLists.length" class="noresult">
      <div class="py-6 text-center">
        <Search
          class="size-6 mx-auto mb-3 text-sky-500 fill-sky-100 dark:fill-sky-500/20"
        />
        <h5 class="mt-2 mb-1">{{ t('m-no-result-found') }}</h5>
        <p class="mb-0 text-slate-500 dark:text-zink-200">
          {{ t('m-no-meters-match') }}
        </p>
      </div>
    </div>

    <div
      v-if="displayedLists.length"
      class="flex flex-col items-center mt-4 md:flex-row gap-4 px-4"
    >
      <div class="grow">
        <p class="text-slate-500 dark:text-zink-200">
          {{ t('m-showing') }} <b class="showing">{{ getEndIndex }}</b> {{ t('m-of') }}
          <b class="total-records">{{ totalItems }}</b> {{ t('m-results') }}
        </p>
      </div>

      <div class="col-sm-auto mt-sm-0">
        <TPagination
          v-model="page"
          :totalPages="getTotalPages"
          pageClass="inline-flex items-center justify-center bg-white dark:bg-zink-700 size-8 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
          actionClass="inline-flex items-center justify-center bg-white dark:bg-zink-700 h-8 px-3 transition-all duration-150 ease-linear border rounded border-slate-200 dark:border-zink-500 text-slate-500 dark:text-zink-200 hover:text-custom-500 dark:hover:text-custom-500 hover:bg-custom-50 dark:hover:bg-custom-500/10 focus:bg-custom-50 dark:focus:bg-custom-500/10 focus:text-custom-500 dark:focus:text-custom-500 [&.active]:text-custom-500 dark:[&.active]:text-custom-500 [&.active]:bg-custom-50 dark:[&.active]:bg-custom-500/10 [&.active]:border-custom-50 dark:[&.active]:border-custom-500/10 [&.active]:hover:text-custom-700 dark:[&.active]:hover:text-custom-700 [&.disabled]:text-slate-400 dark:[&.disabled]:text-zink-300 [&.disabled]:cursor-auto"
        >
          <template #prev>
            <ChevronLeft class="size-4 mr-1 rtl:rotate-180" />
            {{ t('m-prev') }}
          </template>
          <template #next>
            {{ t('m-next') }}
            <ChevronRight class="size-4 ml-1 rtl:rotate-180" />
          </template>
        </TPagination>
      </div>
    </div>
  </TCard>
  <CreateEditDialog v-model="addMeterModal" />
  <StatusChangeDialog
    v-if="selectedMeter"
    v-model:showModal="statusChangeModal"
    :current-status="selectedMeter.status"
    :meter-id="selectedMeter.id"
    @status-changed="updateMeterStatus"
  />
</template>
