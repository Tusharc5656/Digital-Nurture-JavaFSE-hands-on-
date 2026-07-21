import { Injectable } from '@angular/core';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';
import { Observable, map } from 'rxjs';

/**
 * EnrollmentService (Hands-On 6)
 *
 * Manages student enrollments. Demonstrates:
 * - Service-to-service dependency injection (depends on CourseService)
 * - Observable data manipulation with RxJS map operator
 */
@Injectable({
  providedIn: 'root',
})
export class EnrollmentService {
  private enrolledCourseIds: number[] = [1, 3]; // Simulated enrolled course IDs

  constructor(private courseService: CourseService) {}

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
}
