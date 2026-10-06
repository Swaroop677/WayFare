import modelWeights from '../data/ml_model_weights.json';
import analyticsData from '../data/flight_analytics_data.json';

/**
 * Predict flight price using either an external API endpoint (if VITE_MODEL_API_URL is configured)
 * or the trained local machine learning model weights.
 *
 * @param {Object} inputData - { airline, source, destination, departure, stops, arrival, class, flight, duration, days_left }
 * @returns {Promise<Object>} Prediction result with fare, confidence interval, and context statistics.
 */
export async function predictFlightPrice(inputData) {
  const apiUrl = import.meta.env.VITE_MODEL_API_URL;

  // 1. Try external API if configured
  if (apiUrl) {
    try {
      const response = await fetch(`${apiUrl}/predict`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(inputData),
      });
      if (response.ok) {
        const data = await response.json();
        return formatResult(data.price || data.prediction, inputData, 'External ML Endpoint');
      }
    } catch (err) {
      console.warn('API call failed, falling back to local ML inference:', err);
    }
  }

  // 2. Local ML Inference Engine using trained Scikit-Learn weights
  let fare = modelWeights.intercept;

  const duration = parseFloat(inputData.duration) || analyticsData.metadata.avg_duration;
  const daysLeft = parseFloat(inputData.days_left) || analyticsData.metadata.avg_days_left;

  // Standardize numerical features
  const durScaled = (duration - modelWeights.num_means[0]) / modelWeights.num_scales[0];
  const dlScaled = (daysLeft - modelWeights.num_means[1]) / modelWeights.num_scales[1];

  fare += durScaled * (modelWeights.coefs['duration'] || 0);
  fare += dlScaled * (modelWeights.coefs['days_left'] || 0);

  // Categorical One-Hot Feature Coefficients
  const categoricalFields = ['airline', 'source', 'departure', 'stops', 'arrival', 'destination', 'class', 'flight'];

  for (const field of categoricalFields) {
    const val = inputData[field];
    if (val) {
      const featKey = `${field}_${val}`;
      if (modelWeights.coefs[featKey] !== undefined) {
        fare += modelWeights.coefs[featKey];
      }
    }
  }

  // Enforce bounds based on dataset minimum and maximum
  const minBound = analyticsData.metadata.min_price;
  const maxBound = analyticsData.metadata.max_price;
  const finalFare = Math.min(maxBound, Math.max(minBound, Math.round(fare)));

  return formatResult(finalFare, inputData, 'Trained Stacking ML Model (Local)');
}

function formatResult(predictedPrice, input, modelName) {
  const medianPrice = analyticsData.metadata.median_price;
  const avgPrice = analyticsData.metadata.avg_price;

  const isBelowMedian = predictedPrice < medianPrice;
  const diffFromMedian = Math.abs(predictedPrice - medianPrice);
  const percentDiffFromMedian = Math.round((diffFromMedian / medianPrice) * 100);

  // Confidence margin based on Stacking Regressor MAE (₹2,183)
  const mae = 2183;
  const lowRange = Math.max(analyticsData.metadata.min_price, predictedPrice - mae);
  const highRange = Math.min(analyticsData.metadata.max_price, predictedPrice + mae);

  return {
    predictedPrice,
    lowRange,
    highRange,
    isBelowMedian,
    diffFromMedian,
    percentDiffFromMedian,
    medianPrice,
    avgPrice,
    modelName,
    input,
    timestamp: new Date().toISOString(),
  };
}
