<script setup lang="ts">
import type { PropType } from "vue";
import type { CompanyInfo, FinancialResourceHeader } from "../interfaces/types";
import BadgeList from "./UnitsBadgeList.vue";

const props = defineProps({
  companyInfo: Object as PropType<CompanyInfo>,
  resource: Object as PropType<FinancialResourceHeader>,
  resourceName: String,
});

const getResourceDetailLink = (): string => {
  return `/company/${props?.companyInfo?.cik}/resource/${props?.resourceName}`;
};

const isResourceExists = (): boolean => {
  return props?.resource != null;
};
</script>

<template>
  <v-card v-if="isResourceExists()" :href="getResourceDetailLink()">
    <v-card-item :title="props?.resource?.label">
      <v-card-text>{{ props?.resource?.description }}</v-card-text>
    </v-card-item>
    <BadgeList :resource="props?.resource" />
  </v-card>
</template>
