import React, { useState, KeyboardEvent } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  Button,
  TextField,
} from '@mui/material';

import GitHubIcon from '@mui/icons-material/GitHub';

const Home: React.FC = () => {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate(`/${username}`);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleButtonClick();
    }
  };

  return (
    <>
      <Box>
        <h1>
          <GitHubIcon />
          {' '}
          Github API Viewer
        </h1>
      </Box>
      <Box
        sx={{
          display: 'flex',
          width: '100%',
          maxWidth: '500px',
          flexDirection: 'column',
        }}
      >
        <TextField
          id="standard-basic"
          label="Github username"
          variant="standard"
          sx={{
            width: '100%',
            marginBottom: '1rem',
            textAlign: 'center',
          }}
          value={username}
          onKeyDown={handleKeyDown}
          onChange={(e) => setUsername(e.target.value)}
        />
        <Button
          variant="contained"
          onClick={handleButtonClick}
          type="button"
          disabled={username.length < 3}
        >
          Get It!
        </Button>
      </Box>
    </>
  );
};

export default Home;
