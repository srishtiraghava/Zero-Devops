import { endpoints } from "@/lib/api/endpoints";
import { httpClient } from "@/lib/api/http-client";
import type { ApiSuccess } from "@/types/api";
import type { Deployment } from "@/types/domain";

export async function listProjectBuilds(projectId: string, signal?: AbortSignal): Promise<Deployment[]> {
  const { data } = await httpClient.get<ApiSuccess<Deployment[]>>(endpoints.projects.builds(projectId), signal ? { signal } : undefined);
  return data.data;
}

export async function getDeployment(id: string, signal?: AbortSignal): Promise<Deployment> {
  const { data } = await httpClient.get<ApiSuccess<Deployment>>(endpoints.builds.byId(id), signal ? { signal } : undefined);
  return data.data;
}
