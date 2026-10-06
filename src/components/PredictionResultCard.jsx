import React, { useEffect, useState } from 'react';
import { ArrowRight, Sparkles, TrendingDown, TrendingUp, RotateCcw, Info } from 'lucide-react';

export default function PredictionResultCard({ result, onReset }) {
  if (!result) return null;

  const {
    predictedPrice,
    lowRange,
    highRange,
    isBelowMedian,
    diffFromMedian,
    percentDiffFromMedian,
    medianPrice,
    input,
  } = result;

  // Gentle animated count-up respecting prefers-reduced-motion
  const [displayPrice, setDisplayPrice] = useState(0);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setDisplayPrice(predictedPrice);
      return;
    }

    let start = 0;
    const duration = 900;
    const startTime = performance.now();

    const animate = (currentTime) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Gentle easeOutExpo
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      setDisplayPrice(Math.round(start + (predictedPrice - start) * ease));

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }, [predictedPrice]);

  return (
    <div
      id="prediction-result"
      className="mt-10 bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-2xl p-7 sm:p-10 shadow-soft transition-all duration-300 animate-in fade-in slide-in-from-bottom-4"
    >
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-6 border-b border-[var(--border-hairline)]">
        <div>
          <div className="inline-flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[var(--accent)] mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Stacking Ensemble Prediction</span>
          </div>
          <h3 className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
            Estimated Airfare
          </h3>
        </div>

        <button
          onClick={onReset}
          className="self-start md:self-auto text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] inline-flex items-center gap-1.5 transition-colors cursor-pointer py-1.5 px-3 rounded-full border border-[var(--border-hairline)] hover:bg-[var(--bg-subtle)]"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>New estimate</span>
        </button>
      </div>

      <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        {/* Left Column: Big Elegant Predicted Price */}
        <div className="lg:col-span-7">
          <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-medium mb-1">
            Forecasted Fare (INR)
          </p>
          <div className="font-editorial text-5xl sm:text-6xl md:text-7xl font-normal text-[var(--text-primary)] tracking-tight">
            ₹{displayPrice.toLocaleString()}
          </div>

          <p className="text-sm text-[var(--text-secondary)] mt-3">
            Estimated Confidence Range: <span className="font-medium text-[var(--text-primary)]">₹{lowRange.toLocaleString()} – ₹{highRange.toLocaleString()}</span>
            <span className="text-xs text-[var(--text-tertiary)] block sm:inline sm:ml-2">(MAE ±₹2,183)</span>
          </p>

          {/* Contextual Median Comparison */}
          <div className="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-medium py-1.5 px-3.5 rounded-full bg-[var(--bg-subtle)] border border-[var(--border-hairline)]">
            {isBelowMedian ? (
              <>
                <TrendingDown className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span className="text-emerald-800 dark:text-emerald-300">
                  ₹{diffFromMedian.toLocaleString()} below median route benchmark ({percentDiffFromMedian}% lower)
                </span>
              </>
            ) : (
              <>
                <TrendingUp className="w-4 h-4 text-amber-600 dark:text-amber-400 shrink-0" />
                <span className="text-amber-800 dark:text-amber-300">
                  ₹{diffFromMedian.toLocaleString()} above median route benchmark ({percentDiffFromMedian}% higher)
                </span>
              </>
            )}
          </div>
        </div>

        {/* Right Column: Parameters Summary Chip List */}
        <div className="lg:col-span-5 bg-[var(--bg-subtle)] p-6 rounded-xl border border-[var(--border-hairline)] space-y-3.5">
          <p className="text-xs uppercase tracking-wider text-[var(--text-tertiary)] font-semibold">
            Configured Itinerary
          </p>
          
          <div className="flex items-center justify-between text-sm py-1 border-b border-[var(--border-hairline)]">
            <span className="text-[var(--text-secondary)]">Corridor</span>
            <span className="font-medium text-[var(--text-primary)] flex items-center gap-1.5">
              {input.source} <ArrowRight className="w-3 h-3 text-[var(--text-tertiary)]" /> {input.destination}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm py-1 border-b border-[var(--border-hairline)]">
            <span className="text-[var(--text-secondary)]">Airline & Class</span>
            <span className="font-medium text-[var(--text-primary)]">
              {input.airline.replace('_', ' ')} · {input.class}
            </span>
          </div>

          <div className="flex items-center justify-between text-sm py-1 border-b border-[var(--border-hairline)]">
            <span className="text-[var(--text-secondary)]">Lead Time</span>
            <span className="font-medium text-[var(--text-primary)]">
              {input.days_left} {input.days_left === 1 ? 'day' : 'days'} before departure
            </span>
          </div>

          <div className="flex items-center justify-between text-sm py-1">
            <span className="text-[var(--text-secondary)]">Flight Nuances</span>
            <span className="font-medium text-[var(--text-primary)]">
              {input.stops === 'zero' ? 'Non-stop' : input.stops === 'one' ? '1 Stop' : '2+ Stops'} · {input.departure}
            </span>
          </div>
        </div>
      </div>

      {/* Gentle booking hint derived purely from empirical data */}
      <div className="pt-6 border-t border-[var(--border-hairline)] flex items-start gap-3 text-xs text-[var(--text-secondary)]">
        <Info className="w-4 h-4 text-[var(--text-tertiary)] shrink-0 mt-0.5" />
        <p>
          {input.days_left <= 3
            ? 'Booking within 3 days of departure historically exhibits the steepest tariff escalation across Indian carriers.'
            : input.days_left >= 14 && input.days_left <= 28
            ? 'Your booking lead time is positioned within the historical equilibrium window (14–28 days), where tariffs remain relatively stable.'
            : 'Fares fluctuate dynamically with seat availability and seasonal booking velocity. Estimates reflect empirical historical patterns.'}
        </p>
      </div>
    </div>
  );
}
