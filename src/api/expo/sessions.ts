import { API_BASE } from "../constants";
import axios from "axios";
import { Session } from "@/types/expo";

export const expoSessionsAPI = {
  getSessions: (): Promise<{ data: Session[] }> => {
    return axios.get(`${API_BASE}/expo/sessions`);
  },
  getOneSession: (id): Promise<{ data: Session }> => {
    return axios.get(`${API_BASE}/expo/sessions/${id}`);
  },
  createSession: ({ authToken, reqBody }) => {
    return axios.post(`${API_BASE}/expo/sessions`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
  updateSession: ({ authToken, id, reqBody }) => {
    return axios.put(`${API_BASE}/expo/sessions/${id}`, reqBody, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
  },
};
