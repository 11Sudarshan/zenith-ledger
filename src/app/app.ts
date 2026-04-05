import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SidebarComponent } from './shared/components/organisms/sidebar/sidebar.component';
import { HeaderComponent } from './shared/components/organisms/header/header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, SidebarComponent, HeaderComponent],
  template: `
    <div class="app-layout">
      <app-sidebar></app-sidebar>
      
      <div class="main-content">
        <app-header></app-header>
        
        <main class="page-content">
          <router-outlet></router-outlet>
        </main>
      </div>
    </div>
  `,
  styles: [`
    .app-layout { display: flex; height: 100vh; overflow: hidden; background-color: var(--bg-main); }
    .main-content { flex: 1; display: flex; flex-direction: column; overflow: hidden; }
    .page-content { flex: 1; overflow-y: auto; }
  `]
})
export class AppComponent { }