import { useMutation, useQuery } from "@tanstack/react-query";
import { API } from "@/api";
import { useAuth0 } from "@auth0/auth0-react";

export const useApplicantsQuery = () => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  return useQuery({
    queryKey: ["waqfeardhi/applicants"],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getApplicants({ authToken: token });
    },
    select: (response) => response.data,
    enabled: isAuthenticated,
  });
};

export const useOneApplicantQuery = ({ _id }) => {
  const { getAccessTokenSilently, isAuthenticated } = useAuth0();

  return useQuery({
    queryKey: ["waqfeardhi/applicants/", `${_id}`],
    queryFn: async () => {
      const token = await getAccessTokenSilently();
      return API.getOneApplicant({ authToken: token, _id });
    },
    select: (response) => response.data,
    enabled: isAuthenticated,
  });
};

export const useUpdateStatusMutation = () => {
  return useMutation({
    mutationFn: ({
      authToken,
      status,
      _id,
    }: {
      authToken: string;
      status: string;
      _id: string;
    }) => API.updateApplicantStatus({ authToken, _id, status }),
  });
};
