import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-area-chart',
  standalone: true,
  imports: [BaseChartDirective], // Crucial for ng2-charts
  template: `
    <div class="chart-container">
      <canvas baseChart 
        [data]="lineChartData" 
        [options]="lineChartOptions" 
        type="line">
      </canvas>
    </div>
  `,
  styles: [`
    .chart-container {
      position: relative;
      height: 300px;
      width: 100%;
    }
  `]
})
export class AreaChartComponent {
  // Mock Data for the last 6 months
  public lineChartData: ChartConfiguration<'line'>['data'] = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        data: [110000, 115000, 112000, 118000, 121000, 124500],
        label: 'Net Worth',
        fill: true,
        tension: 0.4, // Makes the line curved and smooth
        borderColor: '#415F91', // Our primary-accent color
        backgroundColor: 'rgba(65, 95, 145, 0.2)', // Semi-transparent fill
        pointBackgroundColor: '#415F91',
      }
    ]
  };

  public lineChartOptions: ChartOptions<'line'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false }, // Hide legend for cleaner look
      tooltip: {
        mode: 'index',
        intersect: false,
      }
    },
    scales: {
      y: { 
        beginAtZero: false,
        grid: { color: 'rgba(0,0,0,0.05)' }
      },
      x: { 
        grid: { display: false } // Cleaner x-axis
      }
    }
  };
}