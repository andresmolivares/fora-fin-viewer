<script setup lang="ts">
import { ref, onMounted } from "vue";
import { companyInfoService } from "../services/CompanyInfoService";
import type { CompanyInfoHeader } from "../interfaces/types";
import { useRouter } from "vue-router";
import { appTheme } from "../helpers/helpers";
import { useCompanyInfoState } from "../store/useCompanyInfoState";

const headers: any = ref([
  { title: "CIK Id", sortable: "true", value: "cik", align: "center" },
  { title: "Company Name", sortable: "true", value: "name", align: "center" },
] as const);
const companies = ref<CompanyInfoHeader[]>([]);
const totalItems = ref(0);
const store = useCompanyInfoState();
const router = useRouter();

const updatePage = (page: number) => {
  //@ts-ignore
  store.setListingPage(page);
  console.log("store page", store.companyListing.page);
  console.log("store itemsPerPage", store.companyListing.itemsPerPage);
};
//
const updateItemsPerPage = (itemsPerPage: number) => {
  //@ts-ignore
  store.setListingItemsPerPage(itemsPerPage);
  console.log("store page", store.companyListing.page);
  console.log("store itemsPerPage", store.companyListing.itemsPerPage);
};

//pagination
const fetchData = async () => {
  const response = await companyInfoService.getData();
  companies.value = response.data;
  totalItems.value = companies.value.length;
};

const onRowClick = (_: any, companyInfo: CompanyInfoHeader) => {
  //@ts-ignore
  const cikId = companyInfo.item.cik;
  if (cikId) {
    store.setCikId(cikId);
    //@ts-ignore
    store.setCompanyName(companyInfo.item.name);
    router.push(`/company/${cikId}`);
  }
};

onMounted(async () => {
  await fetchData();
  store.setSearchCriteria("");
});
</script>

<template>
  <div class="d-flex flex-wrap w-100">
    <v-container class="d-flex justify-center mx-16 px-16" :theme="appTheme">
      <div class="d-flex justify-center flex-wrap">
        <h1 class="text-center w-100 ma-4">Company Info Listing</h1>
        <!-- TODO: Persisting scroll to state not working 
          :options.sync="pagination"
          :page="pagination.page"
          :items-per-page="pagination.itemsPerPage"
          @update:options="fetchData"
          @update:page="updatePage"
          @update:items-per-page="updateItemsPerPage" 
          :page-sync="pagination.page"
          :items-per-page-sync="pagination.itemsPerPage"
        -->
        <v-data-table
          :theme="appTheme"
          class="flex-1-1-200 ma-2 pa-2"
          height="600"
          :headers="headers"
          fixed-header
          :items-length="89"
          :items="companies"
          item-value="cik"
          show-pager
          @click:row="onRowClick"
          :server-items-length="totalItems"
          @update:page="updatePage"
          @update:items-per-page="updateItemsPerPage"
          :page-sync="store.companyListing.page"
          :items-per-page-sync="store.companyListing.itemsPerPage"
        >
          <template v-slot:no-data>
            <v-alert type="error" color="red">No companies found</v-alert>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
