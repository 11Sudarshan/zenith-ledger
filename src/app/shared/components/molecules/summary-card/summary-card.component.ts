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
   
  title = input.required<string>();
  amount = input.required<number>();
  
   
  iconClass = input.required<string>(); 

   
  trend = input<number>(); 
  trendText = input<string>('vs last month');

   
  isPositiveTrend = computed(() => {
    const currentTrend = this.trend();
    return currentTrend !== undefined && currentTrend >= 0;
  });
}