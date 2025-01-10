<script setup lang="ts">
import type { PropType } from "vue";
import type { FinancialResourceHeader } from "../interfaces/types";
import { badgeColors } from "../helpers/helpers";

const props = defineProps({
  resource: Object as PropType<FinancialResourceHeader>,
});

const isUnitAvailable = (resource: FinancialResourceHeader, name: string) => {
  switch (name) {
    case "derivativeAgreement":
      return resource?.hasDerivativeAgreements;
    case "employee":
      return resource?.hasEmployees;
    case "lawsuit":
      return resource?.hasLawsuits;
    case "patent":
      return resource?.hasPatents;
    case "plaintiff":
      return resource?.hasPlaintiffs;
    case "pure":
      return resource?.hasPures;
    case "reportingUnit":
      return resource?.hasReportingUnits;
    case "segment":
      return resource?.hasSegments;
    case "shares":
      return resource?.hasShares;
    case "usd":
      return resource?.hasUSDs;
    case "usdShares":
      return resource?.hasUSDShares;
    case "y":
      return resource?.hasYs;
    default:
      return false;
  }
};
</script>

<template>
  <v-container>
    <v-row class="d-flex flex-row flex-nowrap justify-center">
      <v-col v-for="(badge, index) in badgeColors" :key="index" cols="auto" class="text-center">
        <v-badge :color="badge.color" dot v-if="isUnitAvailable(props.resource!, badge.name)">
          <v-tooltip activator="parent" location="start" :text="badge.name" />
        </v-badge>
      </v-col>
    </v-row>
  </v-container>
</template>
