import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  CircularProgress,
  Pagination,
  Stack,
  Typography,
} from '@mui/material';

import { useGetStarredReposQuery } from '../store/api/githubApi';

import { IStarredRepo } from '../models/models';

const StarredRepos: React.FC = () => {
  const [page, setPage] = useState(1);
  const { username } = useParams();
  const {
    data, isError, isLoading,
  } = useGetStarredReposQuery({ username: username!, page });

  const links = data?.links;
  const lastPage = links?.last || page;

  const handlePageChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  return (
    <>
      {
        isError
        && (
          <Alert severity="error">
            <AlertTitle>Error</AlertTitle>
            Something went wrong
          </Alert>
        )
      }
      {
        isLoading && <CircularProgress size={60} />
      }
      {
        data && (
          <>
            <Box
              sx={{
                width: '100%',
                maxWidth: '768px',
                marginTop: '1rem',
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: 'center',
                }}
              >
                Starred repositories by
                {' '}
                <Link to={`/${username}`}>
                  {username}
                </Link>
              </Typography>
            </Box>
            <Stack spacing={2} sx={{ margin: '1rem 0' }}>
              <Pagination
                count={lastPage}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                width: '100%',
                maxWidth: '768px',
              }}
            >
              {data?.repos.map((repo: IStarredRepo) => (
                <li
                  style={{
                    marginBottom: '1rem',
                    width: '100%',
                  }}
                  key={repo.id}
                >
                  <Card
                    sx={{
                      width: '100%',
                      padding: '15px',
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        flexDirection: 'column',
                      }}
                    >
                      <Link
                        style={{ fontSize: '1.5rem' }}
                        to={`/${repo.full_name}`}
                      >
                        {repo.name}
                      </Link>
                      <Typography
                        sx={{
                          width: '100%',
                          marginBottom: '1rem',
                        }}
                        color="text.secondary"
                      >
                        {repo.description}
                      </Typography>
                      <Link
                        to={`/${repo.owner.login}`}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                        }}
                      >
                        <Avatar
                          sx={{
                            boxShadow: '8px 8px 45px -15px rgba(153,153,153,1)',
                            width: '1rem',
                            height: '1rem',
                            marginRight: '.5rem',
                          }}
                          src={repo.owner.avatar_url}
                          alt={`${repo.owner.login}'s avatar`}
                        />
                        {repo.owner.login}
                      </Link>
                    </Box>
                  </Card>
                </li>
              ))}
            </ul>
            <Stack spacing={2} sx={{ margin: '1rem 0' }}>
              <Pagination
                count={lastPage}
                page={page}
                onChange={handlePageChange}
              />
            </Stack>
          </>
        )
      }
    </>
  );
};

export default StarredRepos;
