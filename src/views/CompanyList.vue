<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { companyInfoService } from "../services/CompanyInfoService";
import type { CompanyInfoHeader } from "../interfaces/types";
import { useRouter } from "vue-router";
import { appTheme } from "../helpers/helpers";

const headers: any = ref([
  { title: "CIK Id", sortable: "true", value: "cik", align: "center" },
  { title: "Company Name", sortable: "true", value: "name", align: "center" },
] as const);
const companies = ref<CompanyInfoHeader[]>([]);
const totalItems = ref(0);
const pagination = reactive({
  page: 1,
  itemsPerPage: 50,
  sortBy: [] as string[],
  sortDesc: [] as boolean[],
});
const router = useRouter();

//pagination
const fetchData = async () => {
  const { page, itemsPerPage, sortBy, sortDesc } = pagination;

  // Build query parameters
  const params = {
    page,
    itemsPerPage,
    sortBy: sortBy.length > 0 ? sortBy[0] : undefined,
    sortDesc: sortDesc.length > 0 ? sortDesc[0] : undefined,
  };

  const response = await companyInfoService.getData(params);
  companies.value = response.data;
  totalItems.value = companies.value.length;
};

const onRowClick = (_: any, companyInfo: CompanyInfoHeader) => {
  //@ts-ignore
  if (companyInfo && companyInfo.item?.cik) {
    //@ts-ignore
    router.push(`/company/${companyInfo.item?.cik}`);
  }

  onMounted(fetchData);
};
</script>

<template>
  <div class="d-flex flex-wrap w-100">
    <v-container class="d-flex justify-center mx-16 px-16" :theme="appTheme">
      <div class="d-flex justify-center flex-wrap">
        <h1 class="text-center w-100 ma-4">Company Info Listing</h1>
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
          @update:options="fetchData"
          @click:row="onRowClick"
          :options.sync="pagination"
          :items-per-page="pagination.itemsPerPage"
          :server-items-length="totalItems"
        >
          <template v-slot:no-data>
            <v-alert type="error" color="red">No companies found</v-alert>
          </template>
        </v-data-table>
      </div>
    </v-container>
  </div>
</template>
