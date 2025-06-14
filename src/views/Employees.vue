<script lang="ts" setup>
import Employees from "@/app/components/employees/index.vue";
</script>
<template>
  <div>
    <PageHeader title="Employees" :items="['Employees']" />
    <Employees />
  </div>
</template>