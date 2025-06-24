import { API } from "@/api";
import { useQuery } from "@tanstack/react-query";

export const useImageKitUsageQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/imageKitUsage"],
    queryFn: API.getImageKitUsage,
    select: (response) => response.data,
  });

export const useDigitalOceanQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/status/digitalocean"],
    queryFn: API.getDigitalOceanStatus,
    select: (response) => response.data,
  });

export const useMongoDbQuery = () =>
  useQuery({
    queryKey: ["mudir/dashboard/status/mongodb"],
    queryFn: API.getMongoDbStatus,
    select: (response) => response.data,
  });
