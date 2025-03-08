import React from 'react';
import {
  Box,
  CircularProgress,
  Typography,
  Backdrop,
  useTheme,
} from '@mui/material';
import { Loading as LoadingIcon } from '@mui/icons-material';

interface LoadingProps {
  fullScreen?: boolean;
  message?: string;
  size?: number;
}

const Loading: React.FC<LoadingProps> = ({
  fullScreen = false,
  message = 'Loading...',
  size = 40,
}) => {
  const theme = useTheme();

  if (fullScreen) {
    return (
      <Backdrop
        sx={{
          color: '#fff',
          zIndex: theme.zIndex.drawer + 1,
          flexDirection: 'column',
        }}
        open={true}
      >
        <CircularProgress color="inherit" size={size} />
        <Typography
          variant="h6"
          sx={{
            mt: 2,
            color: 'inherit',
          }}
        >
          {message}
        </Typography>
      </Backdrop>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 3,
      }}
    >
      <CircularProgress size={size} />
      <Typography
        variant="body1"
        sx={{
          mt: 2,
          color: 'text.secondary',
        }}
      >
        {message}
      </Typography>
    </Box>
  );
};

export default Loading; 