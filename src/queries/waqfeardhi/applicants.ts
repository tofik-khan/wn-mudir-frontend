import { useQuery } from "@tanstack/react-query";
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
