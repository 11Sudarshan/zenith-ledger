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
   
  transactions = input.required<Transaction[]>();
  
   
  userRole = input<'Admin' | 'Viewer'>('Admin');
  deleteTx = output<string>();
  editTx = output<Transaction>();
}