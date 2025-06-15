<script lang="ts" setup>
import Tasks from "@/app/components/tasks/TasksAdmin.vue";
</script>
<template>
  <div>
    <PageHeader title="Tasks" :items="['Tasks']" />
    <Tasks />
  </div>
</template>