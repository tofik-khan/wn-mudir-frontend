import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";
import { Session } from "@/types/expo";

export const useSessionsQuery = () => {
  return useQuery({
    queryKey: ["sessions"],
    queryFn: API.getSessions,
    select: (response) => response.data,
  });
};

export const useOneSessionQuery = (id) => {
  return useQuery({
    queryKey: ["session", id],
    queryFn: () => API.getOneSession(id),
    select: (response) => response.data[0] ?? {},
    enabled: id !== "new",
  });
};

export const useSessionMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ data }: { data: Session }) => {
      const authToken = await getAccessTokenSilently();
      API.createSession({ authToken, reqBody: data });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateSessionMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: Session; id: string }) => {
      const authToken = await getAccessTokenSilently();
      API.updateSession({ authToken, id, reqBody: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["session"] });
      queryClient.invalidateQueries({ queryKey: ["sessions"] });
      onSuccess();
    },
    onError,
  });
};
