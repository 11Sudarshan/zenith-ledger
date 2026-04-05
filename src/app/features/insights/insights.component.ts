import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../core/services/finance.service';

@Component({
  selector: 'app-insights',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Financial Insights</h1>
        <p class="text-muted">AI-driven analysis of your spending patterns.</p>
      </header>

      <div class="insights-grid">
        
        <div class="insight-card health-card">
          <div class="card-icon material-symbols-rounded">health_metrics</div>
          <h3>Financial Health</h3>
          <div class="score-display">
            <span class="score-number">78<span class="percent">%</span></span>
            <span class="score-label">Good Standing</span>
          </div>
          <div class="progress-bar-bg">
            <div class="progress-bar-fill" style="width: 78%"></div>
          </div>
          <p class="insight-text">Your liquidity ratio is better than 82% of similar profiles.</p>
        </div>

        <div class="insight-card tip-card">
          <div class="card-icon material-symbols-rounded" style="color: var(--pending-text);">lightbulb</div>
          <h3>Smart Tip</h3>
          <p class="insight-text">
            You spent <strong>{{ highestCategory() }}</strong> the most this month. 
            You could save $200 by optimizing your subscription renewals next month.
          </p>
          <button class="btn-outline">Review Subscriptions</button>
        </div>

      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: var(--space-xl); max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: var(--space-lg); }
    .page-title { font-size: 1.875rem; color: var(--text-main); margin-bottom: var(--space-xs); }
    .text-muted { color: var(--text-muted); }
    
    .insights-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(350px, 1fr)); gap: var(--space-lg); }
    
    .insight-card { background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-xl); box-shadow: var(--shadow-sm); display: flex; flex-direction: column; gap: var(--space-md); }
    .card-icon { font-size: 2rem; color: var(--primary-accent); }
    .insight-card h3 { color: var(--text-main); font-size: 1.25rem; }
    .insight-text { color: var(--text-muted); line-height: 1.6; }
    
    /* Health Score Specifics */
    .score-display { display: flex; align-items: baseline; gap: var(--space-sm); }
    .score-number { font-size: 3rem; font-weight: 700; color: var(--text-main); line-height: 1; }
    .percent { font-size: 1.5rem; color: var(--text-muted); }
    .score-label { font-weight: 600; color: var(--success-text); background: var(--success-bg); padding: 4px 8px; border-radius: var(--radius-sm); font-size: 0.875rem; }
    
    .progress-bar-bg { width: 100%; height: 8px; background-color: var(--bg-main); border-radius: var(--radius-full); overflow: hidden; margin: var(--space-sm) 0; }
    .progress-bar-fill { height: 100%; background-color: var(--primary-accent); border-radius: var(--radius-full); }
    
    .btn-outline { background: transparent; border: 1px solid var(--border-subtle); color: var(--text-main); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); cursor: pointer; font-weight: 500; align-self: flex-start; margin-top: auto; }
    .btn-outline:hover { background-color: var(--bg-surface-hover); border-color: var(--text-muted); }
  `]
})
export class InsightsComponent {
  financeService = inject(FinanceService);

  // Compute the highest spending category dynamically from real data!
  highestCategory = computed(() => {
    const txs = this.financeService.transactions().filter(t => t.type === 'Debit');
    if (txs.length === 0) return 'Nothing';
    
    const categoryTotals: Record<string, number> = {};
    txs.forEach(tx => {
      categoryTotals[tx.category] = (categoryTotals[tx.category] || 0) + Math.abs(tx.amount);
    });

    let topCategory = '';
    let maxAmount = 0;
    for (const [category, amount] of Object.entries(categoryTotals)) {
      if (amount > maxAmount) {
        maxAmount = amount;
        topCategory = category;
      }
    }
    return topCategory;
  });
}