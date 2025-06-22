import { API_BASE } from "../constants";
import axios from "axios";

export const dashboardAPI = {
  getApplicationsCount: async (): Promise<{ data: number; status: string }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/applications`)
      .then((response) => response.data);
  },
  getCompletedApplicationsCount: async (): Promise<{
    data: number;
    status: string;
  }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/completedApplications`)
      .then((response) => response.data);
  },
  getProjectsCount: async (): Promise<{ data: number; status: string }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/projects`)
      .then((response) => response.data);
  },
  getApplicationsCountByAuxiliary: async (): Promise<{
    data: any[];
    status: string;
  }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/applicationsByAuxiliary`)
      .then((response) => response.data);
  },
  getApplicationsPerMonth: async (): Promise<{
    data: any[];
    status: string;
  }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/applicationsPerMonth`)
      .then((response) => response.data);
  },
  getApplicationsCountByStatus: async ({
    status,
  }): Promise<{
    data: number;
    status: string;
  }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/count/status/${status}`)
      .then((response) => response.data);
  },
};
