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
  Autocomplete,
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
  Psychology as PsychologyIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { Personality, PersonalityTrait } from '../store/slices/personalitiesSlice';
import {
  addPersonality,
  updatePersonality,
  deletePersonality,
  updatePersonalityTraits,
  updateStyleGuide,
  updateResponseTemplates,
  updateKnowledgeBase,
} from '../store/slices/personalitiesSlice';
import { addNotification } from '../store/slices/uiSlice';

const AgentPersonalities: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const personalities = useSelector((state: RootState) => state.personalities.personalities);
  const availableTraits = useSelector((state: RootState) => state.personalities.availableTraits);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingPersonality, setEditingPersonality] = useState<Personality | null>(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    traits: [] as PersonalityTrait[],
    style_guide: {} as Record<string, string>,
    response_templates: {} as Record<string, string>,
    knowledge_base: {} as Record<string, any>,
  });

  const handleOpenDialog = (personality?: Personality) => {
    if (personality) {
      setEditingPersonality(personality);
      setFormData(personality);
    } else {
      setEditingPersonality(null);
      setFormData({
        name: '',
        description: '',
        traits: [],
        style_guide: {},
        response_templates: {},
        knowledge_base: {},
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPersonality(null);
  };

  const handleSubmit = () => {
    if (editingPersonality) {
      dispatch(updatePersonality({ ...formData, id: editingPersonality.id }));
      dispatch(addNotification({
        type: 'success',
        message: 'Personality updated successfully',
      }));
    } else {
      dispatch(addPersonality({
        ...formData,
        id: Date.now().toString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }));
      dispatch(addNotification({
        type: 'success',
        message: 'Personality created successfully',
      }));
    }
    handleCloseDialog();
  };

  const handleDelete = (id: string) => {
    dispatch(deletePersonality(id));
    dispatch(addNotification({
      type: 'success',
      message: 'Personality deleted successfully',
    }));
  };

  const handleUpdateTraits = (personalityId: string, traits: PersonalityTrait[]) => {
    dispatch(updatePersonalityTraits({ personalityId, traits }));
    dispatch(addNotification({
      type: 'success',
      message: 'Personality traits updated successfully',
    }));
  };

  const handleUpdateStyleGuide = (personalityId: string, style_guide: Record<string, string>) => {
    dispatch(updateStyleGuide({ personalityId, style_guide }));
    dispatch(addNotification({
      type: 'success',
      message: 'Style guide updated successfully',
    }));
  };

  const handleUpdateResponseTemplates = (
    personalityId: string,
    response_templates: Record<string, string>
  ) => {
    dispatch(updateResponseTemplates({ personalityId, response_templates }));
    dispatch(addNotification({
      type: 'success',
      message: 'Response templates updated successfully',
    }));
  };

  const handleUpdateKnowledgeBase = (
    personalityId: string,
    knowledge_base: Record<string, any>
  ) => {
    dispatch(updateKnowledgeBase({ personalityId, knowledge_base }));
    dispatch(addNotification({
      type: 'success',
      message: 'Knowledge base updated successfully',
    }));
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
        <Typography variant="h4">Agent Personalities</Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Personality
        </Button>
      </Box>

      <Grid container spacing={3}>
        {personalities.map((personality) => (
          <Grid item xs={12} md={6} key={personality.id}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                  <Typography variant="h6">{personality.name}</Typography>
                  <Box>
                    <IconButton
                      color="primary"
                      onClick={() => handleOpenDialog(personality)}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton
                      color="error"
                      onClick={() => handleDelete(personality.id)}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Typography color="textSecondary" gutterBottom>
                  {personality.description}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Traits:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {personality.traits.map((trait) => (
                      <Chip
                        key={trait}
                        label={trait}
                        color="primary"
                        size="small"
                      />
                    ))}
                  </Box>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Style Guide:
                  </Typography>
                  <List dense>
                    {Object.entries(personality.style_guide).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key}
                          secondary={value}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Response Templates:
                  </Typography>
                  <List dense>
                    {Object.entries(personality.response_templates).map(([key, value]) => (
                      <ListItem key={key}>
                        <ListItemText
                          primary={key}
                          secondary={value}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Box>
                {personality.knowledge_base && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Knowledge Base:
                    </Typography>
                    <List dense>
                      {Object.entries(personality.knowledge_base).map(([key, value]) => (
                        <ListItem key={key}>
                          <ListItemText
                            primary={key}
                            secondary={typeof value === 'object' ? JSON.stringify(value) : value}
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
          {editingPersonality ? 'Edit Personality' : 'Create New Personality'}
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
            <Autocomplete
              multiple
              options={availableTraits}
              value={formData.traits}
              onChange={(_, newValue) => setFormData({ ...formData, traits: newValue })}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Traits"
                  placeholder="Select traits"
                />
              )}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Style Guide (JSON)"
              value={JSON.stringify(formData.style_guide, null, 2)}
              onChange={(e) => {
                try {
                  const styleGuide = JSON.parse(e.target.value);
                  setFormData({ ...formData, style_guide: styleGuide });
                } catch (error) {
                  // Handle invalid JSON
                }
              }}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Response Templates (JSON)"
              value={JSON.stringify(formData.response_templates, null, 2)}
              onChange={(e) => {
                try {
                  const templates = JSON.parse(e.target.value);
                  setFormData({ ...formData, response_templates: templates });
                } catch (error) {
                  // Handle invalid JSON
                }
              }}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Knowledge Base (JSON)"
              value={JSON.stringify(formData.knowledge_base, null, 2)}
              onChange={(e) => {
                try {
                  const knowledgeBase = JSON.parse(e.target.value);
                  setFormData({ ...formData, knowledge_base: knowledgeBase });
                } catch (error) {
                  // Handle invalid JSON
                }
              }}
              multiline
              rows={4}
              sx={{ mb: 2 }}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            {editingPersonality ? 'Update' : 'Create'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default AgentPersonalities; 