import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';

/**
 * NgRx Enrollment Selectors (Hands-On 9)
 * Includes cross-slice selector joining courses + enrolledIds
 */
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(selectEnrollmentState, s => s.enrolledIds);

export const selectEnrolledCount = createSelector(selectEnrolledIds, ids => ids.length);

/** Cross-slice selector: joins course list and enrolled IDs */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses, ids) => courses.filter(c => ids.includes(c.id))
);
