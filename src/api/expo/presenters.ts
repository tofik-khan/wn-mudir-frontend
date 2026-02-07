import { API_BASE } from "../constants";
import axios from "axios";
import { Presenter } from "@/types/expo";

export const expoPresentersAPI = {
  getPresenters: (): Promise<{ data: Presenter[] }> => {
    return axios.get(`${API_BASE}/expo/presenters`);
  },
  getOnePresenter: (id): Promise<{ data: Presenter }> => {
    return axios.get(`${API_BASE}/expo/presenters/${id}`);
  },
  createPresenter: ({ authToken, reqBody }) => {
    return axios.post(`${API_BASE}/expo/presenters`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updatePresenter: ({ authToken, id, reqBody }) => {
    return axios.put(`${API_BASE}/expo/presenters/${id}`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
