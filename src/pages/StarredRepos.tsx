import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import {
  Avatar,
  Box,
  Card,
  CircularProgress,
  Typography,
} from '@mui/material';

import { IStarredRepos } from '../models/models';

const RepositoryList: React.FC = () => {
  const { username } = useParams();
  const [starredRepos, setStarredRepos] = useState<IStarredRepos[] | null>(null);

  useEffect(() => {
    fetch(`https://api.github.com/users/${username}/starred?per_page=10`)
      .then((response) => response.json())
      .then((data) => setStarredRepos(data))
      .catch((error) => console.error('Error fetching user data', error));
  }, [username]);

  console.log(starredRepos);

  return (
    <>
      {
        starredRepos
          ? (
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
                  {username}
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
                {starredRepos.map((repo) => (
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
                          to={`/repositories/${repo.owner.login}/${repo.name}`}
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
          : <CircularProgress />
      }
    </>
  );
};

export default RepositoryList;
