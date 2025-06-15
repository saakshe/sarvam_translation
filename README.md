# Language Translator

A modern web application for translating text between various Indian languages with text-to-speech capabilities.

![Language Translator](./public/app-screenshot.png)

## Features

### Translation
- Support for multiple Indian languages including:
  - English (en-IN)
  - Hindi (hi-IN)
  - Bengali (bn-IN)
  - Telugu (te-IN)
  - Tamil (ta-IN)
  - Marathi (mr-IN)
  - Gujarati (gu-IN)
  - Kannada (kn-IN)
  - Malayalam (ml-IN)
  - Punjabi (pa-IN)
  - Odia (od-IN)
  - And many more...

### Text-to-Speech
- High-quality text-to-speech conversion using the Bulbul v2 model
- Multiple voice options:
  - Anushka
  - Manisha
  - Vidya
  - Arya
  - Abhilash
  - Karun
  - Hitesh
- Note: TTS is not available for the following languages:
  - Assamese (as-IN)
  - Bodo (brx-IN)
  - Dogri (doi-IN)
  - Konkani (kok-IN)
  - Kashmiri (ks-IN)
  - Maithili (mai-IN)
  - Manipuri/Meiteilon (mni-IN)
  - Nepali (ne-IN)
  - Sanskrit (sa-IN)
  - Santali (sat-IN)
  - Sindhi (sd-IN)
  - Urdu (ur-IN)

### User Interface
- Clean and modern design using Tailwind CSS
- Responsive layout for all devices (mobile, tablet, desktop)
- Dark mode support with persistent theme preference
- Montserrat font for enhanced readability
- Intuitive controls and feedback:
  - Loading states for translation
  - Error handling with dismissible notifications
  - Disabled states for unavailable features
  - Tooltips for better user guidance

### Technical Features
- Built with Next.js for optimal performance
- Redux state management for reliable data handling
- Real-time translation using Sarvam AI API
- Error boundary implementation for graceful error handling
- Accessibility features:
  - ARIA labels
  - Keyboard navigation
  - Screen reader support
  - Focus management

## Getting Started

### Prerequisites
- Node.js 18.0 or later
- npm or yarn package manager

### Installation
1. Clone the repository:
```bash
git clone <repository-url>
cd language-translator
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Set up environment variables:
Create a `.env.local` file in the root directory and add:
```env
SARVAM_API_KEY=your_api_key_here
```

4. Run the development server:
```bash
npm run dev
# or
yarn dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Select Languages**:
   - Choose source language from the dropdown
   - Select target language for translation
   - Pick a speaker voice if text-to-speech is available

2. **Enter Text**:
   - Type or paste text in the source language
   - Click "Translate" or press Enter

3. **Get Translation**:
   - View the translated text in the output field
   - Use the speaker icon to hear the translation (if available)
   - Copy the translated text as needed

4. **Theme Toggle**:
   - Click the sun/moon icon in the top-right corner
   - Switch between light and dark modes
   - Theme preference is saved automatically

## API Integration

The application uses two main API endpoints:

1. Translation API:
```typescript
POST /api/translate
{
  input: string;
  source_language_code: LanguageCode;
  target_language_code: LanguageCode;
  mode: TranslationMode;
}
```

2. Text-to-Speech API:
```typescript
POST /api/tts
{
  input: string;
  speaker: SpeakerName;
  language: LanguageCode;
  model: string;
}
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Sarvam AI for providing the translation and TTS APIs
- Next.js team for the amazing framework
- Tailwind CSS for the styling utilities
- All contributors and users of the application
