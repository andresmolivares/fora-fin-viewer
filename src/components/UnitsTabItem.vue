<script setup lang="ts">
import type { PropType } from "vue";
import { badgeColors, type Unit } from "../interfaces/types";

const props = defineProps({
  tabValue: String,
  tabText: String,
  units: Object as PropType<Unit[]>,
});

const hasUnits = (units?: Unit[]) => {
  return units?.length ?? 0 > 0;
};

const getBadgeColor = (value?: string) => {
  return badgeColors.find((b) => b.name === value)?.color;
};
</script>

<template>
  <v-tab :value="props.tabValue">
    <div>
      <v-tab-text>{{ props.tabText }}</v-tab-text>
      <v-badge v-if="hasUnits(props?.units)" :color="getBadgeColor(props.tabValue)" inline dot />
    </div>
  </v-tab>
</template>
