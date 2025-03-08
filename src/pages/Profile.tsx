import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Avatar,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  useTheme,
} from '@mui/material';
import {
  Edit as EditIcon,
  Security as SecurityIcon,
  Notifications as NotificationsIcon,
  Language as LanguageIcon,
  Palette as PaletteIcon,
  Backup as BackupIcon,
  Help as HelpIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { UserProfile } from '../store/slices/profileSlice';
import {
  updateProfile,
  updateSecurity,
  updatePreferences,
  updateBackup,
  logout,
} from '../store/slices/profileSlice';
import { addNotification } from '../store/slices/uiSlice';

const Profile: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const profile = useSelector((state: RootState) => state.profile);

  const [openDialog, setOpenDialog] = useState(false);
  const [dialogType, setDialogType] = useState<'profile' | 'security' | 'preferences' | 'backup'>('profile');
  const [formData, setFormData] = useState<UserProfile>(profile);

  const handleOpenDialog = (type: typeof dialogType) => {
    setDialogType(type);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleSubmit = () => {
    switch (dialogType) {
      case 'profile':
        dispatch(updateProfile(formData));
        dispatch(addNotification({
          type: 'success',
          message: 'Profile updated successfully',
        }));
        break;
      case 'security':
        dispatch(updateSecurity(formData.security));
        dispatch(addNotification({
          type: 'success',
          message: 'Security settings updated successfully',
        }));
        break;
      case 'preferences':
        dispatch(updatePreferences(formData.preferences));
        dispatch(addNotification({
          type: 'success',
          message: 'Preferences updated successfully',
        }));
        break;
      case 'backup':
        dispatch(updateBackup(formData.backup));
        dispatch(addNotification({
          type: 'success',
          message: 'Backup settings updated successfully',
        }));
        break;
    }
    handleCloseDialog();
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(addNotification({
      type: 'info',
      message: 'Logged out successfully',
    }));
  };

  const menuItems = [
    {
      title: 'Profile Information',
      icon: <EditIcon />,
      onClick: () => handleOpenDialog('profile'),
    },
    {
      title: 'Security Settings',
      icon: <SecurityIcon />,
      onClick: () => handleOpenDialog('security'),
    },
    {
      title: 'Notification Preferences',
      icon: <NotificationsIcon />,
      onClick: () => handleOpenDialog('preferences'),
    },
    {
      title: 'Language & Region',
      icon: <LanguageIcon />,
      onClick: () => handleOpenDialog('preferences'),
    },
    {
      title: 'Appearance',
      icon: <PaletteIcon />,
      onClick: () => handleOpenDialog('preferences'),
    },
    {
      title: 'Backup & Restore',
      icon: <BackupIcon />,
      onClick: () => handleOpenDialog('backup'),
    },
    {
      title: 'Help & Support',
      icon: <HelpIcon />,
      onClick: () => handleOpenDialog('preferences'),
    },
    {
      title: 'Logout',
      icon: <LogoutIcon />,
      onClick: handleLogout,
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Grid container spacing={3}>
        {/* Profile Header */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                <Avatar
                  src={profile.avatar}
                  sx={{ width: 100, height: 100, mr: 3 }}
                />
                <Box>
                  <Typography variant="h4" gutterBottom>
                    {profile.name}
                  </Typography>
                  <Typography color="textSecondary">
                    {profile.email}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Member since {new Date(profile.created_at).toLocaleDateString()}
                  </Typography>
                </Box>
              </Box>
              <Button
                variant="outlined"
                startIcon={<EditIcon />}
                onClick={() => handleOpenDialog('profile')}
              >
                Edit Profile
              </Button>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Menu */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Menu
              </Typography>
              <List>
                {menuItems.map((item) => (
                  <ListItem
                    button
                    key={item.title}
                    onClick={item.onClick}
                  >
                    <ListItemIcon>
                      {item.icon}
                    </ListItemIcon>
                    <ListItemText primary={item.title} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Profile Stats */}
        <Grid item xs={12} md={8}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Profile Statistics
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Workflows Created
                  </Typography>
                  <Typography variant="h4">
                    {profile.stats.workflows}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Agents Trained
                  </Typography>
                  <Typography variant="h4">
                    {profile.stats.agents}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Tasks Completed
                  </Typography>
                  <Typography variant="h4">
                    {profile.stats.tasks}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2" color="textSecondary">
                    Storage Used
                  </Typography>
                  <Typography variant="h4">
                    {profile.stats.storage}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Profile Edit Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
        <DialogTitle>
          {dialogType === 'profile' && 'Edit Profile'}
          {dialogType === 'security' && 'Security Settings'}
          {dialogType === 'preferences' && 'Preferences'}
          {dialogType === 'backup' && 'Backup & Restore'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            {dialogType === 'profile' && (
              <>
                <TextField
                  fullWidth
                  label="Name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  label="Bio"
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                  multiline
                  rows={4}
                  sx={{ mb: 2 }}
                />
              </>
            )}

            {dialogType === 'security' && (
              <>
                <TextField
                  fullWidth
                  type="password"
                  label="Current Password"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="New Password"
                  sx={{ mb: 2 }}
                />
                <TextField
                  fullWidth
                  type="password"
                  label="Confirm New Password"
                  sx={{ mb: 2 }}
                />
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.security.twoFactor}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          security: {
                            ...formData.security,
                            twoFactor: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label="Enable Two-Factor Authentication"
                />
              </>
            )}

            {dialogType === 'preferences' && (
              <>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Language</InputLabel>
                  <Select
                    value={formData.preferences.language}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          language: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Spanish</MenuItem>
                    <MenuItem value="fr">French</MenuItem>
                    <MenuItem value="de">German</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Theme</InputLabel>
                  <Select
                    value={formData.preferences.theme}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        preferences: {
                          ...formData.preferences,
                          theme: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="light">Light</MenuItem>
                    <MenuItem value="dark">Dark</MenuItem>
                    <MenuItem value="system">System</MenuItem>
                  </Select>
                </FormControl>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.preferences.notifications}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          preferences: {
                            ...formData.preferences,
                            notifications: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label="Enable Notifications"
                />
              </>
            )}

            {dialogType === 'backup' && (
              <>
                <FormControlLabel
                  control={
                    <Switch
                      checked={formData.backup.autoBackup}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          backup: {
                            ...formData.backup,
                            autoBackup: e.target.checked,
                          },
                        })
                      }
                    />
                  }
                  label="Enable Automatic Backup"
                  sx={{ mb: 2 }}
                />
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel>Backup Frequency</InputLabel>
                  <Select
                    value={formData.backup.frequency}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        backup: {
                          ...formData.backup,
                          frequency: e.target.value,
                        },
                      })
                    }
                  >
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 2 }}
                >
                  Create Backup Now
                </Button>
                <Button
                  variant="outlined"
                  fullWidth
                  color="secondary"
                >
                  Restore from Backup
                </Button>
              </>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained" color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Profile; 