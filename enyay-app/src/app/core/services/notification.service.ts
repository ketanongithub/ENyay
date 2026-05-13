import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface Notification {
  id: string;
  type: 'success' | 'error' | 'warning' | 'info';
  message: string;
  duration?: number;
}

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notificationsSubject = new BehaviorSubject<Notification[]>([]);
  notifications$: Observable<Notification[]> = this.notificationsSubject.asObservable();

  showSuccess(message: string, duration = 3000): void {
    this.addNotification({ type: 'success', message, duration });
  }

  showError(message: string, duration = 5000): void {
    this.addNotification({ type: 'error', message, duration });
  }

  showWarning(message: string, duration = 4000): void {
    this.addNotification({ type: 'warning', message, duration });
  }

  showInfo(message: string, duration = 3000): void {
    this.addNotification({ type: 'info', message, duration });
  }

  dismiss(id: string): void {
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next(current.filter((n) => n.id !== id));
  }

  private addNotification(
    notification: Omit<Notification, 'id'>
  ): void {
    const id = this.generateId();
    const newNotification: Notification = { ...notification, id };
    const current = this.notificationsSubject.value;
    this.notificationsSubject.next([...current, newNotification]);

    if (notification.duration) {
      setTimeout(() => this.dismiss(id), notification.duration);
    }
  }

  private generateId(): string {
    return `notif-${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
  }
}
