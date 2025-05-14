import { useQuery } from "@tanstack/react-query";
import { API } from "@/api";

export const useAdminsQuery = () =>
  useQuery({
    queryKey: ["admins"],
    queryFn: API.getAdmins,
    select: (response) => response.data,
  });