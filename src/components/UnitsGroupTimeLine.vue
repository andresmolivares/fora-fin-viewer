<script setup lang="ts">
import type { PropType } from "vue";
import UnitTimeLine from "./UnitTimeLine.vue";
import type { Unit } from "../interfaces/types";

const props = defineProps({
  unitName: String,
  units: Object as PropType<Unit[]>,
});

const sort = (n1: any, n2: any) => (n1.filed > n2.filed ? 1 : n1.filed < n2.filed ? -1 : 0);
</script>

<template>
  <v-tabs-window-item :value="props.unitName">
    <v-card flat>
      <v-timeline align="start" v-for="(mappedUnit, i) in props.units?.sort(sort)" :key="i">
        <UnitTimeLine :unit="mappedUnit" />
      </v-timeline>
    </v-card>
  </v-tabs-window-item>
</template>
