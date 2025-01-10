import axios from "axios";

const baseUrl = "http://localhost:5206/companyinfoquery";
const foraCodingUrl = "http://localhost:5206/ForaCoding";

export const companyInfoService = {
  async getData() {
    return await axios.get(baseUrl);
  },

  async getCompanyInfo(cikId: string) {
    return await axios.get(`${baseUrl}/${cikId}`);
  },

  async getCompanyInfoResource(cikId: string, resourceType: string) {
    return await axios.get(`${baseUrl}/${cikId}/${resourceType}/units`);
  },

  async getFundableAmount(cikId: string) {
    return await axios.get(`${foraCodingUrl}/${cikId}`);
  },
};
