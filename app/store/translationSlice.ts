import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { TranslationState, TranslationRequest, TranslationResponse } from '../types/translation';

const initialState: TranslationState = {
  translated_text: '',
  is_loading: false,
  error: null,
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

const translationSlice = createSlice({
  name: 'translation',
  initialState,
  reducers: {
    clearTranslation: (state) => {
      state.translated_text = '';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
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
      });
  },
});

export const { clearTranslation } = translationSlice.actions;
export default translationSlice.reducer; 