import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { API } from "@/api";
import { Project } from "@/types/waqfeardhi";
import { useNavigate } from "react-router";

export const useProjectsQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/projects"],
    queryFn: API.getProjects,
    select: (response) => response.data,
  });

/** MUTATIONS */

export const useCreateProjectMutation = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  return useMutation({
    mutationFn: ({ authToken, data }: { authToken: string; data: Project }) =>
      API.createProject({ authToken, data }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["waqfeardhi/projects"] });
      navigate("/protected/waqfeardhi/projects");
    },
  });
};
