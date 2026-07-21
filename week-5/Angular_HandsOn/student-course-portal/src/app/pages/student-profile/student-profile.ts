import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';

/**
 * StudentProfileComponent (Hands-On 2, 6)
 * Displays the student profile and enrolled courses list.
 */
@Component({
  selector: 'app-student-profile',
  imports: [CommonModule],
  templateUrl: './student-profile.html',
  styleUrl: './student-profile.css',
})
export class StudentProfile implements OnInit {
  studentName = 'Tushar Chaudhary';
  studentId = 'STU2024001';
  email = 'tushar@example.com';
  department = 'Computer Science';
  year = 3;
  gpa = 3.8;
  enrolledCourses: Course[] = [];
  isLoading = true;

  constructor(
    private enrollmentService: EnrollmentService,
    private courseService: CourseService
  ) {}

  ngOnInit(): void {
    this.courseService.getCourses().subscribe({
      next: (all) => {
        const ids = this.enrollmentService.getEnrolledIds();
        this.enrolledCourses = all.filter(c => ids.includes(c.id));
        this.isLoading = false;
      },
      error: () => {
        // fallback
        this.enrolledCourses = [
          { id: 1, name: 'Data Structures & Algorithms', code: 'CS201', credits: 4, department: 'Computer Science', gradeStatus: 'Passed' },
          { id: 3, name: 'Web Development', code: 'CS401', credits: 4, department: 'Computer Science', gradeStatus: 'Pending' },
        ];
        this.isLoading = false;
      }
    });
  }
}
