import axios from "axios";

const baseUrl = "http://localhost:5206/companyinfoquery";

export const companyInfoService = {
  async getData(params: any) {
    return await axios.get(baseUrl, { params });
  },

  async getCompanyInfo(cikId: string) {
    return await axios.get(`${baseUrl}/${cikId}`);
  },

  async getCompanyInfoResource(cikId: string, resourceType: string) {
    return await axios.get(`${baseUrl}/${cikId}/${resourceType}/units`);
  },
};
