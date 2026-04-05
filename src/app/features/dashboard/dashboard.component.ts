import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../core/services/finance.service';
import { SummaryCardComponent } from '../../shared/components/molecules/summary-card/summary-card.component';
import { TransactionTableComponent } from '../../shared/components/organisms/transaction-table/transaction-table.component';
import { AreaChartComponent } from '../../shared/components/molecules/area-chart/area-chart.component';
import { DonutChartComponent } from '../../shared/components/molecules/donut-chart/donut-chart.component';
import { TransactionModalComponent } from '../../shared/components/organisms/transaction-modal/transaction-modal.component';
import { Transaction } from '../../core/models/transaction.model';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, SummaryCardComponent, TransactionTableComponent, AreaChartComponent, DonutChartComponent, TransactionModalComponent],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {
  public financeService = inject(FinanceService);

  isModalOpen = signal<boolean>(false);
  transactionToEdit = signal<Transaction | null>(null);

  // Triggered by "Add Transaction" button
  openAddModal() {
    this.transactionToEdit.set(null);
    this.isModalOpen.set(true);
  }

  // Triggered by table "Edit" button
  openEditModal(tx: Transaction) {
    this.transactionToEdit.set(tx);
    this.isModalOpen.set(true);
  }

  // Handle the form submission
  onSaveTransaction(txData: any) {
    if (txData.id) {
      this.financeService.updateTransaction(txData); // It's an edit
    } else {
      this.financeService.addTransaction(txData);    // It's a new entry
    }
  }

  // Event Handlers for Filters
  onSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.financeService.updateSearch(input.value);
  }

  onTypeChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.financeService.updateType(select.value);
  }

  onCategoryChange(event: Event) {
    const select = event.target as HTMLSelectElement;
    this.financeService.updateCategory(select.value);
  }

  private getExportData() {
    return this.financeService.filteredTransactions();
  }

  // Updated Export Logic
  exportData(format: 'csv' | 'json') {
    const data = this.getExportData();
    if (data.length === 0) return;

    let blob: Blob;
    let extension: string;

    if (format === 'csv') {
      const headers = ['ID', 'Entity', 'Date', 'Category', 'Amount', 'Type', 'Method', 'Status'];
      const csvRows = [headers.join(',')];
      for (const tx of data) {
        csvRows.push([tx.id, `"${tx.entity}"`, tx.date, tx.category, tx.amount, tx.type, tx.method, tx.status].join(','));
      }
      blob = new Blob([csvRows.join('\n')], { type: 'text/csv' });
      extension = 'csv';
    } else {
      // JSON Export
      const jsonString = JSON.stringify(data, null, 2);
      blob = new Blob([jsonString], { type: 'application/json' });
      extension = 'json';
    }

    this.downloadFile(blob, extension);
  }

  private downloadFile(blob: Blob, extension: string) {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `zenith_ledger_${new Date().toISOString().split('T')[0]}.${extension}`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  }
}