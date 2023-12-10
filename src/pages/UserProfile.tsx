import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Typography,
} from '@mui/material';

import StarBorderIcon from '@mui/icons-material/StarBorder';

import {
  IUserData,
  IUserRepos,
} from '../models/models';

const UserProfile: React.FC = () => {
  const { username } = useParams();
  const [userData, setUserData] = useState<IUserData | null>(null);
  const [userRepos, setUserRepos] = useState<IUserRepos[] | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}`)
      .then((response) => response.json())
      .then((data) => setUserData(data))
      .catch((error) => console.error('Error fetching user data', error));
  }, [username]);

  useEffect(() => {
    if (userData?.repos_url) {
      fetch(`${userData.repos_url}?per_page=10`)
        .then((response) => response.json())
        .then((repos) => setUserRepos(repos))
        .catch((error) => console.error('Error fetching user repositories', error));
    }
  }, [userData]);

  return (
    <>
      {
        userData && userRepos
          ? (
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
                  src={userData.avatar_url}
                  alt={`${userData.login}'s avatar`}
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
                    {userData.login}
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
                    {userData.bio}
                  </Typography>
                </Box>
              </Box>
              <Box
                sx={{
                  width: '100%',
                  maxWidth: '768px',
                  marginTop: '1rem',
                }}
              >
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'space-around',
                    alignItems: 'center',
                    padding: '1rem 0',
                  }}
                >
                  <Typography
                    variant="h5"
                    component="h2"
                    sx={{
                      textAlign: 'center',
                    }}
                  >
                    Last 10 repositories
                  </Typography>
                  <span>|</span>
                  <Link to={`/starred/${username}`}>
                    <Typography
                      variant="h5"
                      component="h2"
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                      }}
                    >
                      <StarBorderIcon />
                      Starred repositories
                    </Typography>
                  </Link>
                </Box>
                <ul
                  style={{ listStyleType: 'none', padding: 0 }}
                >
                  {userRepos.map((repo) => (
                    <li
                      style={{ marginBottom: '1rem' }}
                      key={repo.id}
                    >
                      <Card
                        sx={{
                          padding: '15px',
                        }}
                      >
                        <a href={repo.html_url}>{repo.name}</a>
                        <div>{repo.description}</div>
                      </Card>
                    </li>
                  ))}
                </ul>
              </Box>
            </>
          )
          : <CircularProgress />
      }
    </>
  );
};

export default UserProfile;
