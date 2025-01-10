<script setup lang="ts">
import type { PropType } from "vue";
import type { CompanyInfo, FinancialResourceHeader } from "../interfaces/types";
import BadgeList from "./UnitsBadgeList.vue";

const props = defineProps({
  companyInfo: Object as PropType<CompanyInfo>,
  resource: Object as PropType<FinancialResourceHeader>,
  resourceName: String,
  searchQuery: String,
});

const getResourceDetailLink = (): string => {
  return `/company/${props?.companyInfo?.cik}/resource/${props?.resourceName}`;
};

const isResourceExists = (): boolean => {
  return props?.resource != null;
};

// Method to Highlight Text
const highlightText = (text?: string) => {
  if (!props.searchQuery || props.searchQuery.length < 3) return text;

  const query = props.searchQuery;
  const regex = new RegExp(`(${query})`, "gi"); // Case-insensitive match
  return text?.replace(regex, "<mark>$1</mark>"); // Wrap matches with <mark>
};
</script>

<template>
  <v-card v-if="isResourceExists()" :to="getResourceDetailLink()">
    <v-card-item>
      <v-card-title v-html="highlightText(props?.resource?.label)" />
      <v-card-text v-html="highlightText(props?.resource?.description)" />
    </v-card-item>
    <BadgeList :resource="props?.resource" />
  </v-card>
</template>
