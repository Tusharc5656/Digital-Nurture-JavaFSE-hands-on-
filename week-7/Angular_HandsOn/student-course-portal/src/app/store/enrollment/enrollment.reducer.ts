import { createReducer, on } from '@ngrx/store';
import * as EnrollmentActions from './enrollment.actions';

/**
 * NgRx Enrollment Reducer (Hands-On 9)
 */
export interface EnrollmentState {
  enrolledIds: number[];
}

export const initialEnrollmentState: EnrollmentState = {
  enrolledIds: [1, 3],
};

export const enrollmentReducer = createReducer(
  initialEnrollmentState,

  on(EnrollmentActions.enrollCourse, (state: EnrollmentState, { courseId }: { courseId: number }) => ({
    ...state,
    enrolledIds: state.enrolledIds.includes(courseId)
      ? state.enrolledIds
      : [...state.enrolledIds, courseId],
  })),

  on(EnrollmentActions.unenrollCourse, (state: EnrollmentState, { courseId }: { courseId: number }) => ({
    ...state,
    enrolledIds: state.enrolledIds.filter((id: number) => id !== courseId),
  })),

  on(EnrollmentActions.setEnrolledIds, (state: EnrollmentState, { ids }: { ids: number[] }) => ({
    ...state,
    enrolledIds: ids,
  }))
);

