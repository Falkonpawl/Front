import { Outlet } from 'react-router-dom';
import { Box, AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useAuth } from '../providers/AuthProvider';

export const Layout = () => {
  const { logoutUser, user } = useAuth();

  return (
    <Box>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Панель управления
          </Typography>
          <Typography variant="body1" sx={{ mr: 2 }}>
            {user?.email}
          </Typography>
          <Button color="inherit" onClick={logoutUser}>
            Выйти
          </Button>
        </Toolbar>
      </AppBar>
      <Box p={3}>
        <Outlet />
      </Box>
    </Box>
  );
};