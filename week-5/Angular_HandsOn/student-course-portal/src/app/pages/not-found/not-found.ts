import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

/**
 * NotFoundComponent (Hands-On 7) - Wildcard 404 Route
 */
@Component({
  selector: 'app-not-found',
  imports: [RouterLink],
  template: `
    <div class="container not-found">
      <div class="glass-card not-found-card">
        <span class="nf-icon">🔍</span>
        <h1>404 - Page Not Found</h1>
        <p>The page you're looking for doesn't exist or has been moved.</p>
        <a class="btn btn-primary" routerLink="/home">← Go Home</a>
      </div>
    </div>
  `,
  styles: [`
    .not-found { display: flex; align-items: center; justify-content: center; min-height: 70vh; }
    .not-found-card { text-align: center; padding: 3rem; max-width: 480px; }
    .nf-icon { font-size: 4rem; display: block; margin-bottom: 1rem; }
    h1 { font-size: 1.75rem; font-weight: 700; margin-bottom: 0.75rem; }
    p { color: var(--text-muted); margin-bottom: 2rem; }
  `]
})
export class NotFound {}
