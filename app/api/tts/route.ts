import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { input, speaker, language, model } = await request.json();

    const apiKey = process.env.SARVAM_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: 'API key not configured' },
        { status: 500 }
      );
    }

    if (!input || !speaker || !language || !model) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Make request to Sarvam AI TTS API
    const response = await fetch('https://api.sarvam.ai/text-to-speech', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'API-Subscription-Key': apiKey,
      },
      body: JSON.stringify({
        text: input,
        speaker,
        target_language_code: language,
        model: model,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`API error: ${errorText}`);
    }

    const responseData = await response.json();
    const base64Audio = responseData.audios?.[0];

    if (!base64Audio) {
      throw new Error('No audio returned in the response');
    }

    // Return the base64 string directly
    return NextResponse.json({ audioBase64: base64Audio });

  } catch (error) {
    console.error('Text-to-speech error:', error);
    return NextResponse.json(
      { error: 'Text-to-speech failed' },
      { status: 500 }
    );
  }
}
