import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CourseState } from './course.reducer';
import { Course } from '../../models/course.model';

/**
 * NgRx Course Selectors (Hands-On 9)
 */
export const selectCourseState = createFeatureSelector<CourseState>('courses');

export const selectAllCourses = createSelector(selectCourseState, (state: CourseState) => state.courses);
export const selectCoursesLoading = createSelector(selectCourseState, (state: CourseState) => state.loading);
export const selectCoursesError = createSelector(selectCourseState, (state: CourseState) => state.error);
export const selectCourseById = (id: number) =>
  createSelector(selectAllCourses, (courses: Course[]) => courses.find((c: Course) => c.id === id));
export const selectCoursesCount = createSelector(selectAllCourses, (courses: Course[]) => courses.length);

