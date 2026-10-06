import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HeroSection from './components/HeroSection';
import PredictionForm from './components/PredictionForm';
import PredictionResultCard from './components/PredictionResultCard';
import AnalyticsSection from './components/AnalyticsSection';
import ModelPerformanceSection from './components/ModelPerformanceSection';
import Footer from './components/Footer';
import { predictFlightPrice } from './services/predictionService';

export default function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [predictionResult, setPredictionResult] = useState(null);

  const handlePredict = async (formData) => {
    setIsLoading(true);
    try {
      // Gentle pause to give calm feedback
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await predictFlightPrice(formData);
      setPredictionResult(result);
      setTimeout(() => {
        const resultElem = document.getElementById('prediction-result');
        if (resultElem) {
          resultElem.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    } catch (err) {
      console.error('Prediction calculation failed:', err);
      alert('Could not compute airfare prediction. Please review inputs and try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleScrollToPredictor = () => {
    const elem = document.getElementById('predict-section');
    if (elem) {
      elem.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-canvas)] text-[var(--text-primary)] transition-colors duration-300">
      {/* 1. Header Navigation */}
      <Navigation />

      {/* 2. Hero Section */}
      <HeroSection onExploreClick={handleScrollToPredictor} />

      {/* 3. Prediction Form & Inline Result */}
      <div className="relative">
        <PredictionForm onPredict={handlePredict} isLoading={isLoading} />

        {/* 4. Large Editorial Result Card */}
        {predictionResult && (
          <div className="max-w-4xl mx-auto px-6 pb-20">
            <PredictionResultCard
              result={predictionResult}
              onReset={() => {
                setPredictionResult(null);
                handleScrollToPredictor();
              }}
            />
          </div>
        )}
      </div>

      {/* 5. Dataset Intelligence & Market Analytics */}
      <AnalyticsSection lastPrediction={predictionResult} />

      {/* 6. Machine Learning Model Leaderboard */}
      <ModelPerformanceSection />

      {/* 7. Footer */}
      <Footer />
    </div>
  );
}
