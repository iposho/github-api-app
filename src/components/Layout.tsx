import React, { ReactNode } from 'react';

import {
  Container,
} from '@mui/material';

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => (
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
);

export default Layout;
