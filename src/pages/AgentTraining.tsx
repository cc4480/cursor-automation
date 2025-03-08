import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  LinearProgress,
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Agent } from '../store/slices/agentsSlice';
import { addAgent, updateAgent, deleteAgent } from '../store/slices/agentsSlice';
import { addNotification } from '../store/slices/uiSlice';

const AgentTraining: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const agents = useSelector((state: RootState) => state.agents.agents);
  const trainingProgress = useSelector((state: RootState) => state.agents.trainingProgress);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingAgent, setEditingAgent] = useState<Agent | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    model_path: '',
    personality_id: '',
    training_data: {
      urls: [],
      files: [],
      selectors: {},
    },
    training_config: {
      epochs: 3,
      batch_size: 32,
      learning_rate: 2e-5,
    },
    status: 'idle' as Agent['status'],
  });

  const handleOpenDialog = (agent?: Agent) => {
    if (agent) {
      setEditingAgent(agent);
      setFormData(agent);
    } else {
      setEditingAgent(null);
      setFormData({
        name: '',
        description: '',
        model_path: '',
        personality_id: '',
        training_data: {
          urls: [],
          files: [],
          selectors: {},
        },
        training_config: {
          epochs: 3,
          batch_size: 32,
          learning_rate: 2e-5,
        },
        status: 'idle',
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingAgent(null);
  };

  const handleSubmit = () => {
    if (editingAgent) {
      dispatch(updateAgent({ ...formData, id: editingAgent.id }));
      dispatch(addNotification({
        type: 'success',
        message: 'Agent updated successfully',
      }));
    } else {
      dispatch(addAgent({
        ...formData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      dispatch(addNotification({
        type: 'success',
        message: 'Agent created successfully',
      }));
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteAgent(id));
    dispatch(addNotification({
      type: 'success',
      message: 'Agent deleted successfully',
    }));
  };

  const handleStartTraining = (agent: Agent) => {
    dispatch(updateAgent({
      ...agent,
      status: 'training',
      updated_at: new Date().toISOString(),
    }));
    dispatch(addNotification({
      type: 'info',
      message: 'Agent training started',
    }));
    // Implement actual training logic
  };

  const handleStopTraining = (agent: Agent) => {
    dispatch(updateAgent({
      ...agent,
      status: 'idle',
      updated_at: new Date().toISOString(),
    }));
    dispatch(addNotification({
      type: 'info',
      message: 'Agent training stopped',
    }));
    // Implement stop training logic
  };

  const getStatusColor = (status: Agent['status']) => {
    switch (status) {
      case 'ready':
        return 'success';
      case 'training':
        return 'primary';
      case 'error':
        return 'error';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Agent Training</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Agent
        </Button>
      </Box>

      <Grid container spacing={3}>
        {agents.map((agent) => (
          <Grid item xs={12} md={6} key={agent.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{agent.name}</Typography>
                  <Box>
                    {agent.status === 'training' ? (
                      <IconButton
                        color="error"
                        onClick={() => handleStopTraining(agent)}
                      >
                        <StopIcon />
                      </IconButton>
                    ) : (
                      <IconButton
                        color="primary"
                        onClick={() => handleStartTraining(agent)}
                      >
                        <PlayIcon />
                      </IconButton>
                    )}
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(agent)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(agent.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {agent.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Status:
                  </Typography>
                  <Chip
                    label={agent.status}
                    color={getStatusColor(agent.status)}
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>
                {agent.status === 'training' && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Training Progress:
                    </Typography>
                    <LinearProgress
                      variant="determinate"
                      value={trainingProgress[agent.id] || 0}
                      sx={{ mt: 1 }}
                    />
                  </Box>
                )}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Training Data:
                  </Typography>
                  <List dense>
                    {agent.training_data.urls.map((url, index) => (
                      <ListItem key={`url-${index}`}>
                        <ListItemText primary={url} />
                      </ListItem>
                    ))}
                    {agent.training_data.files.map((file, index) => (
                      <ListItem key={`file-${index}`}>
                        <ListItemText primary={file} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Training Config:
                  </Typography>
                  <List dense>
                    <ListItem>
                      <ListItemText
                        primary="Epochs"
                        secondary={agent.training_config.epochs}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Batch Size"
                        secondary={agent.training_config.batch_size}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText
                        primary="Learning Rate"
                        secondary={agent.training_config.learning_rate}
                      />
                    </ListItem>
                  </List>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingAgent ? 'Edit Agent' : 'Create New Agent'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              multiline
              rows={3}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Model Path"
              value={formData.model_path}
              onChange={(e) => setFormData({ ...formData, model_path: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Personality</InputLabel>
              <Select
                value={formData.personality_id}
                onChange={(e) => setFormData({ ...formData, personality_id: e.target.value })}
                label="Personality"
              >
                <MenuItem value="">None</MenuItem>
                {/* Add personality options */}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Training URLs (comma-separated)"
              value={formData.training_data.urls.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                training_data: {
                  ...formData.training_data,
                  urls: e.target.value.split(',').map(url => url.trim()),
                },
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Training Files (comma-separated)"
              value={formData.training_data.files.join(', ')}
              onChange={(e) => setFormData({
                ...formData,
                training_data: {
                  ...formData.training_data,
                  files: e.target.value.split(',').map(file => file.trim()),
                },
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Epochs"
              value={formData.training_config.epochs}
              onChange={(e) => setFormData({
                ...formData,
                training_config: {
                  ...formData.training_config,
                  epochs: parseInt(e.target.value),
                },
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Batch Size"
              value={formData.training_config.batch_size}
              onChange={(e) => setFormData({
                ...formData,
                training_config: {
                  ...formData.training_config,
                  batch_size: parseInt(e.target.value),
                },
              })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              type="number"
              label="Learning Rate"
              value={formData.training_config.learning_rate}
              onChange={(e) => setFormData({
                ...formData,
                training_config: {
                  ...formData.training_config,
                  learning_rate: parseFloat(e.target.value),
                },
              })}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingAgent ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentTraining; 