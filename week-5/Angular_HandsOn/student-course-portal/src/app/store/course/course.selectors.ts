import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';

/**
 * NgRx Course Selectors (Hands-On 9)
 */
export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(selectCourseState, state => state.courses);
export const selectCoursesLoading = createSelector(selectCourseState, state => state.loading);
export const selectCoursesError = createSelector(selectCourseState, state => state.error);
export const selectCourseById = (id: number) =>
  createSelector(selectAllCourses, courses => courses.find(c => c.id === id));
export const selectCoursesCount = createSelector(selectAllCourses, courses => courses.length);
