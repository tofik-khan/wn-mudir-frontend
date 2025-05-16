import { useQuery } from "@tanstack/react-query";
import { API } from "@/api";
import { Folder } from "@/types/images";

export const useImageKitAuthQuery = () => {
  return useQuery({
    queryKey: ["image/auth"],
    queryFn: API.getImageKitAuth,
    select: (response) => response.data,
  });
};

export const useImageKitGetFolderAssets = ({ folder }: { folder: Folder }) => {
  return useQuery({
    queryKey: ["images", folder.id],
    queryFn: () => API.getImagesInFolder({ folder }),
    select: (response) => response.data,
    enabled: !!folder,
  });
};
