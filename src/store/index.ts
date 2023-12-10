import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './api/githubApi';

const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

export default store;
