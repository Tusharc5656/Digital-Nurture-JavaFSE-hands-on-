import { createFeatureSelector, createSelector } from '@ngrx/store';
import { EnrollmentState } from './enrollment.reducer';
import { selectAllCourses } from '../course/course.selectors';
import { Course } from '../../models/course.model';

/**
 * NgRx Enrollment Selectors (Hands-On 9)
 * Includes cross-slice selector joining courses + enrolledIds
 */
export const selectEnrollmentState = createFeatureSelector<EnrollmentState>('enrollment');

export const selectEnrolledIds = createSelector(selectEnrollmentState, (s: EnrollmentState) => s.enrolledIds);

export const selectEnrolledCount = createSelector(selectEnrolledIds, (ids: number[]) => ids.length);

/** Cross-slice selector: joins course list and enrolled IDs */
export const selectEnrolledCourses = createSelector(
  selectAllCourses,
  selectEnrolledIds,
  (courses: Course[], ids: number[]) => courses.filter((c: Course) => ids.includes(c.id))
);

