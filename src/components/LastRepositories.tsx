import React from 'react';
import { Link } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Box,
  Button,
  Card,
  CircularProgress, Typography,
} from '@mui/material';

import StarIcon from '@mui/icons-material/Star';

import { useGetUserReposQuery } from '../store/api/githubApi';

import { IUserRepo } from '../models/models';

interface ILastRepositoriesProps {
  username: string;
}
const LastRepositories: React.FC<ILastRepositoriesProps> = ({ username }) => {
  const { data, isError, isLoading } = useGetUserReposQuery(username);

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
          <Box
            sx={{
              width: '100%',
              maxWidth: '768px',
              marginTop: '1rem',
            }}
          >
            <Link
              style={{
                display: 'flex',
                justifyContent: 'center',
                textDecoration: 'none',
                marginBottom: '1rem',
              }}
              to={`/${username}/starred`}
            >
              <Button
                variant="outlined"
                type="button"
              >
                <StarIcon />
                Starred repositories
              </Button>
            </Link>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                textAlign: 'center',
              }}
            >
              Last 10 repositories
            </Typography>
            <ul
              style={{ listStyleType: 'none', padding: 0 }}
            >
              {data.map((repo: IUserRepo) => (
                <li
                  style={{ marginBottom: '1rem' }}
                  key={repo.id}
                >
                  <Card
                    sx={{
                      padding: '15px',
                    }}
                  >
                    <Link
                      style={{ fontSize: '1.5rem' }}
                      to={`/${repo.full_name}`}
                    >
                      {repo.name}
                    </Link>
                    <div>{repo.description}</div>
                  </Card>
                </li>
              ))}
            </ul>
          </Box>
        )
      }
    </>
  );
};

export default LastRepositories;
