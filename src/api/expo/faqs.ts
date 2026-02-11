import axios from "axios";
import { API_BASE } from "../constants";
import { FAQ } from "@/types/expo";

export const expoFaqsAPI = {
  createFAQ: ({ reqBody, authToken }) => {
    return axios.post(`${API_BASE}/expo/faqs`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateFAQ: ({ authToken, id, reqBody }) => {
    return axios.put(`${API_BASE}/expo/faqs/${id}`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  getFAQs: (): Promise<{ data: FAQ[] }> => {
    return axios.get(`${API_BASE}/expo/faqs`);
  },
  getOneFAQ: (id): Promise<{ data: FAQ }> => {
    return axios.get(`${API_BASE}/expo/faqs/${id}`);
  },
};
