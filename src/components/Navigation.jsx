import React, { useState, useEffect } from 'react';
import { Sun, Moon, Menu, X, ArrowUpRight } from 'lucide-react';

export default function Navigation() {
  const [isDark, setIsDark] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    // Check initial theme
    const hasDarkClass = document.documentElement.classList.contains('dark');
    setIsDark(hasDarkClass);

    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleTheme = () => {
    const nextDark = !isDark;
    setIsDark(nextDark);
    if (nextDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('aero-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('aero-theme', 'light');
    }
  };

  const scrollTo = (id) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        scrolled
          ? 'bg-[var(--bg-canvas)]/90 backdrop-blur-md border-b border-[var(--border-hairline)] py-3.5 shadow-xs'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        {/* Editorial Wordmark */}
        <a
          href="#"
          className="flex items-baseline gap-2.5 group cursor-pointer"
        >
          <span className="font-editorial text-2xl tracking-tight font-medium text-[var(--text-primary)]">
            Aero Fare
          </span>
          <span className="hidden sm:inline-block text-[11px] font-sans-ui uppercase tracking-widest text-[var(--text-tertiary)] group-hover:text-[var(--accent)] transition-colors">
            Intelligence
          </span>
        </a>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8 text-[14px] text-[var(--text-secondary)]">
          <button
            onClick={() => scrollTo('predict-section')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Predictor
          </button>
          <button
            onClick={() => scrollTo('insights-section')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Market Insights
          </button>
          <button
            onClick={() => scrollTo('methodology-section')}
            className="hover:text-[var(--text-primary)] transition-colors cursor-pointer"
          >
            Methodology
          </button>
        </nav>

        {/* Actions (Theme Toggle & CTA) */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            className="w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-subtle)] border border-[var(--border-hairline)] transition-all cursor-pointer"
            aria-label={isDark ? 'Switch to light theme' : 'Switch to dark theme'}
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </button>

          <button
            onClick={() => scrollTo('predict-section')}
            className="hidden sm:inline-flex btn-editorial-primary text-xs py-2 px-4.5 cursor-pointer"
          >
            <span>Estimate Fare</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)] cursor-pointer"
            aria-label="Toggle navigation"
          >
            {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[var(--bg-surface)] border-b border-[var(--border-hairline)] px-6 py-6 space-y-4 shadow-lg animate-in slide-in-from-top-2 duration-200">
          <button
            onClick={() => scrollTo('predict-section')}
            className="block w-full text-left py-2 text-[15px] text-[var(--text-primary)] font-medium"
          >
            Predictor
          </button>
          <button
            onClick={() => scrollTo('insights-section')}
            className="block w-full text-left py-2 text-[15px] text-[var(--text-primary)] font-medium"
          >
            Market Insights
          </button>
          <button
            onClick={() => scrollTo('methodology-section')}
            className="block w-full text-left py-2 text-[15px] text-[var(--text-primary)] font-medium"
          >
            Methodology
          </button>
          <div className="pt-2">
            <button
              onClick={() => scrollTo('predict-section')}
              className="w-full btn-editorial-primary text-sm py-2.5"
            >
              Estimate Fare
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
