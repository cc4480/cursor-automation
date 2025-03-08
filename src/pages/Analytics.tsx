import React, { useState, useEffect } from 'react';
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
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
} from 'recharts';
import { useSelector } from 'react-redux';
import { RootState } from '../store';
import { useTranslation } from 'react-i18next';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884D8'];

const Analytics: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [timeRange, setTimeRange] = useState('7d');
  const [metrics, setMetrics] = useState({
    tasks: 0,
    successRate: 0,
    activeAgents: 0,
    responseTime: 0,
  });

  // Mock data for charts
  const performanceData = [
    { name: 'Mon', tasks: 40, success: 35 },
    { name: 'Tue', tasks: 30, success: 25 },
    { name: 'Wed', tasks: 45, success: 40 },
    { name: 'Thu', tasks: 50, success: 45 },
    { name: 'Fri', tasks: 35, success: 30 },
    { name: 'Sat', tasks: 25, success: 20 },
    { name: 'Sun', tasks: 30, success: 25 },
  ];

  const distributionData = [
    { name: 'Workflow A', value: 35 },
    { name: 'Workflow B', value: 25 },
    { name: 'Workflow C', value: 20 },
    { name: 'Workflow D', value: 15 },
    { name: 'Workflow E', value: 5 },
  ];

  const agentPerformanceData = [
    { name: 'Agent 1', tasks: 40, success: 35 },
    { name: 'Agent 2', tasks: 30, success: 25 },
    { name: 'Agent 3', tasks: 45, success: 40 },
    { name: 'Agent 4', tasks: 50, success: 45 },
    { name: 'Agent 5', tasks: 35, success: 30 },
  ];

  useEffect(() => {
    // Fetch analytics data based on time range
    const fetchAnalyticsData = async () => {
      try {
        // Replace with actual API call
        const mockData = {
          tasks: 150,
          successRate: 85,
          activeAgents: 5,
          responseTime: 2.5,
        };
        setMetrics(mockData);
      } catch (error) {
        console.error('Error fetching analytics data:', error);
      }
    };

    fetchAnalyticsData();
  }, [timeRange]);

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">{t('analytics.title')}</Typography>
        <FormControl sx={{ minWidth: 200 }}>
          <InputLabel>{t('analytics.timeRange')}</InputLabel>
          <Select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            label={t('analytics.timeRange')}
          >
            <MenuItem value="24h">Last 24 Hours</MenuItem>
            <MenuItem value="7d">Last 7 Days</MenuItem>
            <MenuItem value="30d">Last 30 Days</MenuItem>
            <MenuItem value="90d">Last 90 Days</MenuItem>
          </Select>
        </FormControl>
      </Box>

      <Grid container spacing={3}>
        {/* Metrics Cards */}
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.metrics.tasks')}
              </Typography>
              <Typography variant="h4">{metrics.tasks}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.metrics.successRate')}
              </Typography>
              <Typography variant="h4">{metrics.successRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.metrics.activeAgents')}
              </Typography>
              <Typography variant="h4">{metrics.activeAgents}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card>
            <CardContent>
              <Typography color="textSecondary" gutterBottom>
                {t('analytics.metrics.responseTime')}
              </Typography>
              <Typography variant="h4">{metrics.responseTime}s</Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Performance Chart */}
        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('analytics.charts.performance')}
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={performanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line
                      type="monotone"
                      dataKey="tasks"
                      stroke={theme.palette.primary.main}
                      name="Tasks"
                    />
                    <Line
                      type="monotone"
                      dataKey="success"
                      stroke={theme.palette.success.main}
                      name="Successful"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Distribution Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('analytics.charts.distribution')}
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={distributionData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      outerRadius={150}
                      label
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Agent Performance Chart */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {t('analytics.charts.agentPerformance')}
              </Typography>
              <Box sx={{ height: 400 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={agentPerformanceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Bar
                      dataKey="tasks"
                      fill={theme.palette.primary.main}
                      name="Tasks"
                    />
                    <Bar
                      dataKey="success"
                      fill={theme.palette.success.main}
                      name="Successful"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Analytics; 