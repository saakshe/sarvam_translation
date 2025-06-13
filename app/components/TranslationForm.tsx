'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LANGUAGES, type LanguageCode } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { translateText, clearTranslation } from '@/app/store/translationSlice';

export function TranslationForm() {
  const dispatch = useAppDispatch();
  const { translated_text, is_loading: isLoading, error } = useAppSelector((state) => state.translation);
  
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>('en-IN');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('hi-IN');
  const [inputText, setInputText] = useState('');

  const handleTranslate = async () => {
    if (!inputText.trim()) return;
    
    dispatch(translateText({
      text: inputText,
      source_language_code: sourceLanguage,
      target_language_code: targetLanguage,
    }));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (!e.target.value) {
      dispatch(clearTranslation());
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="flex gap-4">
        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Source Language
          </label>
          <Select
            value={sourceLanguage}
            onValueChange={(value) => setSourceLanguage(value as LanguageCode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex-1">
          <label className="block text-sm font-medium mb-2">
            Target Language
          </label>
          <Select
            value={targetLanguage}
            onValueChange={(value) => setTargetLanguage(value as LanguageCode)}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {LANGUAGES.map((lang) => (
                <SelectItem key={lang.value} value={lang.value}>
                  {lang.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Enter Text
          </label>
          <Textarea
            placeholder="Type or paste text here..."
            value={inputText}
            onChange={handleInputChange}
            className="min-h-[200px] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Translation
          </label>
          <Textarea
            placeholder="Translation will appear here..."
            value={translated_text}
            readOnly
            className={`min-h-[200px] resize-none ${isLoading ? 'opacity-50' : ''}`}
          />
        </div>
      </div>

      <Button
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
        className="w-full"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>

      {error && (
        <div className="p-4 bg-red-50 text-red-600 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 