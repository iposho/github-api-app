import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IStarredRepo } from '../../models/models';

export const githubApi = createApi({
  reducerPath: 'githubApi',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.github.com/' }),
  endpoints: (builder) => ({
    getUserProfile: builder.query({
      query: (username: string) => `users/${username}`,
    }),
    getUserRepos: builder.query({
      query: (username: string) => `users/${username}/repos?per_page=10`,
    }),
    getStarredRepos: builder.query({
      query: ({ username, page }: { username: string; page: number }) => `users/${username}/starred?per_page=10&page=${page}`,
      transformResponse: async (response, meta): Promise<{ repos: IStarredRepo[]; links: { next?: number; last?: number } }> => {
        const linkHeader = meta?.response?.headers.get('Link');
        const nextPageMatch = linkHeader?.match(/<.*?&page=(\d+)>;\s*rel="next"/);
        const lastPageMatch = linkHeader?.match(/<.*?&page=(\d+)>;\s*rel="last"/);

        const next = nextPageMatch ? parseInt(nextPageMatch[1], 10) : undefined;
        const last = lastPageMatch ? parseInt(lastPageMatch[1], 10) : undefined;

        const links = { next, last };
        const repos = await response as IStarredRepo[];

        return { repos, links };
      },
    }),
    getRepository: builder.query({
      query: (repoFullName: string) => `repos/${repoFullName}`,
    }),
    getBranches: builder.query({
      query: (repoFullName: string) => `repos/${repoFullName}/branches`,
    }),
  }),
});

export const {
  useGetUserProfileQuery,
  useGetUserReposQuery,
  useGetStarredReposQuery,
  useGetRepositoryQuery,
  useGetBranchesQuery,
} = githubApi;
