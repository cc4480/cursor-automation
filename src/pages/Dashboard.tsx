import React from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  IconButton,
  Button,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { RootState } from '../store';
import { addNotification } from '../store/slices/uiSlice';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const workflows = useSelector((state: RootState) => state.workflows.workflows);
  const agents = useSelector((state: RootState) => state.agents.agents);
  const personalities = useSelector((state: RootState) => state.personalities.personalities);

  const activeWorkflows = workflows.filter(w => w.enabled).length;
  const activeAgents = agents.filter(a => a.status === 'ready').length;
  const trainingAgents = agents.filter(a => a.status === 'training').length;

  const handleCreateWorkflow = () => {
    navigate('/workflows/new');
  };

  const handleCreateAgent = () => {
    navigate('/training/new');
  };

  const handleCreatePersonality = () => {
    navigate('/personalities/new');
  };

  const handleRefresh = () => {
    dispatch(addNotification({
      type: 'info',
      message: 'Refreshing dashboard data...',
    }));
    // Implement refresh logic
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Dashboard</Typography>
        <IconButton onClick={handleRefresh}>
          <RefreshIcon />
        </IconButton>
      </Box>

      <Grid container spacing={3}>
        {/* Statistics Cards */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Active Workflows
              </Typography>
              <Typography variant="h3">
                {activeWorkflows} / {workflows.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(activeWorkflows / workflows.length) * 100}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Ready Agents
              </Typography>
              <Typography variant="h3">
                {activeAgents} / {agents.length}
              </Typography>
              <LinearProgress
                variant="determinate"
                value={(activeAgents / agents.length) * 100}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                Training Agents
              </Typography>
              <Typography variant="h3">{trainingAgents}</Typography>
              <LinearProgress
                variant="determinate"
                value={(trainingAgents / agents.length) * 100}
                sx={{ mt: 1 }}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Actions */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Actions
              </Typography>
              <List>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create New Workflow"
                    secondary="Design and configure a new automation workflow"
                  />
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={handleCreateWorkflow}
                  >
                    Create
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Train New Agent"
                    secondary="Create and train a new AI agent"
                  />
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={handleCreateAgent}
                  >
                    Create
                  </Button>
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText
                    primary="Create New Personality"
                    secondary="Define a new agent personality"
                  />
                  <Button
                    variant="contained"
                    startIcon={<PlayIcon />}
                    onClick={handleCreatePersonality}
                  >
                    Create
                  </Button>
                </ListItem>
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity
              </Typography>
              <List>
                {workflows.slice(0, 5).map((workflow) => (
                  <ListItem key={workflow.id}>
                    <ListItemIcon>
                      {workflow.enabled ? (
                        <PlayIcon color="success" />
                      ) : (
                        <StopIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={workflow.name}
                      secondary={`Last run: ${new Date().toLocaleString()}`}
                    />
                  </ListItem>
                ))}
                {agents.slice(0, 5).map((agent) => (
                  <ListItem key={agent.id}>
                    <ListItemIcon>
                      {agent.status === 'ready' ? (
                        <PlayIcon color="success" />
                      ) : agent.status === 'training' ? (
                        <RefreshIcon color="primary" />
                      ) : (
                        <StopIcon color="error" />
                      )}
                    </ListItemIcon>
                    <ListItemText
                      primary={agent.name}
                      secondary={`Status: ${agent.status}`}
                    />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard; 