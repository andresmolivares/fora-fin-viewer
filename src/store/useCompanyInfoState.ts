import { defineStore } from "pinia";

export const useCompanyInfoState = defineStore("CompanyInfoState", {
  state: () => ({
    companyListing: {
      page: 1,
      itemsPerPage: 10,
    },
    companyDetails: {
      companyName: "",
      cikId: "",
      lastSelectedTab: "",
      searchCriteria: "",
    },
  }),

  actions: {
    setListingPage(page: number) {
      this.companyListing.page = page;
    },
    setListingItemsPerPage(itemsPerPage: number) {
      this.companyListing.itemsPerPage = itemsPerPage;
    },
    setCompanyName(companyName: string) {
      this.companyDetails.companyName = companyName;
    },
    setCikId(cikId: string) {
      this.companyDetails.cikId = cikId;
    },
    setSelectedTab(tab: string) {
      this.companyDetails.lastSelectedTab = tab;
    },
    setSearchCriteria(criteria: string) {
      this.companyDetails.searchCriteria = criteria;
    },
  },
});
