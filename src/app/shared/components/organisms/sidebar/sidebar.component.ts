import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FinanceService } from '../../../../core/services/finance.service';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent {
   
  financeService = inject(FinanceService);
  isCollapsed = signal<boolean>(false);
  
navItems = [
    { name: 'Dashboard', icon: 'dashboard', route: '/dashboard' },
    { name: 'Transactions', icon: 'receipt_long', route: '/transactions' },
    { name: 'Insights', icon: 'lightbulb', route: '/insights' },
    { name: 'Settings', icon: 'settings', route: '/settings' },
  ];
  toggleSidebar() {
    this.isCollapsed.update(val => !val);
  }
}