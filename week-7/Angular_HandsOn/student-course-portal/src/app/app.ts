import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Header } from './components/header/header';
import { LoadingService } from './services/loading.service';

/**
 * App Root Component
 * - Hosts the Header and RouterOutlet
 * - Shows global loading spinner via LoadingService
 */
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, CommonModule, Header],
  template: `
    <app-header></app-header>
    <!-- Global loading spinner (Hands-On 8) -->
    <div class="global-loader" *ngIf="loading$ | async">
      <div class="spinner"></div>
    </div>
    <router-outlet></router-outlet>
  `,
  styles: [`
    .global-loader {
      position: fixed; top: 0; left: 0; width: 100%; height: 3px;
      background: rgba(99,102,241,0.2); z-index: 999;
    }
    .spinner {
      height: 100%; width: 40%;
      background: linear-gradient(to right, #6366f1, #10b981);
      animation: slide 1.2s ease-in-out infinite;
      border-radius: 2px;
    }
    @keyframes slide {
      0% { transform: translateX(-100%); }
      100% { transform: translateX(300%); }
    }
  `]
})
export class App {
  private loadingService = inject(LoadingService);
  loading$ = this.loadingService.loading$;
}

