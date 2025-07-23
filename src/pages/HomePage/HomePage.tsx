import { Box, Typography, Button } from '@mui/material';
import { UserTable } from '@entities/user/ui/UserTable';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <Box>
      <Box display="flex" justifyContent="space-between" mb={2}>
        <Typography variant="h4">Пользователи</Typography>
        <Button
          variant="contained"
          onClick={() => navigate('/user/create')}
        >
          Создать пользователя
        </Button>
      </Box>
      <UserTable />
    </Box>
  );
};

export default HomePage;
