<script setup lang="ts">
import { ref, onMounted } from "vue";
import { useRoute } from "vue-router";
import type { FinancialResourceHeader } from "../interfaces/types";
import { companyInfoService } from "../services/CompanyInfoService";
import UnitsGroupTimeLine from "../components/UnitsGroupTimeLine.vue";
import UnitsTabItem from "../components/UnitsTabItem.vue";
import { appTheme } from "../helpers/helpers";
import router from "../router";
import { useCompanyInfoState } from "../store/useCompanyInfoState";

const resource = ref<FinancialResourceHeader | null>(null);
const route = useRoute();
const cikId = route.params.id as string;
const resourceType = route.params.resourceType as string;
const store = useCompanyInfoState();

//derivativeAgreement
const activeTab = ref("derivativeAgreement");

const navBack = () => {
  router.go(-1);
};

const companyName = ref("");
console.log("store.companyDetails.searchCriteria", store.companyDetails.searchCriteria);

onMounted(async () => {
  companyName.value = store.companyDetails.companyName;
  const response = await companyInfoService.getCompanyInfoResource(cikId, resourceType);
  resource.value = response.data;
});
</script>

<template>
  <div class="ma-20">
    <div class="mx-10">
      <h2 class="my-4">Units</h2>
      <div class="d-flex flex-row">
        <v-app-bar-nav-icon @click="navBack">
          <v-tooltip text="Back" activator="parent" location="bottom center" />
          <v-icon>mdi-arrow-left</v-icon>
        </v-app-bar-nav-icon>
        <v-card>
          <v-card-title>
            <div class="d-flex flex-row">
              <div>({{ companyName }} - {{ cikId }}) {{ resource?.label }}</div>
            </div>
          </v-card-title>
          <v-card-text>{{ resource?.description }}</v-card-text>
        </v-card>
      </div>
      <div class="mx-10">
        <div class="d-flex flex-row my-6 mx-2">
          <v-tabs v-model="activeTab" :theme="appTheme" direction="vertical" align-tabs="start">
            <UnitsTabItem tab-text="Derivative Agreement" tab-value="derivativeAgreement" :units="resource?.units.derivativeAgreement" />
            <UnitsTabItem tab-text="Employee" tab-value="employee" :units="resource?.units.employee" />
            <UnitsTabItem tab-text="Lawsuit" tab-value="lawsuit" :units="resource?.units.lawsuit" />
            <UnitsTabItem tab-text="Patent" tab-value="patent" :units="resource?.units.patent" />
            <UnitsTabItem tab-text="Plaintiff" tab-value="plaintiff" :units="resource?.units.plaintiff" />
            <UnitsTabItem tab-text="Pure" tab-value="pure" :units="resource?.units.pure" />
            <UnitsTabItem tab-text="Reporting Unit" tab-value="reportingUnit" :units="resource?.units.reportingUnit" />
            <UnitsTabItem tab-text="Segment" tab-value="segment" :units="resource?.units.segment" />
            <UnitsTabItem tab-text="Shares" tab-value="shares" :units="resource?.units.shares" />
            <UnitsTabItem tab-text="USD" tab-value="usd" :units="resource?.units.usd" />
            <UnitsTabItem tab-text="USD Shares" tab-value="usdShares" :units="resource?.units.usdShares" />
            <UnitsTabItem tab-text="Y" tab-value="y" :units="resource?.units.y" />
          </v-tabs>
          <div class="my-6 mx-4">
            <v-tabs-window v-model="activeTab">
              <UnitsGroupTimeLine unit-name="derivativeAgreement" :units="resource?.units.derivativeAgreement" />
              <UnitsGroupTimeLine unit-name="employee" :units="resource?.units.employee" />
              <UnitsGroupTimeLine unit-name="lawsuit" :units="resource?.units.lawsuit" />
              <UnitsGroupTimeLine unit-name="patent" :units="resource?.units.patent" />
              <UnitsGroupTimeLine unit-name="plaintiff" :units="resource?.units.plaintiff" />
              <UnitsGroupTimeLine unit-name="pure" :units="resource?.units.pure" />
              <UnitsGroupTimeLine unit-name="reportingUnit" :units="resource?.units.reportingUnit" />
              <UnitsGroupTimeLine unit-name="segment" :units="resource?.units.segment" />
              <UnitsGroupTimeLine unit-name="shares" :units="resource?.units.shares" />
              <UnitsGroupTimeLine unit-name="usd" :units="resource?.units.usd" />
              <UnitsGroupTimeLine unit-name="usdShares" :units="resource?.units.usdShares" />
              <UnitsGroupTimeLine unit-name="y" :units="resource?.units.y" />
            </v-tabs-window>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
