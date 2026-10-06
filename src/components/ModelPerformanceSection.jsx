import React from 'react';
import { Cpu, CheckCircle2 } from 'lucide-react';
import analyticsData from '../data/flight_analytics_data.json';

export default function ModelPerformanceSection() {
  const models = analyticsData.model_comparison;

  return (
    <section id="methodology-section" className="py-24 bg-[var(--bg-canvas)] border-t border-[var(--border-hairline)]">
      <div className="max-w-5xl mx-auto px-6">
        {/* Section Header */}
        <div className="max-w-2xl mb-12">
          <div className="inline-flex items-center gap-1.5 text-[11px] font-medium uppercase tracking-widest text-[var(--accent)] mb-2">
            <Cpu className="w-3.5 h-3.5" />
            <span>Architecture & Methodology</span>
          </div>
          <h2 className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] tracking-tight">
            The Science Behind The Estimates
          </h2>
          <p className="text-sm sm:text-base text-[var(--text-secondary)] mt-2.5">
            Twelve regression architectures were trained and cross-validated on 40,000 flight records. The deployed Stacking Ensemble unites gradient boosting and random decision forests with a regularized meta-regressor.
          </p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-12">
          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-hairline)] shadow-soft">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Variance Explained</p>
            <p className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] mt-1">97.03%</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Stacking Ensemble R² Score</p>
          </div>

          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-hairline)] shadow-soft">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Mean Absolute Error</p>
            <p className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] mt-1">±₹2,183</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Validation MAE margin</p>
          </div>

          <div className="bg-[var(--bg-surface)] p-6 rounded-2xl border border-[var(--border-hairline)] shadow-soft">
            <p className="text-[11px] uppercase tracking-wider text-[var(--text-tertiary)] font-medium">Validation Samples</p>
            <p className="font-editorial text-3xl sm:text-4xl font-normal text-[var(--text-primary)] mt-1">40,000</p>
            <p className="text-xs text-[var(--text-secondary)] mt-1">Indian metro corridor records</p>
          </div>
        </div>

        {/* Clean Model Evaluation Table */}
        <div className="bg-[var(--bg-surface)] border border-[var(--border-hairline)] rounded-2xl p-6 sm:p-8 shadow-soft">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="font-editorial text-lg font-normal text-[var(--text-primary)]">
                Cross-Validation Leaderboard
              </h3>
              <p className="text-xs text-[var(--text-secondary)]">
                Comparative performance across evaluated machine learning algorithms.
              </p>
            </div>
            <span className="text-[11px] font-mono text-[var(--text-tertiary)] self-start sm:self-auto">
              Scikit-Learn / XGBoost / CatBoost
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead>
                <tr className="border-b border-[var(--border-hairline)] text-[11px] font-medium uppercase tracking-wider text-[var(--text-tertiary)]">
                  <th className="py-3 px-3">Model Architecture</th>
                  <th className="py-3 px-3">Type</th>
                  <th className="py-3 px-3 text-right">Validation MAE</th>
                  <th className="py-3 px-3 text-right">R² Score</th>
                  <th className="py-3 px-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--border-hairline)]">
                {models.slice(0, 6).map((m) => (
                  <tr
                    key={m.model}
                    className={`transition-colors ${
                      m.is_best ? 'bg-[var(--accent-subtle)]/50' : 'hover:bg-[var(--bg-subtle)]'
                    }`}
                  >
                    <td className="py-3.5 px-3 font-medium text-[var(--text-primary)] flex items-center gap-2">
                      {m.is_best && <CheckCircle2 className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />}
                      <span>{m.model}</span>
                    </td>
                    <td className="py-3.5 px-3 text-xs text-[var(--text-secondary)]">{m.type}</td>
                    <td className="py-3.5 px-3 text-right text-[var(--text-secondary)]">₹{m.mae.toLocaleString()}</td>
                    <td className="py-3.5 px-3 text-right font-medium text-[var(--text-primary)]">
                      {(m.r2 * 100).toFixed(2)}%
                    </td>
                    <td className="py-3.5 px-3 text-right">
                      {m.is_best ? (
                        <span className="inline-block text-[10px] uppercase tracking-wider font-semibold px-2 py-0.5 rounded-full bg-[var(--accent)] text-white">
                          Deployed
                        </span>
                      ) : (
                        <span className="text-[11px] text-[var(--text-tertiary)]">Benchmark</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>
  );
}
