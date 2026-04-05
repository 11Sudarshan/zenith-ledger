import { Injectable, signal, effect } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  // Signal to hold the current theme
  isDarkMode = signal<boolean>(false);

  constructor() {
    // Angular 'effect' automatically runs whenever the signal changes
    effect(() => {
      const isDark = this.isDarkMode();
      
      // Update the DOM to apply the CSS variables
      if (isDark) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); // Persistence!
      } else {
        document.documentElement.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
      }
    });

    // Check local storage on startup (Data Persistence requirement)
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      this.isDarkMode.set(true);
    }
  }

  toggleTheme() {
    this.isDarkMode.update(dark => !dark);
  }
}