// Common Indian languages
export const LANGUAGES: Record<string, string> = {
  'en-IN': 'English',
  'hi-IN': 'Hindi',
  'bn-IN': 'Bengali',
  'te-IN': 'Telugu',
  'ta-IN': 'Tamil',
  'mr-IN': 'Marathi',
  'gu-IN': 'Gujarati',
  'kn-IN': 'Kannada',
  'ml-IN': 'Malayalam',
  'pa-IN': 'Punjabi',
  'od-IN': 'Odia',
  'as-IN': 'Assamese',
  'brx-IN': 'Bodo',
  'doi-IN': 'Dogri',
  'kok-IN': 'Konkani',
  'ks-IN': 'Kashmiri',
  'mai-IN': 'Maithili',
  'mni-IN': 'Manipuri (Meiteilon)',
  'ne-IN': 'Nepali',
  'sa-IN': 'Sanskrit',
  'sat-IN': 'Santali',
  'sd-IN': 'Sindhi',
  'ur-IN': 'Urdu'
} as const;

export type LanguageCode = keyof typeof LANGUAGES;

// Speakers for bulbul:v2 model
export const SPEAKERS = {
  'anushka': 'Anushka',
  'manisha': 'Manisha',
  'vidya': 'Vidya',
  'arya': 'Arya',
  'abhilash': 'Abhilash',
  'karun': 'Karun',
  'hitesh': 'Hitesh'
} as const;

export type SpeakerName = keyof typeof SPEAKERS;

// Translation modes
export enum TranslationMode {
  SARVAM_V1 = 'sarvam-translate:v1'
} 