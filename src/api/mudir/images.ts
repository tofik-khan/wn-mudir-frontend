import { Folder } from "@/types/images";
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
  getImagesInFolder: ({ folder }: { folder: Folder }): Promise<any> => {
    return axios
      .get(`${API_BASE}/mudir/images?folder=${folder.id}`)
      .then((response) => response.data);
  },
};
