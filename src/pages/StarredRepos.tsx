import React from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  Card,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useGetStarredReposQuery } from '../store/api/githubApi';

import { IStarredRepo } from '../models/models';

const RepositoryList: React.FC = () => {
  const { username } = useParams();
  const { data, isError, isLoading } = useGetStarredReposQuery(username!);

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
        data
        && (
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
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                width: '100%',
                maxWidth: '768px',
              }}
            >
              {data.map((repo: IStarredRepo) => (
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
          </>
        )
      }
    </>
  );
};

export default RepositoryList;
