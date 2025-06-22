import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useApplicationsCountQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/applicationsCount"],
    queryFn: API.getApplicationsCount,
    select: (response) => response.data,
  });

export const useCompletedApplicationsCountQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/completedApplications"],
    queryFn: API.getCompletedApplicationsCount,
    select: (response) => response.data,
  });

export const useProjectsCountQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/projectsCount"],
    queryFn: API.getProjectsCount,
    select: (response) => response.data,
  });

export const useApplicationsCountByAuxiliaryQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/applicationsCountByAuxiliary"],
    queryFn: API.getApplicationsCountByAuxiliary,
    select: (response) => response.data,
  });

export const useApplicationsPerMonthQuery = () =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/applicationsPerMonth"],
    queryFn: API.getApplicationsPerMonth,
    select: (response) => response.data,
  });

export const useApplicationsByStatusQuery = (status) =>
  useQuery({
    queryKey: ["waqfeardhi/dashboard/applicationsByStatus", status],
    queryFn: () => API.getApplicationsCountByStatus({ status }),
    select: (response) => response.data,
  });
