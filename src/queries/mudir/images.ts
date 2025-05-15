import { useQuery } from "@tanstack/react-query";
import { API } from "@/api";

export const useImageKitAuthQuery = () => {
  return useQuery({
    queryKey: ["image/auth"],
    queryFn: API.getImageKitAuth,
    select: (response) => response.data,
  });
};
