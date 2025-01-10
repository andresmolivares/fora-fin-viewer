import { ref } from "vue";

export const deiTabLabel = "dei";
export const usGaapTabLabel = "usGaap";

export const badgeColors = [
  { name: "derivativeAgreement", color: "#50C878" },
  { name: "employee", color: "#FFD700" },
  { name: "lawsuit", color: "#0F52BA" },
  { name: "patent", color: "#9B111E" },
  { name: "plaintiff", color: "#E5E4E2" },
  { name: "pure", color: "#000080" },
  { name: "reportingUnit", color: "#808000" },
  { name: "segment", color: "#CD7F32" },
  { name: "shares", color: "#008080" },
  { name: "usd", color: "#800020" },
  { name: "usdShares", color: "#C0C0C0" },
  { name: "y", color: "#000000" },
];

export const appTheme = ref("light");

export const toggleTheme = () => {
  return (appTheme.value = appTheme.value === "light" ? "dark" : "light");
};
