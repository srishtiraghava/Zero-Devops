import { endpoints } from "@/lib/api/endpoints";
import { httpClient } from "@/lib/api/http-client";
import type { ApiSuccess } from "@/types/api";
import type { GithubInstallation, GithubRepositoryList } from "@/types/domain";

export async function getGithubInstallation(signal?: AbortSignal): Promise<GithubInstallation> {
  const { data } = await httpClient.get<ApiSuccess<GithubInstallation>>(endpoints.github.installation, signal ? { signal } : undefined);
  return data.data;
}

export async function listGithubRepositories(query = "", signal?: AbortSignal): Promise<GithubRepositoryList> {
  const { data } = await httpClient.get<ApiSuccess<GithubRepositoryList>>(endpoints.github.repositories, { params: { query: query || undefined, per_page: 100 }, ...(signal ? { signal } : {}) });
  return data.data;
}

export async function deleteGithubInstallation(): Promise<void> {
  await httpClient.delete(endpoints.github.deleteInstallation);
}
