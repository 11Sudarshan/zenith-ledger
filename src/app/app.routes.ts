import { Routes } from '@angular/router';
import { DashboardComponent } from './features/dashboard/dashboard.component';
import { TransactionsPageComponent } from './features/transactions-page/transactions-page.component';
import { InsightsComponent } from './features/insights/insights.component';
import { SettingsComponent } from './features/settings/settings.component';

export const routes: Routes = [
  // Default route redirects to dashboard
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  
  // Feature routes
  { path: 'dashboard', component: DashboardComponent },
  { path: 'transactions', component: TransactionsPageComponent },
  { path: 'insights', component: InsightsComponent },
  { path: 'settings', component: SettingsComponent },
  
  // Wildcard route for 404s (redirects to dashboard)
  { path: '**', redirectTo: '/dashboard' }
];