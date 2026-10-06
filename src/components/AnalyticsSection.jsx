import React, { useState } from 'react';
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell,
} from 'recharts';
import analyticsData from '../data/flight_analytics_data.json';

export default function AnalyticsSection({ lastPrediction }) {
  const [activeView, setActiveView] = useState('leadtime');

  const daysLeftData = analyticsData.days_left_analytics;
  const airlines = analyticsData.airline_analytics;
  const routes = analyticsData.route_analytics;

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[var(--bg-surface)] text-[var(--text-primary)] p-3 rounded-lg text-xs shadow-md border border-[var(--border-hairline)]">
          <p className="font-medium text-[var(--text-secondary)] mb-1">{label}</p>
          {payload.map((entry, idx) => (
            <p key={idx} className="font-semibold text-[var(--accent)]">
              {entry.name}: ₹{entry.value.toLocaleString()}
            </p>
          ))}
        </div>
      );
    }
    return null;
  };

  return (
    <section id="insights-section" className="py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <p className="text-[11px] font-medium uppercase tracking-widest text-[var(--accent)] mb-2">
            Empirical Market Insights
          </p>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            Patterns in Flight Pricing
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2.5">
            Key empirical dynamics derived from 40,000 real flight observations across Indian corridors.
          </p>
        </div>

        {/* View Switcher Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {[
            { id: 'leadtime', label: 'Booking Lead Time' },
            { id: 'airlines', label: 'Airline Comparison' },
            { id: 'routes', label: 'Top Corridors' },
          ].map((view) => (
            <button
              key={view.id}
              onClick={() => setActiveView(view.id)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all cursor-pointer ${
                activeView === view.id
                  ? 'bg-[var(--text-primary)] text-[var(--bg-canvas)] shadow-2xs'
                  : 'bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] border border-[var(--border-hairline)]'
              }`}
            >
              {view.label}
            </button>
          ))}
        </div>

        {/* Dynamic Card Container */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-2xl p-6 sm:p-10 shadow-soft">
          {/* VIEW 1: BOOKING LEAD TIME */}
          {activeView === 'leadtime' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-2">
                <div>
                  <h3 className="font-editorial text-xl font-normal text-[var(--text-primary)]">
                    Average Airfare vs. Days to Departure
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] mt-1">
                    Tariffs remain relatively stable between 15–40 days, followed by steep escalation inside 3 days.
                  </p>
                </div>
                {lastPrediction && (
                  <span className="text-xs font-medium text-[var(--accent)] bg-[var(--accent-subtle)] px-2.5 py-1 rounded-full border border-[var(--accent)]/20 self-start sm:self-auto">
                    Your Horizon: {lastPrediction.input.days_left}d (₹{lastPrediction.predictedPrice.toLocaleString()})
                  </span>
                )}
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={daysLeftData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <defs>
                      <linearGradient id="fareGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--accent)" stopOpacity={0.25} />
                        <stop offset="95%" stopColor="var(--accent)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-hairline)" vertical={false} />
                    <XAxis
                      dataKey="days_left"
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                      reversed={true}
                      unit="d"
                    />
                    <YAxis
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Area
                      type="monotone"
                      dataKey="avg_price"
                      name="Average Fare"
                      stroke="var(--accent)"
                      fill="url(#fareGradient)"
                      strokeWidth={2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>

              <div className="pt-4 border-t border-[var(--border-hairline)] flex justify-between text-xs text-[var(--text-tertiary)] font-mono">
                <span>← 49 days out (Early Booking)</span>
                <span>1 day out (Departure Eve) →</span>
              </div>
            </div>
          )}

          {/* VIEW 2: AIRLINE COMPARISON */}
          {activeView === 'airlines' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-editorial text-xl font-normal text-[var(--text-primary)]">
                  Carrier Fare Benchmarks
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Budget carriers (IndiGo, SpiceJet, AirAsia, GO FIRST) vs Full-Service (Vistara, Air India).
                </p>
              </div>

              <div className="h-72 w-full pt-4">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={airlines} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="var(--border-hairline)" vertical={false} />
                    <XAxis
                      dataKey="airline"
                      tick={{ fill: 'var(--text-primary)', fontSize: 12 }}
                      tickFormatter={(name) => name.replace('_', ' ')}
                    />
                    <YAxis
                      tick={{ fill: 'var(--text-tertiary)', fontSize: 11 }}
                      tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Bar dataKey="mean" name="Average Fare" radius={[4, 4, 0, 0]}>
                      {airlines.map((entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={entry.airline === 'Vistara' ? 'var(--accent)' : 'var(--text-secondary)'}
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>
          )}

          {/* VIEW 3: TOP CORRIDORS */}
          {activeView === 'routes' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              <div>
                <h3 className="font-editorial text-xl font-normal text-[var(--text-primary)]">
                  Primary Metropolitan Corridors
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-1">
                  Empirical pricing benchmarks across the most frequently flown city pairs.
                </p>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-left text-xs sm:text-sm">
                  <thead>
                    <tr className="border-b border-[var(--border-hairline)] text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                      <th className="py-3 px-3">Route Corridor</th>
                      <th className="py-3 px-3 text-right">Observations</th>
                      <th className="py-3 px-3 text-right">Median Fare</th>
                      <th className="py-3 px-3 text-right">Average Fare</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[var(--border-hairline)]">
                    {routes.slice(0, 6).map((r) => (
                      <tr key={r.route} className="hover:bg-[var(--bg-subtle)] transition-colors">
                        <td className="py-3 px-3 font-medium text-[var(--text-primary)]">{r.route}</td>
                        <td className="py-3 px-3 text-right text-[var(--text-secondary)]">{r.count.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right font-medium text-[var(--accent)]">₹{r.median_price.toLocaleString()}</td>
                        <td className="py-3 px-3 text-right text-[var(--text-secondary)]">₹{r.avg_price.toLocaleString()}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
