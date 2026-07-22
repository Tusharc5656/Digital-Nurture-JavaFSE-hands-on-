import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotificationService } from '../../services/notification.service';

/**
 * NotificationComponent (Hands-On 6)
 *
 * Demonstrates component-level service providing:
 * `providers: [NotificationService]` creates a NEW, SEPARATE instance of NotificationService
 * scoped only to this component and its children, instead of sharing the root singleton instance.
 */
@Component({
  selector: 'app-notification',
  standalone: true,
  imports: [CommonModule],
  providers: [NotificationService], // Component-level provider creates scoped instance
  template: `
    <div *ngIf="notification" class="notification-banner">
      <span>{{ notification }}</span>
      <button (click)="clear()">Dismiss</button>
    </div>
  `,
  styles: [`
    .notification-banner {
      background-color: #3b82f6;
      color: white;
      padding: 0.75rem 1.25rem;
      border-radius: 6px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }
    .notification-banner button {
      background: transparent;
      border: 1px solid white;
      color: white;
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      cursor: pointer;
    }
  `]
})
export class NotificationComponent implements OnInit {
  notification: string | null = null;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.notificationService.getNotification().subscribe((msg: string | null) => {
      this.notification = msg;
    });
  }


  clear(): void {
    this.notificationService.clear();
  }
}
