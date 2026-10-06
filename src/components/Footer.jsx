import React from 'react';
import { ArrowUp } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-[var(--bg-canvas)] text-[var(--text-secondary)] border-t border-[var(--border-hairline)] pt-16 pb-12 transition-colors duration-300">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 pb-12 border-b border-[var(--border-hairline)]">
          {/* Left: Site wordmark & tagline */}
          <div className="space-y-1.5">
            <h3 className="font-editorial text-2xl font-normal text-[var(--text-primary)] tracking-tight">
              Wayfare
            </h3>
            <p className="text-sm text-[var(--text-secondary)] font-normal">
              Know before you fly.
            </p>
          </div>

          {/* Right: Working in-page links & back-to-top */}
          <div className="flex flex-wrap items-center gap-6 sm:gap-8 text-xs sm:text-sm">
            <button
              onClick={() => scrollTo('predict-section')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Predictor
            </button>
            <button
              onClick={() => scrollTo('insights-section')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Market Insights
            </button>
            <button
              onClick={() => scrollTo('methodology-section')}
              className="text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              Methodology
            </button>
            <button
              onClick={scrollToTop}
              className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline transition-all cursor-pointer font-medium"
            >
              <span>Back to top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Line */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[var(--text-tertiary)]">
          <p>© {currentYear} Wayfare. Predictions are estimates, not guaranteed fares.</p>
          <p className="font-mono text-[11px]">Trained on 40,000 Indian metro flight observations</p>
        </div>
      </div>
    </footer>
  );
}
