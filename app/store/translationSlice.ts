import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { 
  TranslationState, 
  TranslationRequest, 
  TranslationResponse,
  TextToSpeechRequest,
  TextToSpeechResponse 
} from '../types/translation';

const initialState: TranslationState = {
  translated_text: '',
  is_loading: false,
  error: null,
  is_speaking: false,
  audio_error: null,
};

export const translateText = createAsyncThunk<
  TranslationResponse,
  TranslationRequest,
  { rejectValue: string }
>('translation/translate', async (request, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/translate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || 'Translation failed');
    }

    return data as TranslationResponse;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Translation failed');
  }
});

export const speakText = createAsyncThunk<
  TextToSpeechResponse,
  TextToSpeechRequest,
  { rejectValue: string }
>('translation/speak', async (request, { rejectWithValue }) => {
  try {
    const response = await fetch('/api/tts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error('Text-to-speech failed');
    }

    const data = await response.json();
    return { audioBase64: data.audioBase64 } as TextToSpeechResponse;
  } catch (error) {
    return rejectWithValue(error instanceof Error ? error.message : 'Text-to-speech failed');
  }
});

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    clearTranslation: (state) => {
      state.translated_text = '';
      state.error = null;
      state.audio_error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Translation reducers
      .addCase(translateText.pending, (state) => {
        state.is_loading = true;
        state.error = null;
      })
      .addCase(translateText.fulfilled, (state, action: PayloadAction<TranslationResponse>) => {
        state.is_loading = false;
        state.translated_text = action.payload.translated_text;
        state.error = null;
      })
      .addCase(translateText.rejected, (state, action) => {
        state.is_loading = false;
        state.error = action.payload || 'Translation failed';
      })
      // Text-to-speech reducers
      .addCase(speakText.pending, (state) => {
        state.is_speaking = true;
        state.audio_error = null;
      })
      .addCase(speakText.fulfilled, (state) => {
        state.is_speaking = false;
        state.audio_error = null;
      })
      .addCase(speakText.rejected, (state, action) => {
        state.is_speaking = false;
        state.audio_error = action.payload || 'Text-to-speech failed';
      });
  },
});

export const { clearTranslation } = translationSlice.actions;
export default translationSlice.reducer; 