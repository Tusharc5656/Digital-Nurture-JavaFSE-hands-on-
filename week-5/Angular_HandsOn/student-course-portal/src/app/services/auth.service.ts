import { Injectable } from '@angular/core';

/**
 * AuthService (Hands-On 7)
 *
 * Simple authentication service for demonstrating route guards.
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private loggedIn = true; // Default to true for demo purposes

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  login(): void {
    this.loggedIn = true;
  }

  logout(): void {
    this.loggedIn = false;
  }

  toggle(): void {
    this.loggedIn = !this.loggedIn;
  }
}
