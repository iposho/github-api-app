import React, { ReactNode } from 'react';

import {
  Container,
  CssBaseline,
} from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
  <>
    <CssBaseline />
    <Container
      sx={{
        width: '100%',
        minHeight: '100vh',
        display: 'flex',
        justifyContent: 'start',
        alignItems: 'center',
        flexDirection: 'column',
      }}
    >
      {children}
    </Container>
  </>
);

export default Layout;
