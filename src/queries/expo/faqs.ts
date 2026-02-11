import { API } from "@/api";
import { FAQ } from "@/types/expo";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useFaqQuery = () => {
  return useQuery({
    queryKey: ["faqs"],
    queryFn: API.getFAQs,
    select: (response) => response.data,
  });
};

export const useOneFaqQuery = (id) => {
  return useQuery({
    queryKey: ["faqs", id],
    queryFn: () => API.getOneFAQ(id),
    select: (response) => response.data[0] ?? {},
    enabled: id !== "new",
  });
};

export const useFaqMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  return useMutation({
    mutationFn: async ({ data }: { data: FAQ }) => {
      const authToken = await getAccessTokenSilently();
      return API.createFAQ({ authToken, reqBody: data });
    },
    onSuccess,
    onError,
  });
};

export const useUpdateFaqMutation = ({ onSuccess, onError }) => {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ data, id }: { data: FAQ; id: string }) => {
      const authToken = await getAccessTokenSilently();
      return API.updateFAQ({ authToken, id, reqBody: data });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      onSuccess();
    },
    onError,
  });
};
