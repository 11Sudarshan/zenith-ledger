export type TransactionType = 'Credit' | 'Debit';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
export type Role = 'Admin' | 'Viewer';

export interface Transaction {
  id: string;
  entity: string;       // e.g., "Apple Store", "Stripe Payout"
  date: string;         // ISO string or formatted date
  category: string;     // e.g., "Tech", "Lifestyle", "Income"
  amount: number;       // Use negative for debit, positive for credit
  type: TransactionType;
  method: string;       // e.g., "Debit Card", "Bank Transfer"
  status: TransactionStatus;
}

export interface FinancialSummary {
  totalLiquidity: number;
  monthlyCashIn: number;
  monthlyCashOut: number;
  liquidityChangePercent: number;
}