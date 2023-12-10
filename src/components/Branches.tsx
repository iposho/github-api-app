import React from 'react';

import {
  Alert,
  AlertTitle,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useGetBranchesQuery } from '../store/api/githubApi';
import { IBranch } from '../models/models';

interface IBranchesProps {
  repoName: string;
}

const Branches: React.FC<IBranchesProps> = ({ repoName }) => {
  const { data, isError, isLoading } = useGetBranchesQuery(repoName);

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
          <Box>
            <Typography
              variant="h6"
              component="h1"
              sx={{
                textAlign: 'center',
              }}
            >
              Branches
            </Typography>
            <ul
              style={{
                listStyleType: 'none',
                padding: 0,
                width: '100%',
                maxWidth: '768px',
                textAlign: 'center',
              }}
            >
              {
                data.map((branch: IBranch) => (
                  <li
                    style={{
                      marginBottom: '1rem',
                      width: '100%',
                    }}
                    key={branch.commit.sha}
                  >
                    {branch.name}
                  </li>
                ))
              }
            </ul>
          </Box>
        )
      }
    </>
  );
};

export default Branches;
