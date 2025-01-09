<script setup lang="ts">
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { companyInfoService } from "../services/CompanyInfoService";
import type { CompanyInfo } from "../interfaces/types";
import ResourceCard from "../components/ResourceCard.vue";
import { appTheme } from "../helpers/helpers";

const route = useRoute();
const cikId = route.params.id as string;
const companyInfo = ref<CompanyInfo | null>(null);
const deiTabLabel = "dei";
const usGaapTabLabel = "usGaap";
console.log("usGaapTabLabel", usGaapTabLabel);
const activeTab = ref(deiTabLabel); // Default tab value

const getMappedResourceHeaders = (resourceParent: Record<string, any>) => {
  // @ts-ignore
  return Object.entries(resourceParent)
    .map(([key, value]) => ({
      resource: value,
      name: key,
    }))
    .filter((m) => m.resource != null);
};

onMounted(async () => {
  const response = await companyInfoService.getCompanyInfo(cikId);
  console.log("response.data", response.data);
  companyInfo.value = response.data;
});
</script>

<template>
  <div class="ma-20">
    <div>
      <v-card>
        <v-card-title>{{ companyInfo?.name }}</v-card-title>
        <v-card-subtitle>{{ companyInfo?.cik }}</v-card-subtitle>
      </v-card>

      <!-- TODO: Add Calc component -->
    </div>

    <h2>Resources</h2>
    <v-card>
      <v-tabs v-model="activeTab" :theme="appTheme" class="static-tabs">
        <v-tab value="{{deiTabLabel}}">Dei</v-tab>
        <v-tab value="{{usGaapTabLabel}}">US Gaap</v-tab>
      </v-tabs>
      <v-card-text>
        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item value="{{deiTabLabel}}" v-if="companyInfo?.facts?.dei">
            <v-row class="card-grid">
              <v-col class="grid-card" md="4" v-for="(mappedResource, i) in getMappedResourceHeaders(companyInfo?.facts?.dei)" :key="i">
                <ResourceCard :companyInfo="companyInfo" :resource="mappedResource.resource" :resourceName="mappedResource.name"></ResourceCard>
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item value="{{usGaapTabLabel}}" v-if="companyInfo?.facts?.usGaap">
            <v-row class="card-grid">
              <v-col class="grid-card" md="4" v-for="(mappedResource, i) in getMappedResourceHeaders(companyInfo?.facts?.usGaap)" :key="i">
                <ResourceCard :companyInfo="companyInfo" :resource="mappedResource.resource" :resourceName="mappedResource.name"></ResourceCard>
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card-text>
    </v-card>
  </div>
</template>
