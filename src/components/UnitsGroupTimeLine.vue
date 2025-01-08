<script setup lang="ts">
import type { PropType } from "vue";
import UnitTimeLine from "./UnitTimeLine.vue";
import type { Unit } from "../interfaces/types";

const props = defineProps({
  unitName: String,
  units: Object as PropType<Unit[]>,
});
</script>

<template>
  <v-tabs-window-item :value="props.unitName">
    <v-card flat>
      <v-timeline align="start" v-for="(mappedUnit, i) in props.units?.sort((i: any) => i.filed)" :key="i">
        <UnitTimeLine :unit="mappedUnit" />
      </v-timeline>
    </v-card>
  </v-tabs-window-item>
</template>
