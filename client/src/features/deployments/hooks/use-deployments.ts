"use client";

import { useQuery } from "@tanstack/react-query";
import type { Project } from "@/types/domain";
import { getDeployment, listProjectBuilds } from "../api/deployments-api";

export function useAllDeployments(projects: Project[]) {
  const ids = projects.map((project) => project.id);
  return useQuery({
    queryKey: ["deployments", "all", ...ids] as const,
    enabled: ids.length > 0,
    queryFn: async ({ signal }) => {
      const lists = await Promise.all(ids.map((id) => listProjectBuilds(id, signal)));
      return lists.flat();
    },
    refetchInterval: (query) =>
      query.state.data?.some((build) => build.status === "pending" || build.status === "building") ? 3000 : false,
  });
}

export function useDeployment(id: string) {
  return useQuery({ queryKey: ["deployments", id] as const, queryFn: ({ signal }) => getDeployment(id, signal), enabled: Boolean(id) });
}
