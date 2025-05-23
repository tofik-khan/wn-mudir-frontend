import { adminAPI } from "./mudir/admins";
import { imagesAPI } from "./mudir/images";
import { applicantsAPI } from "./waqfeardhi/applicants";
import { projectsAPI } from "./waqfeardhi/projects";

export const API = {
  ...adminAPI,
  ...imagesAPI,
  ...projectsAPI,
  ...applicantsAPI,
};
