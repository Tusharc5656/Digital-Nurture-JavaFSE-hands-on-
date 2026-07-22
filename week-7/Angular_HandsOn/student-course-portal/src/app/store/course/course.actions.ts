import { createAction, props } from '@ngrx/store';
import { Course } from '../../models/course.model';

/**
 * NgRx Course Actions (Hands-On 9)
 * Defines all actions related to course state management.
 */

// Load courses
export const loadCourses = createAction('[Course] Load Courses');
export const loadCoursesSuccess = createAction('[Course] Load Courses Success', props<{ courses: Course[] }>());
export const loadCoursesFailure = createAction('[Course] Load Courses Failure', props<{ error: string }>());

// Add course
export const addCourse = createAction('[Course] Add Course', props<{ course: Omit<Course, 'id'> }>());
export const addCourseSuccess = createAction('[Course] Add Course Success', props<{ course: Course }>());

// Delete course
export const deleteCourse = createAction('[Course] Delete Course', props<{ id: number }>());
export const deleteCourseSuccess = createAction('[Course] Delete Course Success', props<{ id: number }>());
