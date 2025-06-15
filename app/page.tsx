'use client' 
import { TranslationForm } from './components/TranslationForm';

export default function Home() {
  return (
    <main className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6 sm:mb-8 font-montserrat">
          Language Translator
        </h1>
        <TranslationForm />
      </div>
    </main>
  );
}
