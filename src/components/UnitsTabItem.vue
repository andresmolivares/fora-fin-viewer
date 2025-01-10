<script setup lang="ts">
import type { PropType } from "vue";
import type { Unit } from "../interfaces/types";
import { badgeColors } from "../helpers/helpers";
import svgIcon from "./SvgIcon.vue";

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
  <v-tab :value="props.tabValue" class="h-auto">
    <div class="d-flex flex-wrap">
      <div><svgIcon :name="props.tabValue!" /></div>
      <div class="d-flex flex-wrap flex start">
        <div>{{ props.tabText }}</div>
        <v-badge v-if="hasUnits(props?.units)" :color="getBadgeColor(props.tabValue)" inline dot />
      </div>
    </div>
  </v-tab>
</template>
