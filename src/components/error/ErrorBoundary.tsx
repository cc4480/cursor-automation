import React, { Component, ErrorInfo, ReactNode } from 'react';
import {
  Box,
  Typography,
  Button,
  Container,
  Paper,
  useTheme,
} from '@mui/material';
import {
  Error as ErrorIcon,
  Refresh as RefreshIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
    errorInfo: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error, errorInfo: null };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo,
    });
  }

  public render() {
    if (this.state.hasError) {
      return <ErrorDisplay error={this.state.error} errorInfo={this.state.errorInfo} />;
    }

    return this.props.children;
  }
}

const ErrorDisplay: React.FC<{ error: Error | null; errorInfo: ErrorInfo | null }> = ({
  error,
  errorInfo,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();

  const handleRefresh = () => {
    window.location.reload();
  };

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container maxWidth="md">
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Paper
          elevation={3}
          sx={{
            p: 4,
            textAlign: 'center',
            maxWidth: 600,
            width: '100%',
          }}
        >
          <ErrorIcon
            sx={{
              fontSize: 64,
              color: 'error.main',
              mb: 2,
            }}
          />
          <Typography variant="h4" gutterBottom>
            Oops! Something went wrong
          </Typography>
          <Typography color="textSecondary" paragraph>
            We apologize for the inconvenience. An error has occurred in the application.
          </Typography>

          {process.env.NODE_ENV === 'development' && (
            <Box
              sx={{
                mt: 3,
                p: 2,
                bgcolor: 'grey.100',
                borderRadius: 1,
                textAlign: 'left',
                maxHeight: 200,
                overflow: 'auto',
              }}
            >
              <Typography variant="subtitle2" gutterBottom>
                Error Details:
              </Typography>
              <Typography
                component="pre"
                sx={{
                  fontSize: '0.875rem',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                }}
              >
                {error?.toString()}
              </Typography>
              {errorInfo && (
                <>
                  <Typography variant="subtitle2" sx={{ mt: 2 }} gutterBottom>
                    Component Stack:
                  </Typography>
                  <Typography
                    component="pre"
                    sx={{
                      fontSize: '0.875rem',
                      whiteSpace: 'pre-wrap',
                      wordBreak: 'break-word',
                    }}
                  >
                    {errorInfo.componentStack}
                  </Typography>
                </>
              )}
            </Box>
          )}

          <Box sx={{ mt: 4, display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
            >
              Refresh Page
            </Button>
            <Button
              variant="outlined"
              startIcon={<HomeIcon />}
              onClick={handleGoHome}
            >
              Go to Home
            </Button>
          </Box>

          <Typography
            variant="body2"
            color="textSecondary"
            sx={{ mt: 4 }}
          >
            If the problem persists, please contact support or try again later.
          </Typography>
        </Paper>
      </Box>
    </Container>
  );
};

export default ErrorBoundary; 