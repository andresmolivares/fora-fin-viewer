<script setup lang="ts">
import type { PropType } from "vue";
import type { Unit } from "../interfaces/types";

const props = defineProps({
  unit: Object as PropType<Unit>,
});
</script>

<template>
  <v-timeline-item>
    <template v-slot:opposite>
      <div>
        Filed
        {{ props.unit?.filed }}
      </div>
    </template>
    <div>
      <div>Account: {{ props.unit?.accn }}</div>
      <div>Start: {{ props.unit?.start }}</div>
      <div>End: {{ props.unit?.end }}</div>
      <div>Fiscal Period: {{ props.unit?.fp }}</div>
      <div>Fiscal Year: {{ props.unit?.fy }}</div>
      <div>Value: {{ props.unit?.val }}</div>
      <div>Form: {{ props.unit?.form }}</div>
      <div>Frame: {{ props.unit?.frame }}</div>
    </div>
  </v-timeline-item>
</template>
