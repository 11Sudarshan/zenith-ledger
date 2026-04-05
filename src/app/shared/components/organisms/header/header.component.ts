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
  // Inject the theme service so the template can use it
  themeService = inject(ThemeService);
  financeService = inject(FinanceService);

  @ViewChild('searchInput') searchInput!: ElementRef<HTMLInputElement>;

  shortcutHint = signal<string>('⌘K');

  constructor() {
    // Basic OS Detection to set the correct hint text
    const isMac = navigator.userAgent.includes('Mac') || navigator.platform.toUpperCase().includes('MAC');
    this.shortcutHint.set(isMac ? '⌘K' : 'Ctrl+K');
  }

  // Listen for keyboard events globally across the window
  @HostListener('window:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    // Check if (Cmd OR Ctrl) AND the 'k' key is pressed
    if ((event.metaKey || event.ctrlKey) && event.key === 'k') {
      event.preventDefault(); // Prevents the browser's default search bar from opening
      this.searchInput.nativeElement.focus(); // Focus our custom search bar
    }
  }

  // Triggered when the user types in the header search bar
  onGlobalSearch(event: Event) {
    const input = event.target as HTMLInputElement;
    this.financeService.updateSearch(input.value);
  }
}