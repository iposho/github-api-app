import { useParams } from 'react-router-dom';

import {
  Alert,
  AlertTitle,
  Avatar,
  Box,
  CircularProgress,
  Typography,
} from '@mui/material';

import { useGetUserProfileQuery } from '../store/api/githubApi';

import LastRepositories from '../components/LastRepositories';

const UserProfile: React.FC = () => {
  const { username } = useParams();

  const { data, isError, isLoading } = useGetUserProfileQuery(username!);

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
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                paddingTop: '1rem',
              }}
            >
              <Avatar
                sx={{
                  boxShadow: '8px 8px 45px -15px rgba(153,153,153,1)',
                  width: 100,
                  height: 100,
                }}
                src={data.avatar_url}
                alt={`${data.login}'s avatar`}
              />
              <Box
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  marginTop: '1rem',
                  justifyContent: 'center',
                }}
              >
                <Typography
                  variant="h4"
                  component="h1"
                  sx={{
                    textAlign: 'center',
                  }}
                >
                  {data.login}
                </Typography>
                <Typography
                  sx={{
                    textAlign: 'center',
                    width: '100%',
                    maxWidth: '480px',
                  }}
                  variant="h6"
                  color="text.secondary"
                >
                  {data.bio}
                </Typography>
              </Box>
            </Box>
            <LastRepositories username={username!} />
          </>
        )
      }
    </>
  );
};

export default UserProfile;
