// Common Indian languages
export const LANGUAGES = [
  // Widely used languages
  { value: 'en-IN', label: 'English' },
  { value: 'hi-IN', label: 'Hindi' },
  { value: 'bn-IN', label: 'Bengali' },
  { value: 'te-IN', label: 'Telugu' },
  { value: 'ta-IN', label: 'Tamil' },
  { value: 'mr-IN', label: 'Marathi' },
  { value: 'gu-IN', label: 'Gujarati' },
  { value: 'kn-IN', label: 'Kannada' },
  { value: 'ml-IN', label: 'Malayalam' },
  { value: 'pa-IN', label: 'Punjabi' },
  { value: 'od-IN', label: 'Odia' },
  
  // Additional languages
  { value: 'as-IN', label: 'Assamese' },
  { value: 'brx-IN', label: 'Bodo' },
  { value: 'doi-IN', label: 'Dogri' },
  { value: 'kok-IN', label: 'Konkani' },
  { value: 'ks-IN', label: 'Kashmiri' },
  { value: 'mai-IN', label: 'Maithili' },
  { value: 'mni-IN', label: 'Manipuri (Meiteilon)' },
  { value: 'ne-IN', label: 'Nepali' },
  { value: 'sa-IN', label: 'Sanskrit' },
  { value: 'sat-IN', label: 'Santali' },
  { value: 'sd-IN', label: 'Sindhi' },
  { value: 'ur-IN', label: 'Urdu' }
] as const;

export type LanguageCode = typeof LANGUAGES[number]['value']; 