import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Presenter } from "@/types/expo";

export const usePresentersQuery = () => {
  return useQuery({
    queryKey: ["presenters"],
    queryFn: API.getPresenters,
    select: (response) => response.data,
  });
};

export const useOnePresenterQuery = (id) => {
  return useQuery({
    queryKey: ["presenters", id],
    queryFn: () => API.getOnePresenter(id),
    select: (response) => response.data[0] ?? {},
    enabled: id !== "new",
  });
};

export const usePresenterMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ data }: { data: Presenter }) => {
      const authToken = await getAccessTokenSilently();
      return API.createPresenter({ authToken, reqBody: data });
    },
    onSuccess,
    onError,
  });
};

export const useUpdatePresenterMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: Presenter; id: string }) => {
      const authToken = await getAccessTokenSilently();
      return API.updatePresenter({ authToken, id, reqBody: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["presenters"] });
      onSuccess();
    },
    onError,
  });
};
