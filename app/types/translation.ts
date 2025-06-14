import { LanguageCode, SpeakerName, TranslationMode } from '../constants';

export interface TranslationRequest {
  input: string;
  source_language_code: LanguageCode;
  target_language_code: LanguageCode;
  mode?: TranslationMode;
}

export interface TranslationResponse {
  translated_text: string;
  error?: string;
}

export interface TextToSpeechRequest {
  input: string;
  speaker: SpeakerName;
  language: LanguageCode;
  model: string;
}

export interface TextToSpeechResponse {
  audioBase64: string;
}

export interface TranslationState {
  translated_text: string;
  is_loading: boolean;
  error: string | null;
  is_speaking: boolean;
  audio_error: string | null;
}

export interface RootState {
  translation: TranslationState;
} 