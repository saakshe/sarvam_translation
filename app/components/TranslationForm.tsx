'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { LANGUAGES, SPEAKERS, TranslationMode, DISABLED_TTS_LANGUAGES, type LanguageCode, type SpeakerName } from '@/app/constants';
import { useAppDispatch, useAppSelector } from '@/app/store/hooks';
import { translateText, clearTranslation, speakText } from '@/app/store/translationSlice';
import { Volume2, Loader2, X, Copy, Check } from 'lucide-react';
import { useState as useHookState } from 'react';

export function TranslationForm() {
  const dispatch = useAppDispatch();
  const { 
    translated_text, 
    is_loading: isLoading, 
    error,
    is_speaking: isSpeaking,
    audio_error: audioError
  } = useAppSelector((state) => state.translation);
  
  const [sourceLanguage, setSourceLanguage] = useState<LanguageCode>('en-IN');
  const [targetLanguage, setTargetLanguage] = useState<LanguageCode>('hi-IN');
  const [inputText, setInputText] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState<SpeakerName>('anushka');
  const [visibleError, setVisibleError] = useState<string | null>(null);
  const [isCopied, setIsCopied] = useHookState(false);

  // Handle error visibility
  useEffect(() => {
    const currentError = error || audioError;
    if (currentError) {
      setVisibleError(currentError);
      const timer = setTimeout(() => {
        setVisibleError(null);
      }, 15000); // 15 seconds
      return () => clearTimeout(timer);
    }
  }, [error, audioError]);

  const handleDismissError = () => {
    setVisibleError(null);
  };

  const handleTranslate = async () => {
    const trimmedText = inputText.trim();
    if (!trimmedText) return;
    
    const translationRequest = {
      input: trimmedText,
      source_language_code: sourceLanguage,
      target_language_code: targetLanguage,
      mode: TranslationMode.SARVAM_V1,
    };

    console.log('Dispatching translation request:', translationRequest);
    dispatch(translateText(translationRequest));
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    if (!e.target.value) {
      dispatch(clearTranslation());
    }
  };

  const playTranslatedText = async () => {
    if (!translated_text || isSpeaking) return;

    const result = await dispatch(speakText({
      input: translated_text,
      speaker: selectedSpeaker,
      language: targetLanguage,
      model: 'bulbul:v2',
    }));

    if (speakText.fulfilled.match(result)) {
      // Convert base64 to Blob
      const base64Data = result.payload.audioBase64;
      const binaryData = atob(base64Data);
      const arrayBuffer = new ArrayBuffer(binaryData.length);
      const uint8Array = new Uint8Array(arrayBuffer);
      for (let i = 0; i < binaryData.length; i++) {
        uint8Array[i] = binaryData.charCodeAt(i);
      }
      const audioBlob = new Blob([arrayBuffer], { type: 'audio/wav' });
      
      // Play the audio
      const audio = new Audio(URL.createObjectURL(audioBlob));
      audio.onended = () => URL.revokeObjectURL(audio.src);
      await audio.play();
    }
  };

  const copyToClipboard = async () => {
    if (!translated_text) return;
    
    try {
      // Check if running on iOS
      const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);
      
      // Try the modern clipboard API first (works on most modern browsers)
      if (navigator.clipboard && window.isSecureContext && !isIOS) {
        await navigator.clipboard.writeText(translated_text);
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        return;
      }

      // Special handling for iOS
      if (isIOS) {
        // Create an input element (works better than textarea on iOS)
        const el = document.createElement('input');
        el.value = translated_text;
        el.readOnly = true; // Prevents keyboard from showing on iOS
        
        // Make it invisible but ensure it's still selectable
        Object.assign(el.style, {
          position: 'absolute',
          left: '-9999px',
          fontSize: '16px', // Prevents zoom on iOS
          padding: '0',
          border: 'none',
          background: 'transparent',
        });
        
        document.body.appendChild(el);
        
        // Set up selection
        const range = document.createRange();
        range.selectNodeContents(el);
        const selection = window.getSelection();
        if (selection) {
          selection.removeAllRanges();
          selection.addRange(range);
        }
        
        // Select the text
        el.setSelectionRange(0, translated_text.length);
        
        // Show copy feedback even if we're not sure it worked
        // (iOS doesn't reliably tell us if the copy succeeded)
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
        
        try {
          // Attempt to copy
          document.execCommand('copy');
        } finally {
          // Clean up
          document.body.removeChild(el);
        }
        return;
      }

      // Fallback for other devices
      const textArea = document.createElement('textarea');
      textArea.value = translated_text;
      
      Object.assign(textArea.style, {
        position: 'fixed',
        top: '0',
        left: '0',
        opacity: '0',
        width: '2em',
        height: '2em',
        padding: '0',
        border: 'none',
        background: 'transparent',
      });
      
      document.body.appendChild(textArea);
      textArea.focus();
      textArea.select();

      try {
        document.execCommand('copy');
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      } finally {
        document.body.removeChild(textArea);
      }
    } catch (err) {
      console.error('Copy failed:', err);
      setVisibleError('Failed to copy text to clipboard');
    }
  };

  // Check if text-to-speech is disabled for the current target language
  const isTTSDisabled = DISABLED_TTS_LANGUAGES.has(targetLanguage);

  return (
    <div className="space-y-6 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="w-full sm:flex-1">
          <label className="block text-sm font-medium mb-2 font-montserrat">
            Source Language
          </label>
          <Select
            value={sourceLanguage}
            onValueChange={(value: LanguageCode) => setSourceLanguage(value)}
          >
            <SelectTrigger className="font-montserrat">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <SelectItem key={code} value={code} className="font-montserrat">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:flex-1">
          <label className="block text-sm font-medium mb-2 font-montserrat">
            Target Language
          </label>
          <Select
            value={targetLanguage}
            onValueChange={(value: LanguageCode) => setTargetLanguage(value)}
          >
            <SelectTrigger className="font-montserrat">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(LANGUAGES).map(([code, name]) => (
                <SelectItem key={code} value={code} className="font-montserrat">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="w-full sm:flex-1">
          <label className="block text-sm font-medium mb-2 font-montserrat">
            Speaker
          </label>
          <Select
            value={selectedSpeaker}
            onValueChange={(value: SpeakerName) => setSelectedSpeaker(value)}
            disabled={isTTSDisabled}
          >
            <SelectTrigger className="font-montserrat">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(SPEAKERS).map(([code, name]) => (
                <SelectItem key={code} value={code} className="font-montserrat">
                  {name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2 font-montserrat">
            Enter Text
          </label>
          <Textarea
            placeholder="Type or paste text here..."
            value={inputText}
            onChange={handleInputChange}
            className="min-h-[200px] resize-none font-montserrat bg-background"
          />
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-sm font-medium font-montserrat">
              Translation
            </label>
            <div className="flex gap-2">
              {translated_text && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={copyToClipboard}
                  className="h-8 w-8 bg-background/80"
                  title="Copy translated text"
                >
                  {isCopied ? (
                    <Check className="h-4 w-4 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </Button>
              )}
              {translated_text && !isTTSDisabled && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={playTranslatedText}
                  disabled={isSpeaking || !translated_text}
                  className="h-8 w-8 bg-background/80"
                  title={isTTSDisabled ? "Text-to-speech is not available for this language" : "Play translation"}
                >
                  {isSpeaking ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Volume2 className="h-4 w-4" />
                  )}
                </Button>
              )}
            </div>
          </div>
          <Textarea
            placeholder="Translation will appear here..."
            value={translated_text}
            readOnly
            className={`min-h-[200px] resize-none font-montserrat bg-background ${isLoading ? 'opacity-50' : ''}`}
          />
        </div>
      </div>

      <Button
        onClick={handleTranslate}
        disabled={isLoading || !inputText.trim()}
        className="w-full font-montserrat"
      >
        {isLoading ? 'Translating...' : 'Translate'}
      </Button>

      {visibleError && (
        <div className="fixed bottom-4 right-4 p-4 bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive-foreground rounded-md shadow-lg max-w-md animate-in fade-in slide-in-from-bottom-4 flex items-center gap-2 font-montserrat">
          <span>{visibleError}</span>
          <Button
            variant="ghost"
            size="icon"
            onClick={handleDismissError}
            className="h-6 w-6 hover:bg-destructive/20 dark:hover:bg-destructive/30"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      )}
    </div>
  );
} 