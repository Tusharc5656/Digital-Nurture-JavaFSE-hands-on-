import { Injectable, inject } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, switchMap } from 'rxjs/operators';
import { of } from 'rxjs';
import * as CourseActions from './course.actions';
import { CourseService } from '../../services/course.service';

/**
 * NgRx Course Effects (Hands-On 9)
 * Side-effects: handles async operations triggered by actions.
 */
@Injectable()
export class CourseEffects {
  private actions$ = inject(Actions);
  private courseService = inject(CourseService);

  loadCourses$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.loadCourses),
      switchMap(() =>
        this.courseService.getCourses().pipe(
          map(courses => CourseActions.loadCoursesSuccess({ courses })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  addCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.addCourse),
      switchMap(({ course }) =>
        this.courseService.addCourse(course).pipe(
          map(newCourse => CourseActions.addCourseSuccess({ course: newCourse })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );

  deleteCourse$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CourseActions.deleteCourse),
      switchMap(({ id }) =>
        this.courseService.deleteCourse(id).pipe(
          map(() => CourseActions.deleteCourseSuccess({ id })),
          catchError(error =>
            of(CourseActions.loadCoursesFailure({ error: error.message }))
          )
        )
      )
    )
  );
}

