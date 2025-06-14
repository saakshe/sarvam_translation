import { NextResponse } from 'next/server';
import { TranslationMode } from '@/app/constants';

// Replace with your actual Sarvam AI API endpoint
const SARVAM_API_ENDPOINT = 'https://api.sarvam.ai/translate';

export async function POST(request: Request) {
  try {
    const requestData = await request.json();
    console.log('Received request data:', requestData);

    const { input, source_language_code, target_language_code } = requestData;

    // Validate input with detailed logging
    if (!input || !source_language_code || !target_language_code) {
      console.error('Validation failed:', {
        hasInput: !!input,
        hasSourceLang: !!source_language_code,
        hasTargetLang: !!target_language_code,
        receivedData: requestData
      });
      return NextResponse.json(
        { error: 'Missing required fields', details: { input, source_language_code, target_language_code } },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    const requestPayload = {
      input,
      source_language_code,
      target_language_code,
      model: TranslationMode.SARVAM_V1
    };

    console.log('Translation request payload:', requestPayload);

    // Make request to Sarvam AI API
    const response = await fetch(SARVAM_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Subscription-Key': apiKey,
      },
      body: JSON.stringify(requestPayload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Translation API error:', {
        status: response.status,
        statusText: response.statusText,
        error: errorText,
        request: requestPayload
      });
      throw new Error(`Translation API failed: ${errorText}`);
    }

    const data = await response.json();
    console.log("Translation API response:", data);
    
    if (!data.translated_text) {
      console.error('Invalid response format:', data);
      throw new Error('Invalid response format from translation API');
    }

    return NextResponse.json({ translated_text: data.translated_text });

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Translation failed' },
      { status: 500 }
    );
  }
} 