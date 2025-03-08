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
  Chip,
  useTheme,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  PlayArrow as PlayIcon,
  Stop as StopIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Workflow } from '../store/slices/workflowsSlice';
import { addWorkflow, updateWorkflow, deleteWorkflow } from '../store/slices/workflowsSlice';
import { addNotification } from '../store/slices/uiSlice';

const WorkflowBuilder: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const workflows = useSelector((state: RootState) => state.workflows.workflows);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingWorkflow, setEditingWorkflow] = useState<Workflow | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    trigger: {
      type: '',
      config: {},
    },
    actions: [],
    conditions: [],
    enabled: true,
  });

  const handleOpenDialog = (workflow?: Workflow) => {
    if (workflow) {
      setEditingWorkflow(workflow);
      setFormData(workflow);
    } else {
      setEditingWorkflow(null);
      setFormData({
        name: '',
        description: '',
        trigger: {
          type: '',
          config: {},
        },
        actions: [],
        conditions: [],
        enabled: true,
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingWorkflow(null);
  };

  const handleSubmit = () => {
    if (editingWorkflow) {
      dispatch(updateWorkflow({ ...formData, id: editingWorkflow.id }));
      dispatch(addNotification({
        type: 'success',
        message: 'Workflow updated successfully',
      }));
    } else {
      dispatch(addWorkflow({
        ...formData,
        id: Date.now().toString(),
      }));
      dispatch(addNotification({
        type: 'success',
        message: 'Workflow created successfully',
      }));
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    dispatch(deleteWorkflow(id));
    dispatch(addNotification({
      type: 'success',
      message: 'Workflow deleted successfully',
    }));
  };

  const handleToggleEnabled = (workflow: Workflow) => {
    dispatch(updateWorkflow({
      ...workflow,
      enabled: !workflow.enabled,
    }));
    dispatch(addNotification({
      type: 'info',
      message: `Workflow ${workflow.enabled ? 'disabled' : 'enabled'} successfully`,
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Workflow Builder</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Workflow
        </Button>
      </Box>

      <Grid container spacing={3}>
        {workflows.map((workflow) => (
          <Grid item xs={12} md={6} key={workflow.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{workflow.name}</Typography>
                  <Box>
                    <IconButton
                      color={workflow.enabled ? 'success' : 'error'}
                      onClick={() => handleToggleEnabled(workflow)}
                    >
                      {workflow.enabled ? <PlayIcon /> : <StopIcon />}
                    </IconButton>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(workflow)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(workflow.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {workflow.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Trigger:
                  </Typography>
                  <Chip
                    label={workflow.trigger.type}
                    color="primary"
                    size="small"
                    sx={{ mr: 1 }}
                  />
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Actions:
                  </Typography>
                  <List dense>
                    {workflow.actions.map((action, index) => (
                      <ListItem key={index}>
                        <ListItemText
                          primary={action.type}
                          secondary={JSON.stringify(action.config)}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                {workflow.conditions && workflow.conditions.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Conditions:
                    </Typography>
                    <List dense>
                      {workflow.conditions.map((condition, index) => (
                        <ListItem key={index}>
                          <ListItemText
                            primary={`${condition.field} ${condition.operator} ${condition.value}`}
                          />
                        </ListItem>
                      ))}
                    </List>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {editingWorkflow ? 'Edit Workflow' : 'Create New Workflow'}
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
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Trigger Type</InputLabel>
              <Select
                value={formData.trigger.type}
                onChange={(e) => setFormData({
                  ...formData,
                  trigger: { ...formData.trigger, type: e.target.value },
                })}
                label="Trigger Type"
              >
                <MenuItem value="scheduled">Scheduled</MenuItem>
                <MenuItem value="event_based">Event Based</MenuItem>
                <MenuItem value="manual">Manual</MenuItem>
                <MenuItem value="api_call">API Call</MenuItem>
              </Select>
            </FormControl>
            {/* Add more form fields for actions and conditions */}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingWorkflow ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default WorkflowBuilder; 