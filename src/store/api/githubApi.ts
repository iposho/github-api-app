import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
      query: (username: string) => `users/${username}/starred`,
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
