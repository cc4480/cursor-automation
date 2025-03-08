import React, { useState } from 'react';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  useTheme,
} from '@mui/material';
import {
  ExpandMore as ExpandMoreIcon,
  Book as BookIcon,
  Code as CodeIcon,
  Settings as SettingsIcon,
  Security as SecurityIcon,
  Help as HelpIcon,
  BugReport as BugReportIcon,
  Speed as SpeedIcon,
  Storage as StorageIcon,
  Cloud as CloudIcon,
} from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

const Documentation: React.FC = () => {
  const theme = useTheme();
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<string | false>('getting-started');

  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  const sections = [
    {
      id: 'getting-started',
      title: 'Getting Started',
      icon: <BookIcon />,
      content: [
        {
          title: 'Introduction',
          content: 'Welcome to the AI Agent Management System. This documentation will guide you through the features and functionality of the application.',
        },
        {
          title: 'Quick Start',
          content: 'Learn how to set up your first workflow, create an agent, and configure its personality in minutes.',
        },
        {
          title: 'System Requirements',
          content: 'Ensure your system meets the minimum requirements for optimal performance.',
        },
      ],
    },
    {
      id: 'workflows',
      title: 'Workflows',
      icon: <CodeIcon />,
      content: [
        {
          title: 'Creating Workflows',
          content: 'Learn how to create and configure workflows to automate your tasks.',
        },
        {
          title: 'Workflow Triggers',
          content: 'Understand different types of triggers and how to set them up.',
        },
        {
          title: 'Workflow Actions',
          content: 'Explore available actions and how to combine them effectively.',
        },
      ],
    },
    {
      id: 'agents',
      title: 'Agents',
      icon: <SettingsIcon />,
      content: [
        {
          title: 'Agent Creation',
          content: 'Step-by-step guide to creating and configuring AI agents.',
        },
        {
          title: 'Training Agents',
          content: 'Learn how to train your agents with custom data and improve their performance.',
        },
        {
          title: 'Agent Management',
          content: 'Best practices for managing and monitoring your agents.',
        },
      ],
    },
    {
      id: 'personalities',
      title: 'Personalities',
      icon: <SecurityIcon />,
      content: [
        {
          title: 'Creating Personalities',
          content: 'Learn how to create and customize agent personalities.',
        },
        {
          title: 'Personality Traits',
          content: 'Understand different personality traits and their impact on agent behavior.',
        },
        {
          title: 'Style Guides',
          content: 'Create and manage style guides for consistent agent responses.',
        },
      ],
    },
    {
      id: 'analytics',
      title: 'Analytics',
      icon: <SpeedIcon />,
      content: [
        {
          title: 'Performance Metrics',
          content: 'Understand the key metrics and how to interpret them.',
        },
        {
          title: 'Reports',
          content: 'Generate and customize reports for your workflows and agents.',
        },
        {
          title: 'Data Visualization',
          content: 'Learn how to use charts and graphs to analyze your data.',
        },
      ],
    },
    {
      id: 'security',
      title: 'Security',
      icon: <SecurityIcon />,
      content: [
        {
          title: 'Authentication',
          content: 'Learn about authentication methods and security best practices.',
        },
        {
          title: 'Data Protection',
          content: 'Understand how your data is protected and encrypted.',
        },
        {
          title: 'Access Control',
          content: 'Configure and manage access permissions for your team.',
        },
      ],
    },
    {
      id: 'api',
      title: 'API Integration',
      icon: <CloudIcon />,
      content: [
        {
          title: 'API Overview',
          content: 'Learn about the available API endpoints and their usage.',
        },
        {
          title: 'Authentication',
          content: 'Understand API authentication and authorization.',
        },
        {
          title: 'Rate Limiting',
          content: 'Learn about API rate limits and best practices.',
        },
      ],
    },
    {
      id: 'troubleshooting',
      title: 'Troubleshooting',
      icon: <BugReportIcon />,
      content: [
        {
          title: 'Common Issues',
          content: 'Solutions for frequently encountered problems.',
        },
        {
          title: 'Error Messages',
          content: 'Understanding and resolving error messages.',
        },
        {
          title: 'Support',
          content: 'How to get help and contact support.',
        },
      ],
    },
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        Documentation
      </Typography>

      <Grid container spacing={3}>
        {/* Quick Links */}
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Quick Links
              </Typography>
              <List>
                {sections.map((section) => (
                  <ListItem
                    button
                    key={section.id}
                    onClick={() => setExpanded(section.id)}
                  >
                    <ListItemIcon>{section.icon}</ListItemIcon>
                    <ListItemText primary={section.title} />
                  </ListItem>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Documentation Content */}
        <Grid item xs={12} md={9}>
          {sections.map((section) => (
            <Accordion
              key={section.id}
              expanded={expanded === section.id}
              onChange={handleChange(section.id)}
              sx={{ mb: 2 }}
            >
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                sx={{
                  bgcolor: expanded === section.id ? 'action.selected' : 'inherit',
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  {section.icon}
                  <Typography sx={{ ml: 1 }}>{section.title}</Typography>
                </Box>
              </AccordionSummary>
              <AccordionDetails>
                {section.content.map((item, index) => (
                  <Box key={index} sx={{ mb: 2 }}>
                    <Typography variant="h6" gutterBottom>
                      {item.title}
                    </Typography>
                    <Typography color="textSecondary">
                      {item.content}
                    </Typography>
                    {index < section.content.length - 1 && <Divider sx={{ my: 2 }} />}
                  </Box>
                ))}
              </AccordionDetails>
            </Accordion>
          ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Documentation; 