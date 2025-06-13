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

export function TranslationForm() {
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>('en-IN');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('hi-IN');
  const [inputText, setInputText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleTranslate = async () => {
    try {
      setIsLoading(true);
      setError('');
      
      const response = await fetch('/api/translate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: inputText,
          sourceLanguage: sourceLanguage,
          targetLanguage: targetLanguage,
        }),
      });
      console.log("This is in UI :", response);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Translation failed');
      }
      setTranslatedText(data.translated_text);
    } catch (err) {
      console.log("This is in UI err:", err);
      setError(err instanceof Error ? err.message : 'Translation failed');
    } finally {
      setIsLoading(false);
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
            onChange={(e) => setInputText(e.target.value)}
            className="min-h-[200px] resize-none"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Translation
          </label>
          <Textarea
            placeholder="Translation will appear here..."
            value={translatedText}
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