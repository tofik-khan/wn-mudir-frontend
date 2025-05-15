import { adminAPI } from "./mudir/admins";
import { imagesAPI } from "./mudir/images";

export const API = {
  ...adminAPI,
  ...imagesAPI,
};
