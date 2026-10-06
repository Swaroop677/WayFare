import React from 'react';
import { ArrowDown, Compass } from 'lucide-react';
import analyticsData from '../data/flight_analytics_data.json';

export default function HeroSection({ onExploreClick }) {
  const meta = analyticsData.metadata;

  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden grain-overlay border-b border-[var(--border-hairline)]">
      {/* Delicate Abstract Geodesic Flight Path Curve (Quiet Artistic Touch) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40 dark:opacity-25" aria-hidden="true">
        <svg
          className="w-full h-full min-w-[800px]"
          viewBox="0 0 1200 600"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Subtle latitude gridlines */}
          <line x1="0" y1="180" x2="1200" y2="180" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-[var(--border-hairline)]" />
          <line x1="0" y1="380" x2="1200" y2="380" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 8" className="text-[var(--border-hairline)]" />
          
          {/* Main Flight Path Arc */}
          <path
            d="M 120 480 C 350 120, 850 140, 1080 440"
            stroke="var(--accent)"
            strokeWidth="1.25"
            strokeDasharray="6 6"
            className="transition-all duration-1000"
          />

          {/* Secondary Flight Echo */}
          <path
            d="M 220 500 C 450 200, 750 220, 980 480"
            stroke="var(--accent)"
            strokeWidth="0.75"
            strokeOpacity="0.4"
          />

          {/* Waypoints */}
          <circle cx="120" cy="480" r="4" fill="var(--bg-canvas)" stroke="var(--accent)" strokeWidth="1.5" />
          <circle cx="600" cy="200" r="3" fill="var(--accent)" />
          <circle cx="1080" cy="440" r="4" fill="var(--bg-canvas)" stroke="var(--accent)" strokeWidth="1.5" />

          {/* Abstract coordinates */}
          <text x="135" y="495" fill="var(--text-tertiary)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="0.08em">BOM 19°05'N</text>
          <text x="1010" y="455" fill="var(--text-tertiary)" fontSize="11" fontFamily="Inter, sans-serif" letterSpacing="0.08em">DEL 28°33'N</text>
        </svg>
      </div>

      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        {/* Subtle Journal Header Tag */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] shadow-xs mb-8">
          <Compass className="w-3.5 h-3.5 text-[var(--accent)]" />
          <span className="text-[11px] font-medium tracking-wider uppercase text-[var(--text-secondary)]">
            Aviation Price Intelligence · 40,000 Records
          </span>
        </div>

        {/* Confident, Quietly Artistic Editorial Headline */}
        <h1 className="font-editorial text-4xl sm:text-6xl md:text-7xl font-normal tracking-tight text-[var(--text-primary)] leading-[1.08] mb-6">
          Anticipate the fare <br className="hidden sm:inline" />
          <span className="italic font-light text-[var(--text-secondary)]">before the journey.</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-[var(--text-secondary)] leading-relaxed font-normal mb-10">
          A minimalist machine learning model trained across Indian metropolitan flight corridors. Forecast airfares with quiet clarity, benchmark historical fare medians, and choose the optimal booking window.
        </p>

        {/* Primary Action Button */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <button
            onClick={onExploreClick}
            className="btn-editorial-primary text-[15px] py-3.5 px-8 cursor-pointer shadow-xs"
          >
            <span>Estimate Flight Fare</span>
            <ArrowDown className="w-4 h-4" />
          </button>
        </div>

        {/* Subtle Editorial Metrics Row */}
        <div className="mt-16 pt-10 border-t border-[var(--border-hairline)] grid grid-cols-2 md:grid-cols-4 gap-6 text-left">
          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Dataset Records</p>
            <p className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
              {meta.total_records.toLocaleString()}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">Empirical flight observations</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Ensemble Accuracy</p>
            <p className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
              97.03%
            </p>
            <p className="text-xs text-[var(--text-secondary)]">Variance explained (R²)</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Metro Hubs</p>
            <p className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
              6 Cities
            </p>
            <p className="text-xs text-[var(--text-secondary)]">30 bidirectional corridors</p>
          </div>

          <div className="space-y-1">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Median Fare</p>
            <p className="font-editorial text-2xl sm:text-3xl font-normal text-[var(--text-primary)]">
              ₹{meta.median_price.toLocaleString()}
            </p>
            <p className="text-xs text-[var(--text-secondary)]">50% of economy tickets below</p>
          </div>
        </div>
      </div>
    </section>
  );
}
