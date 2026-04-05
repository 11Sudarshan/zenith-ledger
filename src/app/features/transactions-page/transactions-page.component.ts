import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../core/services/finance.service';
import { TransactionTableComponent } from '../../shared/components/organisms/transaction-table/transaction-table.component';

@Component({
  selector: 'app-transactions-page',
  standalone: true,
  imports: [CommonModule, TransactionTableComponent],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Transaction History</h1>
        <p class="text-muted">A complete view of your financial activity.</p>
      </header>

      <div class="content-card">
        <app-transaction-table 
          [transactions]="financeService.transactions()"
          [userRole]="financeService.currentRole()"
          (deleteTx)="financeService.deleteTransaction($event)">
        </app-transaction-table>
      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: var(--space-xl); max-width: 1400px; margin: 0 auto; }
    .page-header { margin-bottom: var(--space-lg); }
    .page-title { font-size: 1.875rem; color: var(--text-main); margin-bottom: var(--space-xs); }
    .text-muted { color: var(--text-muted); }
    .content-card { padding-top: var(--space-md); }
  `]
})
export class TransactionsPageComponent {
  financeService = inject(FinanceService);
}