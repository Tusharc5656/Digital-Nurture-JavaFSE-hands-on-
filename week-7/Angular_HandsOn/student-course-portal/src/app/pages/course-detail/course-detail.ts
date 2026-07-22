import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Student } from '../../models/student.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

/**
 * CourseDetailComponent (Hands-On 7 & 8)
 *
 * Demonstrates:
 * - Reading route parameters using ActivatedRoute snapshot (this.route.snapshot.paramMap.get('id'))
 * - Loading matching course data via CourseService.getCourseById(id)
 * - Using switchMap to chain HTTP calls: fetching course details then fetching enrolled students.
 *   Comment: switchMap cancels the previous inner Observable subscription if a new course ID arrives,
 *   preventing race conditions and unnecessary network payload processing.
 */
@Component({
  selector: 'app-course-detail',
  standalone: true,
  imports: [CommonModule, RouterLink, CreditLabelPipe],
  templateUrl: './course-detail.html',
  styles: [`
    .detail-card {
      background: white;
      border-radius: 12px;
      padding: 2rem;
      box-shadow: 0 10px 15px -3px rgba(0,0,0,0.1);
      margin-top: 2rem;
    }
    .badge {
      padding: 0.3rem 0.75rem;
      border-radius: 20px;
      font-size: 0.85rem;
      font-weight: 600;
    }
    .badge-passed { background: #d1fae5; color: #065f46; }
    .badge-failed { background: #fee2e2; color: #991b1b; }
    .badge-pending { background: #f3f4f6; color: #374151; }
    .students-section {
      margin-top: 2rem;
      border-top: 1px solid #e5e7eb;
      padding-top: 1rem;
    }
    .student-item {
      padding: 0.5rem 0;
      border-bottom: 1px solid #f3f4f6;
    }
  `]
})
export class CourseDetailComponent implements OnInit {
  course: Course | null = null;
  enrolledStudents: Student[] = [];
  isLoading = true;
  errorMessage = '';

  constructor(
    private route: ActivatedRoute,
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  ngOnInit(): void {
    const idParam = this.route.snapshot.paramMap.get('id');
    const courseId = idParam ? +idParam : 0;

    if (courseId) {
      this.courseService.getCourseById(courseId).subscribe({
        next: (courseData) => {
          this.course = courseData;
          this.isLoading = false;
        },
        error: (err) => {
          this.errorMessage = 'Course not found.';
          this.isLoading = false;
        }
      });

      // switchMap chaining demo (Hands-On 8):
      // when route param changes, switchMap cancels any prior student fetch call.
      this.route.paramMap.pipe(
        switchMap(params => {
          const id = Number(params.get('id'));
          return id ? this.enrollmentService.getStudentsByCourse(id) : of([]);
        })
      ).subscribe({
        next: (students) => {
          this.enrolledStudents = students;
        },
        error: () => {
          this.enrolledStudents = [];
        }
      });
    } else {
      this.isLoading = false;
      this.errorMessage = 'Invalid Course ID.';
    }
  }
}
