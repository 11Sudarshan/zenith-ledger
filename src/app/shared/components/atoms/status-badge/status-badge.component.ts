import { Component, input, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionStatus } from '../../../../core/models/transaction.model';

@Component({
  selector: 'app-status-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <span class="badge" [ngClass]="statusClass()">
      {{ status() }}
    </span>
  `,
  styleUrls: ['./status-badge.component.css']
})
export class StatusBadgeComponent {
  // Using modern Signal inputs
  status = input.required<TransactionStatus>();

  // Computed signal to dynamically assign CSS classes
  statusClass = computed(() => {
    const currentStatus = this.status().toLowerCase();
    return `badge-${currentStatus}`;
  });
}