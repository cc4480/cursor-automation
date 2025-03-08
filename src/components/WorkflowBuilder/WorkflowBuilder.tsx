import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Paper, Grid } from '@mui/material';
import './WorkflowBuilder.css';

interface WorkflowAction {
  type: 'send_email' | 'api_call' | 'data_process';
  config?: Record<string, unknown>;
}

interface WorkflowCondition {
  type: 'if' | 'else' | 'loop';
  config?: Record<string, unknown>;
}

interface Workflow {
  name: string;
  trigger: 'schedule' | 'event' | 'api' | null;
  actions: WorkflowAction[];
  conditions: WorkflowCondition[];
}

const WorkflowBuilder: React.FC = () => {
  const [workflow, setWorkflow] = useState<Workflow>({
    name: '',
    trigger: null,
    actions: [],
    conditions: []
  });

  const handleTriggerSelect = (trigger: Workflow['trigger']): void => {
    setWorkflow(prev => ({ ...prev, trigger }));
  };

  const handleAddAction = (action: WorkflowAction): void => {
    setWorkflow(prev => ({ ...prev, actions: [...prev.actions, action] }));
  };

  const handleAddCondition = (condition: WorkflowCondition): void => {
    setWorkflow(prev => ({ ...prev, conditions: [...prev.conditions, condition] }));
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setWorkflow(prev => ({ ...prev, name: event.target.value }));
  };

  return (
    <Box className="workflow-builder">
      <Typography variant="h4" component="h2" gutterBottom>
        Workflow Builder
      </Typography>
      
      <Paper className="workflow-section" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Workflow Name
        </Typography>
        <TextField
          fullWidth
          value={workflow.name}
          onChange={handleNameChange}
          placeholder="Enter workflow name"
          variant="outlined"
        />
      </Paper>

      <Paper className="workflow-section" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Trigger
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant={workflow.trigger === 'schedule' ? 'contained' : 'outlined'}
              onClick={() => handleTriggerSelect('schedule')}
            >
              Schedule
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={workflow.trigger === 'event' ? 'contained' : 'outlined'}
              onClick={() => handleTriggerSelect('event')}
            >
              Event
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant={workflow.trigger === 'api' ? 'contained' : 'outlined'}
              onClick={() => handleTriggerSelect('api')}
            >
              API Call
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="workflow-section" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Actions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddAction({ type: 'send_email' })}
            >
              Send Email
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddAction({ type: 'api_call' })}
            >
              API Call
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddAction({ type: 'data_process' })}
            >
              Process Data
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="workflow-section" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Conditions
        </Typography>
        <Grid container spacing={2}>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddCondition({ type: 'if' })}
            >
              If
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddCondition({ type: 'else' })}
            >
              Else
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="outlined"
              onClick={() => handleAddCondition({ type: 'loop' })}
            >
              Loop
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper className="workflow-preview" elevation={2}>
        <Typography variant="h6" gutterBottom>
          Workflow Preview
        </Typography>
        <pre>{JSON.stringify(workflow, null, 2)}</pre>
      </Paper>
    </Box>
  );
};

export default WorkflowBuilder; 