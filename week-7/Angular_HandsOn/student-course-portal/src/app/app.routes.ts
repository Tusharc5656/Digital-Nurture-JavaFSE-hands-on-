import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';
import { unsavedChangesGuard } from './guards/unsaved-changes.guard';
import { CoursesLayoutComponent } from './pages/courses-layout/courses-layout';

/**
 * Application Routes (Hands-On 7)
 *
 * Demonstrates:
 * - Route configuration: { path: '' }, { path: 'courses' }, { path: 'profile' }, { path: '**' }
 * - Nested routes under /courses: CoursesLayoutComponent with children ['' and ':id']
 * - Lazy loaded feature module: { path: 'enroll', loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule) }
 * - AuthGuard (CanActivate) protecting /profile and /enroll
 * - UnsavedChangesGuard (CanDeactivate) protecting reactive enrollment form
 */
export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then(m => m.Home),
  },
  {
    path: 'courses',
    component: CoursesLayoutComponent,
    children: [
      {
        path: '',
        loadComponent: () => import('./pages/course-list/course-list').then(m => m.CourseList),
      },
      {
        path: ':id',
        loadComponent: () => import('./pages/course-detail/course-detail').then(m => m.CourseDetailComponent),
      },
    ],
  },
  {
    path: 'profile',
    loadComponent: () => import('./pages/student-profile/student-profile').then(m => m.StudentProfile),
    canActivate: [authGuard],
  },
  {
    path: 'enroll',
    loadChildren: () => import('./features/enrollment/enrollment.module').then(m => m.EnrollmentModule),
    canActivate: [authGuard],
  },
  {
    path: 'enroll-reactive',
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
