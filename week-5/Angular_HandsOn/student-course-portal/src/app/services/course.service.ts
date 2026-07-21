import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError, BehaviorSubject } from 'rxjs';
import { catchError, tap, retry, switchMap } from 'rxjs/operators';
import { Course } from '../models/course.model';

/**
 * CourseService (Hands-On 6 & 8)
 *
 * Centralized service for managing courses.
 * - providedIn: 'root' makes this a singleton available application-wide.
 * - Uses HttpClient to perform CRUD operations against the JSON Server API.
 * - Demonstrates RxJS operators: catchError, tap, retry, switchMap.
 */
@Injectable({
  providedIn: 'root',
})
export class CourseService {
  private apiUrl = 'http://localhost:3000/courses';

  /** BehaviorSubject holding the latest fetched courses for switchMap demo */
  private refreshTrigger$ = new BehaviorSubject<void>(undefined);

  constructor(private http: HttpClient) {}

  /** GET all courses with retry and error handling */
  getCourses(): Observable<Course[]> {
    return this.http.get<Course[]>(this.apiUrl).pipe(
      retry(2),
      tap(courses => console.log(`[CourseService] Fetched ${courses.length} courses`)),
      catchError(this.handleError)
    );
  }

  /** GET a single course by ID */
  getCourseById(id: number): Observable<Course> {
    return this.http.get<Course>(`${this.apiUrl}/${id}`).pipe(
      tap(course => console.log(`[CourseService] Fetched course: ${course.name}`)),
      catchError(this.handleError)
    );
  }

  /** POST a new course */
  addCourse(course: Omit<Course, 'id'>): Observable<Course> {
    return this.http.post<Course>(this.apiUrl, course).pipe(
      tap(newCourse => console.log(`[CourseService] Added course: ${newCourse.name}`)),
      catchError(this.handleError)
    );
  }

  /** PUT update an existing course */
  updateCourse(course: Course): Observable<Course> {
    return this.http.put<Course>(`${this.apiUrl}/${course.id}`, course).pipe(
      tap(updated => console.log(`[CourseService] Updated course: ${updated.name}`)),
      catchError(this.handleError)
    );
  }

  /** DELETE a course by ID */
  deleteCourse(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`).pipe(
      tap(() => console.log(`[CourseService] Deleted course ID: ${id}`)),
      catchError(this.handleError)
    );
  }

  /**
   * Demonstrates switchMap: triggers a fresh fetch when refreshTrigger$ emits.
   * This cancels any in-flight requests when a new trigger fires.
   */
  getCoursesOnRefresh(): Observable<Course[]> {
    return this.refreshTrigger$.pipe(
      switchMap(() => this.getCourses())
    );
  }

  /** Call this to trigger a refresh of the courses list */
  refreshCourses(): void {
    this.refreshTrigger$.next();
  }

  /** Centralized error handler */
  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An unknown error occurred';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client Error: ${error.error.message}`;
    } else {
      errorMessage = `Server Error: ${error.status} - ${error.message}`;
    }
    console.error(`[CourseService] ${errorMessage}`);
    return throwError(() => new Error(errorMessage));
  }
}
