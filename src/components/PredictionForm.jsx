import React, { useState, useEffect } from 'react';
import { ArrowRightLeft, SlidersHorizontal, Loader2, AlertCircle } from 'lucide-react';
import analyticsData from '../data/flight_analytics_data.json';

export default function PredictionForm({ onPredict, isLoading }) {
  const options = analyticsData.categorical_options;

  // Form State initialized with valid dataset values
  const [source, setSource] = useState('Mumbai');
  const [destination, setDestination] = useState('Delhi');
  const [airline, setAirline] = useState('Vistara');
  const [flight, setFlight] = useState('UK-930');
  const [flightClass, setFlightClass] = useState('Economy');
  const [stops, setStops] = useState('zero');
  const [departure, setDeparture] = useState('Morning');
  const [arrival, setArrival] = useState('Afternoon');
  const [duration, setDuration] = useState(2.5);
  const [daysLeft, setDaysLeft] = useState(15);

  const [showAdvanced, setShowAdvanced] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const currentRoute = `${source} -> ${destination}`;

  // Smart Filtering based on selected Route
  const availableAirlines = options.route_airlines[currentRoute] || options.airlines;
  const availableFlights = options.route_flights[currentRoute] || options.flights;

  // Sync airline selection if available list changes
  useEffect(() => {
    if (availableAirlines.length > 0 && !availableAirlines.includes(airline)) {
      setAirline(availableAirlines[0]);
    }
  }, [currentRoute]);

  // Sync flight selection if available list changes
  useEffect(() => {
    if (availableFlights.length > 0 && !availableFlights.includes(flight)) {
      setFlight(availableFlights[0]);
    }
  }, [currentRoute, airline]);

  const handleSwapRoute = () => {
    setErrorMessage('');
    const temp = source;
    setSource(destination);
    setDestination(temp);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (source === destination) {
      setErrorMessage('Origin and destination cannot be the same city. Please select different cities.');
      return;
    }
    setErrorMessage('');

    const payload = {
      airline,
      source,
      destination,
      departure,
      stops,
      arrival,
      class: flightClass,
      flight,
      duration: parseFloat(duration),
      days_left: parseInt(daysLeft, 10),
    };

    onPredict(payload);
  };

  return (
    <section id="predict-section" className="py-20 bg-[var(--bg-canvas)]">
      <div className="max-w-4xl mx-auto px-6">
        {/* Editorial Section Header */}
        <div className="text-center max-w-xl mx-auto mb-12">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--accent)] mb-2">
            Interactive Inference
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            Configure Itinerary
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2.5">
            Select route, travel class, carrier, and booking horizon. The model estimates fare based on historical tariff distributions.
          </p>
        </div>

        {/* Prediction Form Container */}
        <form
          onSubmit={handleSubmit}
          className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-2xl p-6 sm:p-10 shadow-soft space-y-8"
        >
          {/* Error Message */}
          {errorMessage && (
            <div className="flex items-center gap-2 p-3.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400 text-xs sm:text-sm">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* 1. ROUTE CORRIDOR (FROM / TO) */}
          <div className="bg-[var(--bg-subtle)] p-5 sm:p-6 rounded-xl border border-[var(--border-hairline)]">
            <div className="grid grid-cols-1 md:grid-cols-11 gap-4 items-center">
              {/* Origin Dropdown */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                  Origin (Departure)
                </label>
                <select
                  value={source}
                  onChange={(e) => {
                    setSource(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-base font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  {options.sources.map((s) => (
                    <option key={s} value={s}>
                      {s}
                    </option>
                  ))}
                </select>
              </div>

              {/* Swap Button */}
              <div className="md:col-span-1 flex justify-center">
                <button
                  type="button"
                  onClick={handleSwapRoute}
                  className="w-9 h-9 rounded-full border border-[var(--border-hairline)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] hover:border-[var(--border-muted)] transition-all flex items-center justify-center cursor-pointer shadow-2xs"
                  title="Swap Origin and Destination"
                  aria-label="Swap Origin and Destination"
                >
                  <ArrowRightLeft className="w-4 h-4" />
                </button>
              </div>

              {/* Destination Dropdown */}
              <div className="md:col-span-5">
                <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                  Destination (Arrival)
                </label>
                <select
                  value={destination}
                  onChange={(e) => {
                    setDestination(e.target.value);
                    setErrorMessage('');
                  }}
                  className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-base font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
                >
                  {options.destinations.map((d) => (
                    <option key={d} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* 2. CABIN CLASS & CONNECTION STOPS */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {/* Cabin Class */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Cabin Class
              </label>
              <div className="grid grid-cols-2 gap-2 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border-hairline)]">
                {['Economy', 'Business'].map((cls) => (
                  <button
                    key={cls}
                    type="button"
                    onClick={() => setFlightClass(cls)}
                    className={`py-2.5 px-3 rounded-lg text-sm font-medium transition-all text-center cursor-pointer ${
                      flightClass === cls
                        ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {cls}
                  </button>
                ))}
              </div>
            </div>

            {/* Flight Stops */}
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-2">
                Connections
              </label>
              <div className="grid grid-cols-3 gap-2 bg-[var(--bg-subtle)] p-1 rounded-xl border border-[var(--border-hairline)]">
                {[
                  { id: 'zero', label: 'Non-stop' },
                  { id: 'one', label: '1 Stop' },
                  { id: 'two_or_more', label: '2+ Stops' },
                ].map((s) => (
                  <button
                    key={s.id}
                    type="button"
                    onClick={() => setStops(s.id)}
                    className={`py-2.5 px-2 rounded-lg text-xs font-medium transition-all text-center cursor-pointer ${
                      stops === s.id
                        ? 'bg-[var(--bg-surface)] text-[var(--text-primary)] shadow-2xs'
                        : 'text-[var(--text-secondary)] hover:text-[var(--text-primary)]'
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* 3. AIRLINE CARRIER & DEPARTURE TIMING */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Airline Carrier
              </label>
              <select
                value={airline}
                onChange={(e) => setAirline(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
              >
                {availableAirlines.map((air) => (
                  <option key={air} value={air}>
                    {air.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                Departure Time
              </label>
              <select
                value={departure}
                onChange={(e) => setDeparture(e.target.value)}
                className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-xl px-4 py-3 text-sm font-medium text-[var(--text-primary)] focus:outline-none focus:border-[var(--accent)] transition-colors cursor-pointer"
              >
                {options.departures.map((d) => (
                  <option key={d} value={d}>
                    {d.replace('_', ' ')}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 4. DAYS LEFT TO DEPARTURE SLIDER */}
          <div className="bg-[var(--bg-subtle)] p-6 rounded-xl border border-[var(--border-hairline)]">
            <div className="flex justify-between items-baseline mb-2">
              <div>
                <label className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  Booking Horizon (Days Remaining)
                </label>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5">
                  {daysLeft <= 3
                    ? 'Last-minute tariff escalation phase'
                    : daysLeft >= 14 && daysLeft <= 28
                    ? 'Typical balanced fare window'
                    : 'Early booking window'}
                </p>
              </div>
              <span className="font-editorial text-2xl font-normal text-[var(--text-primary)]">
                {daysLeft} <span className="text-sm font-sans-ui text-[var(--text-tertiary)]">{daysLeft === 1 ? 'day' : 'days'}</span>
              </span>
            </div>

            <input
              type="range"
              min="1"
              max="49"
              value={daysLeft}
              onChange={(e) => setDaysLeft(e.target.value)}
              className="w-full h-1.5 bg-[var(--border-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] mt-3"
            />
            <div className="flex justify-between text-[11px] text-[var(--text-tertiary)] mt-2 font-mono">
              <span>1 day out</span>
              <span>25 days</span>
              <span>49 days out</span>
            </div>
          </div>

          {/* 5. COLLAPSIBLE FLIGHT NUANCES (Progressive Disclosure) */}
          <div className="pt-2">
            <button
              type="button"
              onClick={() => setShowAdvanced(!showAdvanced)}
              className="inline-flex items-center gap-2 text-xs font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <SlidersHorizontal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{showAdvanced ? 'Hide flight nuances' : 'Adjust flight code, duration & arrival timing'}</span>
            </button>

            {showAdvanced && (
              <div className="mt-4 p-5 bg-[var(--bg-subtle)] rounded-xl border border-[var(--border-hairline)] grid grid-cols-1 sm:grid-cols-3 gap-5 animate-in fade-in duration-200">
                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                    Flight Code
                  </label>
                  <select
                    value={flight}
                    onChange={(e) => setFlight(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer"
                  >
                    {availableFlights.slice(0, 40).map((fl) => (
                      <option key={fl} value={fl}>
                        {fl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)] mb-1.5">
                    Arrival Window
                  </label>
                  <select
                    value={arrival}
                    onChange={(e) => setArrival(e.target.value)}
                    className="w-full bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-primary)] cursor-pointer"
                  >
                    {options.arrivals.map((a) => (
                      <option key={a} value={a}>
                        {a.replace('_', ' ')}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1.5">
                    <label className="text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                      Duration
                    </label>
                    <span className="text-xs font-medium text-[var(--text-primary)]">{duration} hrs</span>
                  </div>
                  <input
                    type="range"
                    min="1"
                    max="30"
                    step="0.5"
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    className="w-full h-1.5 bg-[var(--border-muted)] rounded-lg appearance-none cursor-pointer accent-[var(--accent)] mt-2"
                  />
                </div>
              </div>
            )}
          </div>

          {/* 6. SUBMIT BUTTON */}
          <div className="pt-4 border-t border-[var(--border-hairline)] flex justify-end">
            <button
              type="submit"
              disabled={isLoading}
              className="btn-editorial-primary w-full sm:w-auto text-[15px] py-3 px-8 cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed shadow-xs"
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Computing estimate...</span>
                </>
              ) : (
                <span>Predict Flight Price</span>
              )}
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
