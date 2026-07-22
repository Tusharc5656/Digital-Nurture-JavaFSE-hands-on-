import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

/**
 * NotificationService (Hands-On 6)
 *
 * Demonstrates component-level provider scoping.
 * When provided at component level (via `providers: [NotificationService]`),
 * a new instance is created scoped specifically to that component subtree.
 */
@Injectable()
export class NotificationService {
  private messages: string[] = [];
  private notificationSubject = new BehaviorSubject<string | null>(null);

  getNotification(): Observable<string | null> {
    return this.notificationSubject.asObservable();
  }

  add(message: string): void {
    this.messages.push(message);
    this.notificationSubject.next(message);
    console.log(`[NotificationService] Added notification: ${message}`);
  }

  getAll(): string[] {
    return [...this.messages];
  }

  clear(): void {
    this.messages = [];
    this.notificationSubject.next(null);
  }

  get count(): number {
    return this.messages.length;
  }
}
