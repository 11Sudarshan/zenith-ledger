import { Component } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-donut-chart',
  standalone: true,
  imports: [BaseChartDirective],
  template: `
    <div class="chart-container">
      <canvas baseChart 
        [data]="doughnutChartData" 
        [options]="doughnutChartOptions" 
        type="doughnut">
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
export class DonutChartComponent {
  public doughnutChartData: ChartConfiguration<'doughnut'>['data'] = {
    labels: ['Tech', 'Lifestyle', 'Utilities'],
    datasets: [
      {
        data: [4500, 2800, 900],
         
        backgroundColor: ['#415F91', '#48BB78', '#38B2AC'], 
        hoverOffset: 4,
        borderWidth: 0  
      }
    ]
  };

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: '75%',  
    plugins: {
      legend: { position: 'bottom' }
    }
  };
}