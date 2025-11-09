
import React, { useState, useCallback } from 'react';
import ImageUploader from './components/ImageUploader';
import StyleSelector from './components/StyleSelector';
import GeneratedImage from './components/GeneratedImage';
import Loader from './components/Loader';
import { generateHeadshot } from './services/geminiService';
import type { HeadshotStyle, UploadedImage } from './types';
import { CameraIcon } from './components/icons';
import { HEADSHOT_STYLES } from './constants';

const App: React.FC = () => {
  const [uploadedImage, setUploadedImage] = useState<UploadedImage | null>(null);
  const [selectedStyle, setSelectedStyle] = useState<HeadshotStyle>(HEADSHOT_STYLES[0]);
  const [customPrompt, setCustomPrompt] = useState<string>('');
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageUpload = useCallback((image: UploadedImage) => {
    setUploadedImage(image);
    setGeneratedImage(null);
    setError(null);
  }, []);

  const handleGenerate = async () => {
    if (!uploadedImage) {
      setError('Please upload an image first.');
      return;
    }
    if (!selectedStyle && !customPrompt) {
        setError('Please select a style or enter a custom prompt.');
        return;
    }

    setIsLoading(true);
    setError(null);
    setGeneratedImage(null);

    try {
      const finalPrompt = `${selectedStyle.prompt}${customPrompt ? `. ${customPrompt}` : ''}`;
      const result = await generateHeadshot(uploadedImage, finalPrompt);
      if (result) {
        setGeneratedImage(result);
      } else {
        throw new Error('Failed to generate image. The result was empty.');
      }
    } catch (e: any) {
      console.error(e);
      setError(`An error occurred: ${e.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const handleReset = useCallback(() => {
    setGeneratedImage(null);
    setCustomPrompt('');
    setSelectedStyle(HEADSHOT_STYLES[0]);
    setError(null);
  }, []);
  
  const handleResetAll = useCallback(() => {
    setUploadedImage(null);
    handleReset();
  }, [handleReset]);


  return (
    <div className="min-h-screen bg-gray-900 text-gray-100 flex flex-col items-center p-4 sm:p-6 lg:p-8">
      {isLoading && <Loader />}
      <header className="w-full max-w-6xl text-center mb-8">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center gap-4">
          <CameraIcon className="w-10 h-10" />
          AI Headshot Photographer
        </h1>
        <p className="text-gray-400 mt-2 text-lg">
          Turn your selfie into a professional headshot in seconds.
        </p>
      </header>

      <main className="w-full max-w-6xl flex-grow">
        {!uploadedImage ? (
          <ImageUploader onImageUpload={handleImageUpload} />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <h2 className="text-2xl font-bold text-gray-300 mb-4">Your Photo</h2>
              <div className="relative w-full max-w-md aspect-square rounded-xl shadow-lg overflow-hidden bg-gray-800">
                <img
                  src={`data:${uploadedImage.mimeType};base64,${uploadedImage.data}`}
                  alt="User upload"
                  className="w-full h-full object-cover"
                />
                 <button onClick={handleResetAll} className="absolute top-3 right-3 bg-gray-900 bg-opacity-60 hover:bg-opacity-80 text-white font-semibold py-1 px-3 rounded-full text-sm transition-all">
                    Upload New
                </button>
              </div>
            </div>

            <div className="flex flex-col">
              {generatedImage ? (
                <GeneratedImage
                  imageUrl={generatedImage}
                  onReset={handleReset}
                />
              ) : (
                <div className="bg-gray-800 p-6 rounded-xl shadow-lg flex flex-col h-full">
                  <div className="flex-grow">
                    <h2 className="text-2xl font-bold text-gray-300 mb-4">1. Select a Style</h2>
                    <StyleSelector
                      selectedStyle={selectedStyle}
                      onStyleSelect={setSelectedStyle}
                    />

                    <h2 className="text-2xl font-bold text-gray-300 my-4">2. (Optional) Add Custom Edits</h2>
                    <textarea
                      value={customPrompt}
                      onChange={(e) => setCustomPrompt(e.target.value)}
                      placeholder="e.g., 'Add a retro filter', 'Change the background to a library', 'Make me smile'"
                      className="w-full h-24 p-3 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                    />
                  </div>

                  {error && (
                    <div className="bg-red-900 border border-red-700 text-red-200 px-4 py-3 rounded-lg relative my-4" role="alert">
                      <strong className="font-bold">Error: </strong>
                      <span className="block sm:inline">{error}</span>
                    </div>
                  )}

                  <button
                    onClick={handleGenerate}
                    disabled={isLoading}
                    className="w-full mt-6 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-bold py-3 px-4 rounded-lg text-lg transition-all duration-300 ease-in-out shadow-lg transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    {isLoading ? 'Generating...' : '✨ Generate Headshot'}
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
