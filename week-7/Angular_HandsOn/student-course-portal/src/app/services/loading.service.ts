import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

/**
 * LoadingService (Hands-On 8)
 *
 * Manages a global loading state used by the loading interceptor
 * to show/hide a spinner during HTTP requests.
 */
@Injectable({
  providedIn: 'root',
})
export class LoadingService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  loading$ = this.loadingSubject.asObservable();
  isLoading$ = this.loading$;

  show(): void {
    this.loadingSubject.next(true);
  }

  hide(): void {
    this.loadingSubject.next(false);
  }
}

