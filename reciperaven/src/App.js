
import React, { useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [text, setText] = useState('');
  const [targetLanguage, setTargetLanguage] = useState('hi'); // Default to Hindi
  const [translatedText, setTranslatedText] = useState('');
  const languageOptions = [
    { code: 'hi', name: 'Hindi' },
    { code: 'te', name: 'Telugu' },
    { code: 'ta', name: 'Tamil' },
    { code: 'kn', name: 'Kannada' },
    { code: 'ml', name: 'Malayalam' },
    { code: 'gu', name: 'Gujarati' },
    { code: 'mr', name: 'Marathi' },
    { code: 'pa', name: 'Punjabi' },
    { code: 'bn', name: 'Bengali' },
    { code: 'or', name: 'Odia' },
    { code: 'ur', name: 'Urdu' },
    { code: 'as', name: 'Assamese' },
    { code: 'mr', name: 'Marathi' },
    
  ];

  const translateText = async () => {
    try {
      const response = await axios.post(
        'https://translation.googleapis.com/language/translate/v2',
        {
          q: text,
          target: targetLanguage,
          key: 'YOUR_GOOGLE_API_KEY', // Replace with your actual API key
        }
      );
      setTranslatedText(response.data.data.translations[0].translatedText);
    } catch (error) {
      console.error('Error translating text:', error);
    }
  };
  return (
    <div className="App">
      <div>
      <textarea value={text} onChange={(e) => setText(e.target.value)} />
      <select value={targetLanguage} onChange={(e) => setTargetLanguage(e.target.value)}>
        {languageOptions.map((language) => (
          <option key={language.code} value={language.code}>
            {language.name}
          </option>
        ))}
      </select>
      <button onClick={translateText}>Translate</button>
      </div>
      
      <div>
        <h2>Translated Text:</h2>
        <p>{translatedText}</p>
      </div>
    </div>
  );
}

export default App;

