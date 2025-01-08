import { createRouter, createWebHistory } from "vue-router";

import CompanyList from "../views/CompanyList.vue";
import CompanyDetails from "../views/CompanyDetails.vue";
import ResourceDetails from "../views/ResourceDetails.vue";

const routes = [
  { path: "/", name: "CompanyList", component: CompanyList },
  {
    path: "/company/:id",
    name: "CompanyDetails",
    component: CompanyDetails,
  },
  {
    path: "/company/:id/resource/:resourceType",
    name: "ResourceDetails",
    component: ResourceDetails,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
