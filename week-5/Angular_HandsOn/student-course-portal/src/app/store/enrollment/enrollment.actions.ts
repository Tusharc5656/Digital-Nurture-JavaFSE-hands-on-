import { createAction, props } from '@ngrx/store';

/**
 * NgRx Enrollment Actions (Hands-On 9)
 */
export const enrollCourse = createAction('[Enrollment] Enroll Course', props<{ courseId: number }>());
export const unenrollCourse = createAction('[Enrollment] Unenroll Course', props<{ courseId: number }>());
export const setEnrolledIds = createAction('[Enrollment] Set Enrolled IDs', props<{ ids: number[] }>());
