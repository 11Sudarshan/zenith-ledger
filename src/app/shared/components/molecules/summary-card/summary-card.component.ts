import { Component, input, computed } from '@angular/core';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-summary-card',
  standalone: true,
  imports: [CommonModule, CurrencyPipe],
  templateUrl: './summary-card.component.html',
  styleUrls: ['./summary-card.component.css']
})
export class SummaryCardComponent {
  // Required Inputs
  title = input.required<string>();
  amount = input.required<number>();
  
  // We'll pass a class name for the icon (e.g., 'lucide-wallet' or standard text symbol for now)
  iconClass = input.required<string>(); 

  // Optional Inputs for the trend indicator
  trend = input<number>(); 
  trendText = input<string>('vs last month');

  // Computed signal to dynamically style the trend
  isPositiveTrend = computed(() => {
    const currentTrend = this.trend();
    return currentTrend !== undefined && currentTrend >= 0;
  });
}