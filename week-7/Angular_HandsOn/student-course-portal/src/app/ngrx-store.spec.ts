import { TestBed } from '@angular/core/testing';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Store } from '@ngrx/store';
import { courseReducer, initialCourseState } from './store/course/course.reducer';
import { enrollmentReducer, initialEnrollmentState } from './store/enrollment/enrollment.reducer';
import * as CourseActions from './store/course/course.actions';
import * as EnrollmentActions from './store/enrollment/enrollment.actions';
import {
  selectAllCourses,
  selectCoursesLoading,
  selectCoursesError,
} from './store/course/course.selectors';
import {
  selectEnrolledIds,
  selectEnrolledCourses,
} from './store/enrollment/enrollment.selectors';
import { Course } from './models/course.model';

/**
 * NgRx Store Unit Tests (Hands-On 10)
 * Uses provideMockStore to test selectors and reducers.
 */
describe('NgRx Course Reducer', () => {
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, department: 'CS', gradeStatus: 'Passed' },
    { id: 2, name: 'Web Dev', code: 'CS401', credits: 3, department: 'CS', gradeStatus: 'Pending' },
  ];

  it('should return initial state', () => {
    const state = courseReducer(undefined, { type: '__UNKNOWN__' } as any);
    expect(state).toEqual(initialCourseState);
  });

  it('should set loading=true on loadCourses', () => {
    const state = courseReducer(initialCourseState, CourseActions.loadCourses());
    expect(state.loading).toBeTrue();
    expect(state.error).toBeNull();
  });

  it('should set courses and loading=false on loadCoursesSuccess', () => {
    const state = courseReducer(
      { ...initialCourseState, loading: true },
      CourseActions.loadCoursesSuccess({ courses: mockCourses })
    );
    expect(state.courses.length).toBe(2);
    expect(state.loading).toBeFalse();
  });

  it('should set error on loadCoursesFailure', () => {
    const state = courseReducer(
      { ...initialCourseState, loading: true },
      CourseActions.loadCoursesFailure({ error: 'Not Found' })
    );
    expect(state.error).toBe('Not Found');
    expect(state.loading).toBeFalse();
  });

  it('should add course on addCourseSuccess', () => {
    const start = { ...initialCourseState, courses: [mockCourses[0]] };
    const state = courseReducer(start, CourseActions.addCourseSuccess({ course: mockCourses[1] }));
    expect(state.courses.length).toBe(2);
  });

  it('should remove course on deleteCourseSuccess', () => {
    const start = { ...initialCourseState, courses: mockCourses };
    const state = courseReducer(start, CourseActions.deleteCourseSuccess({ id: 1 }));
    expect(state.courses.find(c => c.id === 1)).toBeUndefined();
  });
});

describe('NgRx Enrollment Reducer', () => {
  it('should return initial state', () => {
    const state = enrollmentReducer(undefined, { type: '__UNKNOWN__' } as any);
    expect(state).toEqual(initialEnrollmentState);
  });

  it('should add course ID on enrollCourse', () => {
    const state = enrollmentReducer(initialEnrollmentState, EnrollmentActions.enrollCourse({ courseId: 5 }));
    expect(state.enrolledIds).toContain(5);
  });

  it('should not duplicate IDs on enrollCourse', () => {
    const state = enrollmentReducer(initialEnrollmentState, EnrollmentActions.enrollCourse({ courseId: 1 }));
    const count = state.enrolledIds.filter(id => id === 1).length;
    expect(count).toBe(1);
  });

  it('should remove course ID on unenrollCourse', () => {
    const state = enrollmentReducer(initialEnrollmentState, EnrollmentActions.unenrollCourse({ courseId: 1 }));
    expect(state.enrolledIds).not.toContain(1);
  });
});

describe('NgRx Selectors with MockStore', () => {
  let store: MockStore;
  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, department: 'CS', gradeStatus: 'Passed' },
    { id: 2, name: 'Web Dev', code: 'CS401', credits: 3, department: 'CS', gradeStatus: 'Pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideMockStore({
          initialState: {
            courses: { courses: mockCourses, loading: false, error: null },
            enrollment: { enrolledIds: [1] },
          },
        }),
      ],
    });
    store = TestBed.inject<MockStore>(Store as any);
  });

  it('should select all courses', (done) => {
    store.select(selectAllCourses).subscribe(courses => {
      expect(courses.length).toBe(2);
      done();
    });
  });

  it('should select loading state as false', (done) => {
    store.select(selectCoursesLoading).subscribe(loading => {
      expect(loading).toBeFalse();
      done();
    });
  });

  it('should select enrolled courses via cross-slice selector', (done) => {
    store.select(selectEnrolledCourses).subscribe(enrolled => {
      expect(enrolled.length).toBe(1);
      expect(enrolled[0].id).toBe(1);
      done();
    });
  });
});
