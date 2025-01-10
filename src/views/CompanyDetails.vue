<script setup lang="ts">
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { companyInfoService } from "../services/CompanyInfoService";
import type { CompanyInfo, FundableAmount } from "../interfaces/types";
import ResourceCard from "../components/ResourceCard.vue";
import { appTheme, deiTabLabel, usGaapTabLabel } from "../helpers/helpers";
import router from "../router";
import { useCompanyInfoState } from "../store/useCompanyInfoState";

const route = useRoute();
const cikId = route.params.id as string;
const companyInfo = ref<CompanyInfo | null>(null);
const fundableAmount = ref<FundableAmount | null>(null);

const searchVisible = ref(false);
const fundableDialog = ref(false);
const store = useCompanyInfoState();
const activeTab = ref(store.companyDetails.lastSelectedTab ?? deiTabLabel);
const searchQuery = ref(store.companyDetails.searchCriteria);

const getMappedResourceHeaders = (resourceParent: Record<string, any>) => {
  // @ts-ignore
  const results = Object.entries(resourceParent)
    .map(([key, value]) => ({
      resource: value,
      name: key,
    }))
    .filter((m) => m.resource != null);

  if (searchQuery.value?.trim()?.length > 2) {
    store.setSearchCriteria(searchQuery.value);
    const query = searchQuery.value.toLowerCase();
    return results.filter(
      (m) =>
        (m.resource.label && m.resource.label?.toLowerCase().includes(query)) ||
        (m.resource.description && m.resource.description?.toLowerCase().includes(query))
    );
  }

  return results;
};

// Function to toggle the visibility of the search bar
const toggleSearch = () => {
  searchVisible.value = !searchVisible.value;
};

const navBack = () => {
  router.go(-1);
};

const calculateFundableAmount = async () => {
  try {
    const response = await companyInfoService.getFundableAmount(cikId);
    fundableAmount.value = response.data;
    fundableDialog.value = true;
  } catch (error) {
    fundableDialog.value = false;
  }
};

const formatCurrency = (value: number, currency: string = "USD", locale: string = "en-US", options?: Intl.NumberFormatOptions) => {
  return new Intl.NumberFormat(locale, {
    style: "currency",
    currency: currency,
    ...options,
  }).format(value);
};

onMounted(async () => {
  const response = await companyInfoService.getCompanyInfo(cikId);
  companyInfo.value = response.data;
});

onUnmounted(() => {
  store.setSelectedTab(activeTab.value);
});
</script>

<template>
  <div class="ma-20">
    <div class="mx-10">
      <h2 class="my-4">Resources</h2>
      <v-card>
        <v-toolbar :theme="appTheme">
          <v-app-bar-nav-icon @click="navBack">
            <v-tooltip text="Back" activator="parent" location="bottom center" />
            <v-icon>mdi-arrow-left</v-icon>
          </v-app-bar-nav-icon>

          <v-toolbar-title>{{ companyInfo?.name }} - {{ companyInfo?.cik }}</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn @click="calculateFundableAmount">
            <v-tooltip text="Calculate Fundable Amount" activator="parent" location="bottom center" />
            <v-icon>mdi-calculator-variant</v-icon>
          </v-btn>

          <v-slide-x-reverse-transition>
            <v-text-field
              v-if="searchVisible"
              v-model="searchQuery"
              :text="searchQuery"
              autofocus
              label="Search"
              single-line
              hide-details
              clearable
              class="search-bar mx-2"
            ></v-text-field>
          </v-slide-x-reverse-transition>

          <v-btn icon @click="toggleSearch">
            <v-tooltip text="Search resources" activator="parent" location="bottom center" />
            <v-icon>mdi-magnify</v-icon>
          </v-btn>

          <template v-slot:extension>
            <v-tabs v-model="activeTab" :theme="appTheme" class="static-tabs">
              <v-tab value="{{deiTabLabel}}">Dei</v-tab>
              <v-tab value="{{usGaapTabLabel}}">US Gaap</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-window v-model="activeTab">
          <v-tabs-window-item value="{{deiTabLabel}}" v-if="companyInfo?.facts?.dei">
            <v-row class="card-grid">
              <v-col class="grid-card" md="4" v-for="(mappedResource, i) in getMappedResourceHeaders(companyInfo?.facts?.dei)" :key="i">
                <ResourceCard
                  :companyInfo="companyInfo"
                  :resource="mappedResource.resource"
                  :resourceName="mappedResource.name"
                  :searchQuery="searchQuery?.toLowerCase()"
                />
              </v-col>
            </v-row>
          </v-tabs-window-item>
          <v-tabs-window-item value="{{usGaapTabLabel}}" v-if="companyInfo?.facts?.usGaap">
            <v-row class="card-grid">
              <v-col class="grid-card" md="4" v-for="(mappedResource, i) in getMappedResourceHeaders(companyInfo?.facts?.usGaap)" :key="i">
                <ResourceCard
                  :companyInfo="companyInfo"
                  :resource="mappedResource.resource"
                  :resourceName="mappedResource.name"
                  :searchQuery="searchQuery?.toLowerCase()"
                />
              </v-col>
            </v-row>
          </v-tabs-window-item>
        </v-tabs-window>
      </v-card>

      <v-dialog v-model="fundableDialog" width="auto">
        <v-card max-width="auto" append-icon="mdi-information-outline" :title="fundableAmount?.name" :subtitle="fundableAmount?.id">
          <v-card-text>
            <div>
              <div>Standard Fundable Amount: {{ formatCurrency(fundableAmount?.standardFundableAmount!) }}</div>
              <div>Special Fundable Amount: {{ formatCurrency(fundableAmount?.specialFundableAmount!) }}</div>
            </div>
          </v-card-text>
          <!-- fundableAmount -->
          <template v-slot:actions>
            <v-btn class="ms-auto" text="Ok" @click="fundableDialog = false"></v-btn>
          </template>
        </v-card>
      </v-dialog>
    </div>
  </div>
</template>

<style scoped>
.search-bar {
  max-width: 300px;
}
</style>
