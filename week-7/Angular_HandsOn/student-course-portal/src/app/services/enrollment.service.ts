import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Student } from '../models/student.model';
import { Observable, map } from 'rxjs';

/**
 * EnrollmentService (Hands-On 6 & 8)
 *
 * Manages student enrollments. Demonstrates:
 * - Service-to-service dependency injection (depends on CourseService)
 * - Observable data manipulation with RxJS map operator
 * - HTTP calls for student enrollments
 */
@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 3]; // Simulated enrolled course IDs
  private studentsUrl = 'http://localhost:3000/students';

  constructor(
    private courseService: CourseService,
    private http: HttpClient
  ) {}

  /** Get the list of enrolled course IDs */
  getEnrolledIds(): number[] {
    return [...this.enrolledCourseIds];
  }

  /** Check if a course is enrolled */
  isEnrolled(courseId: number): boolean {
    return this.enrolledCourseIds.includes(courseId);
  }

  /** Enroll in a course */
  enroll(courseId: number): void {
    if (!this.isEnrolled(courseId)) {
      this.enrolledCourseIds.push(courseId);
      console.log(`[EnrollmentService] Enrolled in course ID: ${courseId}`);
    }
  }

  /** Unenroll from a course */
  unenroll(courseId: number): void {
    this.enrolledCourseIds = this.enrolledCourseIds.filter(id => id !== courseId);
    console.log(`[EnrollmentService] Unenrolled from course ID: ${courseId}`);
  }

  /** Get enrolled courses as full Course objects by resolving IDs via CourseService */
  getEnrolledCourses(): Observable<Course[]> {
    return this.courseService.getCourses().pipe(
      map(courses => courses.filter(c => this.enrolledCourseIds.includes(c.id)))
    );
  }

  /**
   * Fetches students enrolled in a specific course (Hands-On 8 switchMap target).
   * Note: switchMap cancels any prior in-flight student request when a user selects a new course ID.
   */
  getStudentsByCourse(courseId: number): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.studentsUrl}?courseId=${courseId}`);
  }
}

