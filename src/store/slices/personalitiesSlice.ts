import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface Trait {
  name: string;
  value: number; // 0-100
  description: string;
}

interface StyleGuide {
  tone: string;
  formality: string;
  personality: string;
  examples: string[];
}

interface ResponseTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  description: string;
}

interface KnowledgeBase {
  id: string;
  name: string;
  content: string;
  source: string;
  lastUpdated: string;
}

interface Personality {
  id: string;
  name: string;
  description: string;
  traits: Trait[];
  styleGuide: StyleGuide;
  responseTemplates: ResponseTemplate[];
  knowledgeBase: KnowledgeBase[];
  created_at: string;
  updated_at: string;
  stats: {
    usageCount: number;
    avgRating: number;
    lastUsed: string;
  };
}

interface PersonalitiesState {
  personalities: Personality[];
  loading: boolean;
  error: string | null;
  selectedPersonality: Personality | null;
  filters: {
    search: string;
    sortBy: 'name' | 'usage' | 'rating' | 'date';
    sortOrder: 'asc' | 'desc';
  };
}

const initialState: PersonalitiesState = {
  personalities: [],
  loading: false,
  error: null,
  selectedPersonality: null,
  filters: {
    search: '',
    sortBy: 'name',
    sortOrder: 'asc',
  },
};

const personalitiesSlice = createSlice({
  name: 'personalities',
  initialState,
  reducers: {
    setPersonalities: (state, action: PayloadAction<Personality[]>) => {
      state.personalities = action.payload;
    },
    addPersonality: (state, action: PayloadAction<Personality>) => {
      state.personalities.push(action.payload);
    },
    updatePersonality: (state, action: PayloadAction<Partial<Personality> & { id: string }>) => {
      const index = state.personalities.findIndex((p) => p.id === action.payload.id);
      if (index !== -1) {
        state.personalities[index] = { ...state.personalities[index], ...action.payload };
      }
    },
    deletePersonality: (state, action: PayloadAction<string>) => {
      state.personalities = state.personalities.filter((p) => p.id !== action.payload);
    },
    setSelectedPersonality: (state, action: PayloadAction<Personality | null>) => {
      state.selectedPersonality = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    setFilters: (state, action: PayloadAction<Partial<PersonalitiesState['filters']>>) => {
      state.filters = {
        ...state.filters,
        ...action.payload,
      };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    updatePersonalityStats: (
      state,
      action: PayloadAction<{ id: string; stats: Partial<Personality['stats']> }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.id);
      if (personality) {
        personality.stats = { ...personality.stats, ...action.payload.stats };
      }
    },
    addTrait: (state, action: PayloadAction<{ personalityId: string; trait: Trait }>) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.traits.push(action.payload.trait);
      }
    },
    updateTrait: (
      state,
      action: PayloadAction<{ personalityId: string; traitName: string; trait: Partial<Trait> }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        const traitIndex = personality.traits.findIndex((t) => t.name === action.payload.traitName);
        if (traitIndex !== -1) {
          personality.traits[traitIndex] = {
            ...personality.traits[traitIndex],
            ...action.payload.trait,
          };
        }
      }
    },
    deleteTrait: (state, action: PayloadAction<{ personalityId: string; traitName: string }>) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.traits = personality.traits.filter((t) => t.name !== action.payload.traitName);
      }
    },
    addResponseTemplate: (
      state,
      action: PayloadAction<{ personalityId: string; template: ResponseTemplate }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.responseTemplates.push(action.payload.template);
      }
    },
    updateResponseTemplate: (
      state,
      action: PayloadAction<{ personalityId: string; templateId: string; template: Partial<ResponseTemplate> }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        const templateIndex = personality.responseTemplates.findIndex(
          (t) => t.id === action.payload.templateId
        );
        if (templateIndex !== -1) {
          personality.responseTemplates[templateIndex] = {
            ...personality.responseTemplates[templateIndex],
            ...action.payload.template,
          };
        }
      }
    },
    deleteResponseTemplate: (
      state,
      action: PayloadAction<{ personalityId: string; templateId: string }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.responseTemplates = personality.responseTemplates.filter(
          (t) => t.id !== action.payload.templateId
        );
      }
    },
    addKnowledgeBase: (
      state,
      action: PayloadAction<{ personalityId: string; knowledge: KnowledgeBase }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.knowledgeBase.push(action.payload.knowledge);
      }
    },
    updateKnowledgeBase: (
      state,
      action: PayloadAction<{ personalityId: string; knowledgeId: string; knowledge: Partial<KnowledgeBase> }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        const knowledgeIndex = personality.knowledgeBase.findIndex(
          (k) => k.id === action.payload.knowledgeId
        );
        if (knowledgeIndex !== -1) {
          personality.knowledgeBase[knowledgeIndex] = {
            ...personality.knowledgeBase[knowledgeIndex],
            ...action.payload.knowledge,
          };
        }
      }
    },
    deleteKnowledgeBase: (
      state,
      action: PayloadAction<{ personalityId: string; knowledgeId: string }>
    ) => {
      const personality = state.personalities.find((p) => p.id === action.payload.personalityId);
      if (personality) {
        personality.knowledgeBase = personality.knowledgeBase.filter(
          (k) => k.id !== action.payload.knowledgeId
        );
      }
    },
    clearPersonalities: (state) => {
      state.personalities = [];
      state.selectedPersonality = null;
      state.error = null;
    },
  },
});

export const {
  setPersonalities,
  addPersonality,
  updatePersonality,
  deletePersonality,
  setSelectedPersonality,
  setLoading,
  setError,
  setFilters,
  resetFilters,
  updatePersonalityStats,
  addTrait,
  updateTrait,
  deleteTrait,
  addResponseTemplate,
  updateResponseTemplate,
  deleteResponseTemplate,
  addKnowledgeBase,
  updateKnowledgeBase,
  deleteKnowledgeBase,
  clearPersonalities,
} = personalitiesSlice.actions;

export default personalitiesSlice.reducer; 