import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, CssBaseline, AppBar, Toolbar, Button, Container, Typography } from '@mui/material';
import WorkflowBuilder from './components/WorkflowBuilder/WorkflowBuilder';
import theme from './theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/workflow">
              Workflow Builder
            </Button>
            <Button color="inherit" component={Link} to="/training">
              Agent Training
            </Button>
          </Toolbar>
        </AppBar>
        <Container maxWidth="lg" sx={{ mt: 4 }}>
          <Routes>
            <Route path="/" element={
              <Typography variant="h4" component="h1" gutterBottom>
                Welcome to AI Agent Platform
              </Typography>
            } />
            <Route path="/workflow" element={<WorkflowBuilder />} />
            <Route path="/training" element={
              <Typography variant="h4" component="h1" gutterBottom>
                Agent Training Module
              </Typography>
            } />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
};

export default App; 