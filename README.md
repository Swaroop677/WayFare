# Aero Fare — AI Flight Price Intelligence Platform

**Aero Fare** is a production-quality, luxury aviation-themed web application for AI-powered flight price prediction and empirical flight analytics. Built using real schedule and pricing data from 40,000 flight observations across Indian metro corridors.

---

## ✈️ Key Features

- **AI Flight Price Prediction**: Real-time fare inference powered by a trained Stacking Regressor model ($R^2 = 0.9703$).
- **Dataset-Driven Controls**: Searchable origin and destination selection (`Mumbai`, `Delhi`, `Bangalore`, `Chennai`, `Kolkata`, `Hyderabad`) with route-dependent airline and flight code filtering.
- **Segmented Flight Controls**: Cabin Class (`Economy` vs `Business`), Connection Stops (`Non-stop`, `1 Stop`, `2+ Stops`), Departure/Arrival timings, Duration, and Days Left lead-time sliders.
- **Flight Intelligence & Analytics**:
  - **Price Distribution**: Ticket price frequency histogram with interactive fare range overlay.
  - **Airline Comparison**: Carrier pricing comparison across budget vs full-service airlines.
  - **Booking Lead Time vs Fare**: Dual trend curve and sample scatter plot across 1 to 49 booking lead days.
  - **Flight Duration vs Fare**: Scatter plot visualization of flight hours vs ticket price in INR.
  - **Metro Corridors**: Top 10 busiest route corridors and pricing bounds.
- **Machine Learning Architecture Leaderboard**: Evaluation table comparing 12 model architectures trained in the Jupyter notebook.

---

## 🤖 Machine Learning Model Architecture

The prediction engine is based on the machine learning pipeline developed in `24f2005310-notebook-flight (3).ipynb`.

### Final Champion Model: Stacking Regressor Ensemble
- **Base Learners**: Random Forest Regressor, XGBoost Regressor, CatBoost Regressor
- **Meta-Learner**: Ridge Regression
- **Validation Metrics**:
  - **$R^2$ Score**: `0.9703` (97.03% variance explained)
  - **RMSE**: `₹3,915.86`
  - **MAE**: `₹2,183.21`

### Feature Preprocessing
- **Numerical Features** (`duration`, `days_left`): Imputed with median values and scaled via `StandardScaler`.
- **Categorical Features** (`airline`, `source`, `departure`, `stops`, `arrival`, `destination`, `class`, `flight`): Imputed with mode and encoded using `OneHotEncoder(handle_unknown='ignore')`.

---

## 📊 Training Dataset Summary

- **Total Analyzed Records**: 40,000 flight rows
- **Airlines**: 6 (`Vistara`, `Air_India`, `Indigo`, `GO_FIRST`, `AirAsia`, `SpiceJet`)
- **Unique Flight Codes**: 869
- **Metro Hubs**: 6 Cities / 30 Route Corridors
- **Price Range**: ₹1,105 to ₹114,704 (Median: ₹7,353 | Average: ₹20,801)

---

## 🛠️ Tech Stack

- **Frontend**: React 19, Vite, Tailwind CSS v4
- **UI & Iconography**: Lucide React, Framer Motion, Canvas Confetti
- **Analytics & Data Visualizations**: Recharts
- **ML Processing / Data Generation**: Python (Scikit-Learn, Pandas, NumPy)

---

## 🚀 Local Development

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/your-username/aero-fare.git
cd aero-fare
npm install
```

### 2. Run Local Development Server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 📦 Production Build & Preview

### Build Production Bundle
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## ☁️ Vercel Deployment Instructions

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "Initial Aero Fare release"
   git branch -M main
   git remote add origin https://github.com/your-username/aero-fare.git
   git push -u origin main
   ```
2. Log in to [Vercel](https://vercel.com) and click **Add New** $\rightarrow$ **Project**.
3. Import your GitHub repository. Vercel will automatically detect **Vite**.
4. Confirm build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
5. Click **Deploy**.

---

## 🔑 Environment Variables

If you deploy an external REST API model endpoint, configure the following environment variable in `.env` or Vercel Settings:

```env
VITE_MODEL_API_URL=https://your-ml-api.com
```

If `VITE_MODEL_API_URL` is omitted, the frontend automatically falls back to the trained Stacking ML model weights serialized in `src/data/ml_model_weights.json`.
