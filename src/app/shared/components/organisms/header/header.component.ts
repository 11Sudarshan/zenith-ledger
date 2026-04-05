import { Component, ElementRef, HostListener, inject, signal, ViewChild } from '@angular/core';
import { ThemeService } from '../../../../core/services/theme.service';
import { FinanceService } from '../../../../core/services/finance.service';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
   
  themeService = inject(ThemeService);
  financeService = inject(FinanceService);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  shortcutHint = signal<string>('⌘K');

  constructor() {
     
    const isMac = navigator.userAgent.includes('Mac') || navigator.platform.toUpperCase().includes('MAC');
    this.shortcutHint.set(isMac ? '⌘K' : 'Ctrl+K');
  }

   
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
     
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault();  
      this.searchInput.nativeElement.focus();  
    }
  }

   
  onGlobalSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.financeService.updateSearch(input.value);
  }
}