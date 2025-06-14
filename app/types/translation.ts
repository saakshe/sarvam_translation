import { LanguageCode, SpeakerName } from '../constants';

export interface TranslationRequest {
  text: string;
  source_language_code: LanguageCode;
  target_language_code: LanguageCode;
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