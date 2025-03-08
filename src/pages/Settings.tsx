import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Divider,
  useTheme,
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';
import {
  updateAppearance,
  updateNotifications,
  updatePrivacy,
  updatePerformance,
  updateApi,
} from '../store/slices/settingsSlice';
import { addNotification } from '../store/slices/uiSlice';

const Settings: React.FC = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const settings = useSelector((state: RootState) => state.settings);

  const [formData, setFormData] = useState({
    appearance: settings.appearance,
    notifications: settings.notifications,
    privacy: settings.privacy,
    performance: settings.performance,
    api: settings.api,
  });

  const handleChange = (section: string, field: string, value: any) => {
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value,
      },
    }));
  };

  const handleSave = () => {
    dispatch(updateAppearance(formData.appearance));
    dispatch(updateNotifications(formData.notifications));
    dispatch(updatePrivacy(formData.privacy));
    dispatch(updatePerformance(formData.performance));
    dispatch(updateApi(formData.api));
    dispatch(
      addNotification({
        type: 'success',
        message: t('success.settingsSaved'),
      })
    );
  };

  const handleReset = () => {
    setFormData({
      appearance: settings.appearance,
      notifications: settings.notifications,
      privacy: settings.privacy,
      performance: settings.performance,
      api: settings.api,
    });
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('settings.title')}</Typography>
        <Box>
          <Button variant="outlined" onClick={handleReset} sx={{ mr: 2 }}>
            Reset
          </Button>
          <Button variant="contained" onClick={handleSave}>
            Save Changes
          </Button>
        </Box>
      </Box>

      <Grid container spacing={3}>
        {/* Appearance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.appearance.title')}
              </Typography>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>{t('settings.appearance.theme')}</InputLabel>
                <Select
                  value={formData.appearance.theme}
                  onChange={(e) => handleChange('appearance', 'theme', e.target.value)}
                >
                  <MenuItem value="light">Light</MenuItem>
                  <MenuItem value="dark">Dark</MenuItem>
                  <MenuItem value="system">System</MenuItem>
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>{t('settings.appearance.language')}</InputLabel>
                <Select
                  value={formData.appearance.language}
                  onChange={(e) => handleChange('appearance', 'language', e.target.value)}
                >
                  <MenuItem value="en">English</MenuItem>
                  <MenuItem value="es">Español</MenuItem>
                  <MenuItem value="fr">Français</MenuItem>
                  <MenuItem value="de">Deutsch</MenuItem>
                </Select>
              </FormControl>
            </CardContent>
          </Card>
        </Grid>

        {/* Notification Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.notifications.title')}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications.email}
                    onChange={(e) => handleChange('notifications', 'email', e.target.checked)}
                  />
                }
                label={t('settings.notifications.email')}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications.push}
                    onChange={(e) => handleChange('notifications', 'push', e.target.checked)}
                  />
                }
                label={t('settings.notifications.push')}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.notifications.inApp}
                    onChange={(e) => handleChange('notifications', 'inApp', e.target.checked)}
                  />
                }
                label={t('settings.notifications.inApp')}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Privacy Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.privacy.title')}
              </Typography>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.privacy.dataCollection}
                    onChange={(e) => handleChange('privacy', 'dataCollection', e.target.checked)}
                  />
                }
                label={t('settings.privacy.dataCollection')}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.privacy.analytics}
                    onChange={(e) => handleChange('privacy', 'analytics', e.target.checked)}
                  />
                }
                label={t('settings.privacy.analytics')}
                sx={{ mb: 2 }}
              />
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.privacy.sharing}
                    onChange={(e) => handleChange('privacy', 'sharing', e.target.checked)}
                  />
                }
                label={t('settings.privacy.sharing')}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Settings */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.performance.title')}
              </Typography>
              <TextField
                fullWidth
                type="number"
                label={t('settings.performance.batchSize')}
                value={formData.performance.batchSize}
                onChange={(e) => handleChange('performance', 'batchSize', parseInt(e.target.value))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label={t('settings.performance.maxWorkers')}
                value={formData.performance.maxWorkers}
                onChange={(e) => handleChange('performance', 'maxWorkers', parseInt(e.target.value))}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label={t('settings.performance.cacheSize')}
                value={formData.performance.cacheSize}
                onChange={(e) => handleChange('performance', 'cacheSize', parseInt(e.target.value))}
              />
            </CardContent>
          </Card>
        </Grid>

        {/* API Settings */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('settings.api.title')}
              </Typography>
              <TextField
                fullWidth
                label={t('settings.api.endpoint')}
                value={formData.api.endpoint}
                onChange={(e) => handleChange('api', 'endpoint', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="password"
                label={t('settings.api.apiKey')}
                value={formData.api.apiKey}
                onChange={(e) => handleChange('api', 'apiKey', e.target.value)}
                sx={{ mb: 2 }}
              />
              <TextField
                fullWidth
                type="number"
                label={t('settings.api.timeout')}
                value={formData.api.timeout}
                onChange={(e) => handleChange('api', 'timeout', parseInt(e.target.value))}
              />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Settings; 