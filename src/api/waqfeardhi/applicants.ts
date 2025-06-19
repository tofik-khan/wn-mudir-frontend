import { Applicant } from "@/types/waqfeardhi";
import { API_BASE } from "../constants";

import axios from "axios";

export const applicantsAPI = {
  getApplicants: async ({
    authToken,
  }): Promise<{ data: Applicant[]; status: string }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/applicants`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => response.data);
  },
  getOneApplicant: async ({
    authToken,
    _id,
  }): Promise<{ data: Applicant[]; status: string }> => {
    return await axios
      .get(`${API_BASE}/waqfeardhi/applicants/${_id}`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      })
      .then((response) => response.data);
  },
  updateApplicantStatus: async ({
    authToken,
    _id,
    status,
  }): Promise<{ data: Applicant; status: string }> => {
    return await axios
      .put(
        `${API_BASE}/waqfeardhi/applicants/${_id}/status`,
        {
          status,
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`,
          },
        }
      )
      .then((response) => response.data);
  },
};
