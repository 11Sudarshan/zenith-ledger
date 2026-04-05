export type TransactionType = 'Credit' | 'Debit';
export type TransactionStatus = 'Completed' | 'Pending' | 'Failed';
export type Role = 'Admin' | 'Viewer';

export interface Transaction {
  id: string;
  entity: string;       
  date: string;         
  category: string;    
  amount: number;       
  type: TransactionType;
  method: string;       
  status: TransactionStatus;
}

export interface FinancialSummary {
  totalLiquidity: number;
  monthlyCashIn: number;
  monthlyCashOut: number;
  liquidityChangePercent: number;
}