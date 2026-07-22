import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';

/**
 * StudentProfileComponent (Hands-On 2, 6, 7)
 * Displays student profile data and enrolled courses fetched via EnrollmentService.getEnrolledCourses().
 */
@Component({
  selector: 'app-student-profile',
  standalone: true,
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

  enrolledCourses$!: Observable<Course[]>;

  constructor(private enrollmentService: EnrollmentService) {}

  ngOnInit(): void {
    // Displays list of enrolled courses using enrollmentService.getEnrolledCourses() (Hands-On 6 Step 66)
    this.enrolledCourses$ = this.enrollmentService.getEnrolledCourses();
  }
}
