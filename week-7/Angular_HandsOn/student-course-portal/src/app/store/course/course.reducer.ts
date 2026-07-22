import { createReducer, on } from '@ngrx/store';
import { Course } from '../../models/course.model';
import * as CourseActions from './course.actions';

/**
 * NgRx Course Reducer (Hands-On 9)
 */
export interface CourseState {
  courses: Course[];
  loading: boolean;
  error: string | null;
}

export const initialCourseState: CourseState = {
  courses: [],
  loading: false,
  error: null,
};

export const courseReducer = createReducer(
  initialCourseState,

  on(CourseActions.loadCourses, state => ({ ...state, loading: true, error: null })),

  on(CourseActions.loadCoursesSuccess, (state, { courses }) => ({
    ...state,
    courses,
    loading: false,
  })),

  on(CourseActions.loadCoursesFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),

  on(CourseActions.addCourseSuccess, (state, { course }) => ({
    ...state,
    courses: [...state.courses, course],
  })),

  on(CourseActions.deleteCourseSuccess, (state, { id }) => ({
    ...state,
    courses: state.courses.filter(c => c.id !== id),
  }))
);
