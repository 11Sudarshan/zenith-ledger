import { Component, input, output } from '@angular/core';
import { CommonModule, CurrencyPipe, DatePipe } from '@angular/common';
import { Transaction } from '../../../../core/models/transaction.model';
import { StatusBadgeComponent } from '../../atoms/status-badge/status-badge.component';

@Component({
  selector: 'app-transaction-table',
  standalone: true,
  imports: [CommonModule, CurrencyPipe, DatePipe, StatusBadgeComponent],
  templateUrl: './transaction-table.component.html',
  styleUrls: ['./transaction-table.component.css']
})
export class TransactionTableComponent {
  // Required input: The table must receive an array of transactions
  transactions = input.required<Transaction[]>();
  
  // Optional input: We can pass the current role to disable actions for 'Viewer'
  userRole = input<'Admin' | 'Viewer'>('Admin');
  deleteTx = output<string>();
  editTx = output<Transaction>();
}