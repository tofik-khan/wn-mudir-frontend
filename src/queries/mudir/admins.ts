import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";

export const useAdminsQuery = () =>
  useQuery({
    queryKey: ["mudir/admins"],
    queryFn: API.getAdmins,
    select: (response) => response.data,
  });

/** MUTATIONS */

export const useAdminImageMutation = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ _id, image }: { _id: number; image: string }) =>
      API.updateAdminImage({ _id, image }),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["mudir/admins"] }),
  });
};

export const useAdminLastLoginMutation = () => {
  return useMutation({
    mutationFn: ({ _id }: { _id: number }) => API.updateLastLogin({ _id }),
  });
};
