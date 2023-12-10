import React from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Avatar,
  Box, Button,
  CircularProgress,
  Typography,
} from '@mui/material';

import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Branches from '../components/Branches';

import { useGetRepositoryQuery } from '../store/api/githubApi';

const RepositoryDetails: React.FC = () => {
  const { repoName, username } = useParams();
  const repoFullName = `${username}/${repoName}`;

  const { data, isError, isLoading } = useGetRepositoryQuery(repoFullName);

  const navigate = useNavigate();

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
                textAlign: 'center',
              }}
            >
              <Button
                variant="outlined"
                type="button"
                onClick={() => navigate(-1)}
                sx={{
                  marginBottom: '1rem',
                }}
              >
                <ArrowBackIcon />
                Go back
              </Button>
              <Typography
                variant="h4"
                component="h1"
                sx={{
                  textAlign: 'center',
                }}
              >
                {data.name}
              </Typography>
              <Link
                to={`/${data.owner.login}`}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: '1rem',
                }}
              >
                <Avatar
                  sx={{
                    boxShadow: '8px 8px 45px -15px rgba(153,153,153,1)',
                    width: '1rem',
                    height: '1rem',
                    marginRight: '.5rem',
                  }}
                  src={data.owner.avatar_url}
                  alt={`${data.owner.login}'s avatar`}
                />
                {data.owner.login}
              </Link>
              <Typography
                sx={{
                  width: '100%',
                  marginBottom: '1rem',
                  textAlign: 'center',
                }}
                color="text.secondary"
              >
                {data.description}
              </Typography>
            </Box>
            <Branches repoName={repoFullName} />
          </>
        )
      }
    </>
  );
};

export default RepositoryDetails;
