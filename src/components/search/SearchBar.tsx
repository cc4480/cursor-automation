import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  TextField,
  InputAdornment,
  IconButton,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Typography,
  CircularProgress,
  useTheme,
} from '@mui/material';
import {
  Search as SearchIcon,
  Clear as ClearIcon,
  History as HistoryIcon,
  Workflow as WorkflowIcon,
  Psychology as AgentIcon,
  Person as PersonIcon,
  Settings as SettingsIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { addToSearchHistory } from '../../store/slices/searchSlice';

interface SearchResult {
  id: string;
  type: 'workflow' | 'agent' | 'personality' | 'settings';
  title: string;
  description: string;
  path: string;
}

interface SearchBarProps {
  placeholder?: string;
  fullWidth?: boolean;
  onSearch?: (query: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  fullWidth = true,
  onSearch,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const searchHistory = useSelector((state: RootState) => state.search.history);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    setLoading(true);
    try {
      // Replace with actual API call
      const mockResults: SearchResult[] = [
        {
          id: '1',
          type: 'workflow',
          title: 'Order Processing Workflow',
          description: 'Automated workflow for processing customer orders',
          path: '/workflows/1',
        },
        {
          id: '2',
          type: 'agent',
          title: 'Customer Service Agent',
          description: 'AI agent for handling customer inquiries',
          path: '/agents/2',
        },
        {
          id: '3',
          type: 'personality',
          title: 'Professional Personality',
          description: 'Formal and business-oriented personality template',
          path: '/personalities/3',
        },
      ];

      setResults(mockResults);
      dispatch(addToSearchHistory(searchQuery));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = event.target.value;
    setQuery(newQuery);
    handleSearch(newQuery);
    setShowResults(true);
  };

  const handleClear = () => {
    setQuery('');
    setResults([]);
    setShowResults(false);
  };

  const handleResultClick = (result: SearchResult) => {
    navigate(result.path);
    setShowResults(false);
    setQuery('');
  };

  const getResultIcon = (type: SearchResult['type']) => {
    switch (type) {
      case 'workflow':
        return <WorkflowIcon />;
      case 'agent':
        return <AgentIcon />;
      case 'personality':
        return <PersonIcon />;
      case 'settings':
        return <SettingsIcon />;
      default:
        return null;
    }
  };

  return (
    <Box ref={searchRef} sx={{ position: 'relative', width: fullWidth ? '100%' : 'auto' }}>
      <TextField
        fullWidth={fullWidth}
        placeholder={placeholder}
        value={query}
        onChange={handleQueryChange}
        onFocus={() => setShowResults(true)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          endAdornment: query && (
            <InputAdornment position="end">
              <IconButton size="small" onClick={handleClear}>
                <ClearIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />

      {showResults && (query || searchHistory.length > 0) && (
        <Paper
          elevation={3}
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            mt: 1,
            maxHeight: 400,
            overflow: 'auto',
            zIndex: theme.zIndex.modal + 1,
          }}
        >
          {loading ? (
            <Box sx={{ p: 2, display: 'flex', justifyContent: 'center' }}>
              <CircularProgress size={24} />
            </Box>
          ) : (
            <>
              {results.length > 0 && (
                <List>
                  {results.map((result) => (
                    <ListItem
                      button
                      key={result.id}
                      onClick={() => handleResultClick(result)}
                    >
                      <ListItemIcon>{getResultIcon(result.type)}</ListItemIcon>
                      <ListItemText
                        primary={result.title}
                        secondary={result.description}
                      />
                    </ListItem>
                  ))}
                </List>
              )}

              {query && results.length === 0 && (
                <Box sx={{ p: 2 }}>
                  <Typography color="textSecondary">
                    No results found for "{query}"
                  </Typography>
                </Box>
              )}

              {!query && searchHistory.length > 0 && (
                <>
                  <Box sx={{ p: 1, bgcolor: 'grey.100' }}>
                    <Typography variant="subtitle2" color="textSecondary">
                      Recent Searches
                    </Typography>
                  </Box>
                  <List>
                    {searchHistory.map((item, index) => (
                      <ListItem
                        button
                        key={index}
                        onClick={() => {
                          setQuery(item);
                          handleSearch(item);
                        }}
                      >
                        <ListItemIcon>
                          <HistoryIcon />
                        </ListItemIcon>
                        <ListItemText primary={item} />
                      </ListItem>
                    ))}
                  </List>
                </>
              )}
            </>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default SearchBar; 