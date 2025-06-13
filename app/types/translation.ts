import { LanguageCode } from '../constants';

export interface TranslationRequest {
  text: string;
  source_language_code: LanguageCode;
  target_language_code: LanguageCode;
}

export interface TranslationResponse {
  translated_text: string;
  error?: string;
}

export interface TranslationState {
  translated_text: string;
  is_loading: boolean;
  error: string | null;
}

export interface RootState {
  translation: TranslationState;
} 