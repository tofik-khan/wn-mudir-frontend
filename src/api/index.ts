import { adminAPI } from "./mudir/admins";
import { imagesAPI } from "./mudir/images";
import { projectsAPI } from "./waqfeardhi/projects";

export const API = {
  ...adminAPI,
  ...imagesAPI,
  ...projectsAPI,
};
