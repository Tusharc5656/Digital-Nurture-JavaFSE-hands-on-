import { Injectable } from '@angular/core';

/**
 * NotificationService (Hands-On 6)
 *
 * Demonstrates component-level provider scoping.
 * When provided at the component level (via `providers: [NotificationService]`),
 * each component instance gets its own separate instance of this service.
 */
@Injectable()  // Note: NOT providedIn: 'root' — this is intentional for component-level demo
export class NotificationService {
  private messages: string[] = [];

  add(message: string): void {
    this.messages.push(message);
    console.log(`[NotificationService] Added: ${message}`);
  }

  getAll(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
  }

  get count(): number {
    return this.messages.length;
  }
}
