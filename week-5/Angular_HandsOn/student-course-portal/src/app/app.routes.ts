import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';

/**
 * Application Routes (Hands-On 7)
 *
 * Demonstrates:
 * - Static routes: /home, /courses, /profile
 * - Lazy-loaded routes: /enroll, /reactive-enroll (loaded on demand)
 * - Route guards: canActivate (authGuard), canDeactivate (unsavedChangesGuard)
 * - Redirect: '' -> 'home'
 * - Wildcard: '**' -> NotFound page
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'courses',
    loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList),
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard],
  },
  {
    path: 'enroll',
    loadComponent: () => import('./pages/enrollment-form/enrollment-form').then(m => m.EnrollmentForm),
    canActivate: [authGuard],
  },
  {
    path: 'reactive-enroll',
    loadComponent: () =>
      import('./pages/reactive-enrollment-form/reactive-enrollment-form').then(
        m => m.ReactiveEnrollmentForm
      ),
    canActivate: [authGuard],
    canDeactivate: [unsavedChangesGuard],
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found').then(m => m.NotFound),
  },
];
