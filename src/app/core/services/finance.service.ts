// src/app/core/services/finance.service.ts
import { Injectable, signal, computed, effect } from '@angular/core';
import { Transaction, Role, FinancialSummary } from '../models/transaction.model';

@Injectable({
  providedIn: 'root'
})
export class FinanceService {
  
  // --- STATE (Signals) ---
  readonly transactions = signal<Transaction[]>([]);
  readonly currentRole = signal<Role>('Admin');
  readonly isLoading = signal<boolean>(true);

  // NEW: Filter States
  readonly searchQuery = signal<string>('');
  readonly filterCategory = signal<string>('All');
  readonly filterType = signal<string>('All');

  // --- COMPUTED STATE ---
  readonly financialSummary = computed<FinancialSummary>(() => {
    const txs = this.transactions();
    const cashIn = txs.filter(t => t.amount > 0).reduce((sum, t) => sum + t.amount, 0);
    const cashOut = Math.abs(txs.filter(t => t.amount < 0).reduce((sum, t) => sum + t.amount, 0));
    const total = cashIn - cashOut; 

    return {
      totalLiquidity: total + 1200000, 
      monthlyCashIn: cashIn,
      monthlyCashOut: cashOut,
      liquidityChangePercent: 12.5 
    };
  });

  // NEW: The Reactively Filtered List
  readonly filteredTransactions = computed<Transaction[]>(() => {
    const txs = this.transactions();
    const search = this.searchQuery().toLowerCase();
    const category = this.filterCategory();
    const type = this.filterType();

    return txs.filter(tx => {
      const matchesSearch = tx.entity.toLowerCase().includes(search) || 
                            tx.category.toLowerCase().includes(search);
      const matchesCategory = category === 'All' || tx.category === category;
      const matchesType = type === 'All' || tx.type === type;
      
      return matchesSearch && matchesCategory && matchesType;
    });
  });

constructor() {
    // 🪄 MAGIC DATA PERSISTENCE: Automatically saves to localStorage when transactions change
    effect(() => {
      const currentTxs = this.transactions();
      if (currentTxs.length > 0) {
        localStorage.setItem('zenith_transactions', JSON.stringify(currentTxs));
      }
    });

    // Automatically save role preference
    effect(() => {
      localStorage.setItem('zenith_role', this.currentRole());
    });

    this.loadInitialData();
  }

  // --- METHODS ---
  toggleRole() {
    this.currentRole.update(role => role === 'Admin' ? 'Viewer' : 'Admin');
  }

  deleteTransaction(id: string) {
    // Filters out the deleted ID and updates the signal
    this.transactions.update(txs => txs.filter(t => t.id !== id));
  }

addTransaction(newTx: Omit<Transaction, 'id'>) {
    const transaction: Transaction = {
      ...newTx,
      id: Math.random().toString(36).substring(2, 9) // Generate a random ID
    };
    this.transactions.update(txs => [transaction, ...txs]);
  }

  updateTransaction(updatedTx: Transaction) {
    this.transactions.update(txs => 
      txs.map(tx => tx.id === updatedTx.id ? updatedTx : tx)
    );
  }

  // Filter updates remain the same...
  updateSearch(query: string) { this.searchQuery.set(query); }
  updateCategory(category: string) { this.filterCategory.set(category); }
  updateType(type: string) { this.filterType.set(type); }

private loadInitialData() {
    this.isLoading.set(true);
    
    // Load from Local Storage first!
    const savedRole = localStorage.getItem('zenith_role') as Role;
    if (savedRole) this.currentRole.set(savedRole);

    setTimeout(() => {
      const savedData = localStorage.getItem('zenith_transactions');
      
      if (savedData && savedData !== '[]') {
        // Parse saved data
        this.transactions.set(JSON.parse(savedData));
      } else {
        // Fallback to Mock Data if first time user
        const mockData: Transaction[] = [
          { id: '1', entity: 'Apple Store', date: '2024-10-24', category: 'Tech', amount: -1299.00, type: 'Debit', method: 'Debit Card', status: 'Completed' },
          { id: '2', entity: 'Stripe Payout', date: '2024-10-23', category: 'Income', amount: 4500.00, type: 'Credit', method: 'Bank Transfer', status: 'Completed' },
          { id: '3', entity: 'Starbucks', date: '2024-10-22', category: 'Lifestyle', amount: -6.45, type: 'Debit', method: 'Credit Card', status: 'Pending' },
          { id: '4', entity: 'City Electric Co.', date: '2024-10-21', category: 'Utilities', amount: -124.00, type: 'Debit', method: 'Auto-Pay', status: 'Completed' }
        ];
        this.transactions.set(mockData);
      }
      this.isLoading.set(false);
    }, 500);
  }
}