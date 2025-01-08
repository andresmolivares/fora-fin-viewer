<script setup lang="ts">
import { ref, onMounted, reactive } from "vue";
import { companyInfoService } from "../services/CompanyInfoService";
import type { CompanyInfoHeader } from "../interfaces/types";
import { useRouter } from "vue-router";

const headers: any = ref([
  { title: "CIK Id", sortable: "true", value: "cik", align: "start" },
  { title: "Company Name", sortable: "true", value: "name", align: "center" },
] as const);
const companies = ref<CompanyInfoHeader[]>([]);
const totalItems = ref(0);
const pagination = reactive({
  page: 1,
  itemsPerPage: 10,
  sortBy: [] as string[],
  sortDesc: [] as boolean[],
});
const router = useRouter();

const search = "";
const page = 1;

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
  <div>
    <h1>Company Info Listing</h1>
    <v-container>
      <v-data-table
        :headers="headers"
        :items-length="89"
        :items="companies"
        :search="search"
        :page.sync="page"
        height="400"
        width="800"
        item-value="cik"
        class="elevation-1"
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
    </v-container>
  </div>
</template>
