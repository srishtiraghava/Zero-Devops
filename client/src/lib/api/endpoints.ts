export const endpoints = {
  auth: {
    githubLogin: "/auth/github/login",
    logout: "/auth/logout",
    refresh: "/auth/refresh",
    me: "/auth/user/me",
  },
  projects: {
    list: "/projects",
    create: "/projects",
    byId: (id: string) => `/projects/${id}`,
    builds: (id: string) => `/projects/${id}/builds`,
  },
  builds: {
    byId: (id: string) => `/builds/${id}`,
  },
  github: {
    repositories: "/integrations/github/repositories",
    installation: "/integrations/github/installation",
    deleteInstallation: "/integration/scm/github/delete",
  },
} as const;
