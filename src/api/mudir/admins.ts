import { API_BASE } from "@/api/constants"
//import { MongoDBUpdateResponseType } from "@/types";
import { Admin } from "@/types/admin";
import axios from "axios";

export const adminAPI = {
  getAdmins: (): Promise<{ data: Admin[]; status: string }> => {
    return axios.get(`${API_BASE}/mudir/admins`).then((response) => response.data);
  },
}