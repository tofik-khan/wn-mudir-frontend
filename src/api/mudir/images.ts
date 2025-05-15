import { API_BASE } from "../constants";
import axios from "axios";

export const imagesAPI = {
  getImageKitAuth: (): Promise<{
    data: {
      signature: string;
      expire: number;
      token: string;
      publicKey: string;
    };
    status: string;
  }> => {
    return axios
      .get(`${API_BASE}/mudir/images/auth`)
      .then((response) => response.data);
  },
};
