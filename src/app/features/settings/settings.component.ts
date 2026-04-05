import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../core/services/theme.service';

@Component({
  selector: 'app-settings',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="page-container">
      <header class="page-header">
        <h1 class="page-title">Settings</h1>
        <p class="text-muted">Manage your account preferences and data.</p>
      </header>

      <div class="settings-grid">
        
        <section class="settings-section">
          <h2>Appearance</h2>
          <div class="setting-item flex-between">
            <div class="setting-info">
              <span class="setting-name">Dark Mode</span>
              <span class="setting-desc">Switch between light and dark themes.</span>
            </div>
            
            <label class="switch">
              <input type="checkbox" 
                     [checked]="themeService.isDarkMode()" 
                     (change)="themeService.toggleTheme()">
              <span class="slider round"></span>
            </label>
          </div>
        </section>

        <section class="settings-section danger-zone">
          <h2 style="color: var(--expense-text)">Danger Zone</h2>
          <div class="setting-item flex-between">
            <div class="setting-info">
              <span class="setting-name">Clear Local Data</span>
              <span class="setting-desc">Permanently delete all saved transactions from this browser.</span>
            </div>
            <button class="btn-danger" (click)="clearData()">Reset App Data</button>
          </div>
        </section>

      </div>
    </div>
  `,
  styles: [`
    .page-container { padding: var(--space-xl); max-width: 800px; margin: 0 auto; } /* Narrower for settings */
    .page-header { margin-bottom: var(--space-xl); }
    .page-title { font-size: 1.875rem; color: var(--text-main); margin-bottom: var(--space-xs); }
    .text-muted { color: var(--text-muted); }
    
    .settings-grid { display: flex; flex-direction: column; gap: var(--space-xl); }
    .settings-section { background-color: var(--bg-surface); border: 1px solid var(--border-subtle); border-radius: var(--radius-lg); padding: var(--space-lg); box-shadow: var(--shadow-sm); }
    .settings-section h2 { color: var(--text-main); font-size: 1.125rem; margin-bottom: var(--space-lg); padding-bottom: var(--space-sm); border-bottom: 1px solid var(--border-subtle); }
    
    .setting-item { margin-bottom: var(--space-md); }
    .setting-item:last-child { margin-bottom: 0; }
    
    .setting-info { display: flex; flex-direction: column; gap: 4px; }
    .setting-name { color: var(--text-main); font-weight: 500; }
    .setting-desc { color: var(--text-muted); font-size: 0.875rem; }
    
    .danger-zone { border-color: var(--expense-bg); }
    
    .btn-danger { background-color: var(--expense-bg); color: var(--expense-text); border: 1px solid var(--expense-text); padding: var(--space-sm) var(--space-md); border-radius: var(--radius-md); font-weight: 500; cursor: pointer; transition: all 0.2s; }
    .btn-danger:hover { background-color: var(--expense-text); color: white; }
    
    /* Toggle Switch (Reused from Sidebar) */
    .switch { position: relative; display: inline-block; width: 40px; height: 24px; }
    .switch input { opacity: 0; width: 0; height: 0; }
    .slider { position: absolute; cursor: pointer; top: 0; left: 0; right: 0; bottom: 0; background-color: var(--border-subtle); transition: .4s; }
    .slider:before { position: absolute; content: ""; height: 18px; width: 18px; left: 3px; bottom: 3px; background-color: white; transition: .4s; }
    input:checked + .slider { background-color: var(--primary-accent); }
    input:checked + .slider:before { transform: translateX(16px); }
    .slider.round { border-radius: 24px; }
    .slider.round:before { border-radius: 50%; }
  `]
})
export class SettingsComponent {
  themeService = inject(ThemeService);

  clearData() {
    if (confirm("Are you sure? This will wipe all transactions and restore the mock data on refresh.")) {
      localStorage.removeItem('zenith_transactions');
      localStorage.removeItem('zenith_role');
      window.location.reload(); // Refresh to restore mock data state
    }
  }
}