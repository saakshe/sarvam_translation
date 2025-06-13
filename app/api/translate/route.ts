import { NextResponse } from 'next/server';

// Replace with your actual Sarvam AI API endpoint
const SARVAM_API_ENDPOINT = 'https://api.sarvam.ai/translate';

export async function POST(request: Request) {
  try {
    const { text, sourceLanguage, targetLanguage } = await request.json();

    // Validate input
    if (!text || !sourceLanguage || !targetLanguage) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Get API key from environment variable
    const apiKey = process.env.SARVAM_API_KEY;
    console.log(apiKey)
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    // Make request to Sarvam AI API
    const response = await fetch(SARVAM_API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Subscription-Key': apiKey,
      },
      body: JSON.stringify({
        input: text,
        source_language_code: sourceLanguage,
        target_language_code: targetLanguage,
      }),
    });

    if (!response.ok) {
        console.log(JSON.stringify({
            input: text,
            source_language: sourceLanguage,
            target_language: targetLanguage,
          }))
        console.log(response.statusText)
        console.log(response.status)
      throw new Error('Translation API request failed');
    }

    const data = await response.json();
    console.log("This is in API :",data)
    return NextResponse.json(data);

  } catch (error) {
    console.error('Translation error:', error);
    return NextResponse.json(
      { error: 'Translation failed' },
      { status: 500 }
    );
  }
} 