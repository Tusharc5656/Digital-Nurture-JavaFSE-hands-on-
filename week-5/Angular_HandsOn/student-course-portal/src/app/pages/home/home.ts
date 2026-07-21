import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';

/**
 * HomeComponent (Hands-On 1 & 2)
 *
 * Demonstrates:
 * - Interpolation binding: {{ title }}, {{ coursesAvailable }}
 * - Property binding: [disabled]="!isLoaded"
 * - Event binding: (click)="onRefresh()"
 * - Two-way binding: [(ngModel)]="searchTerm"
 * - Lifecycle hooks: ngOnInit (simulate data fetch), ngOnDestroy (cleanup logging)
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  title = 'Welcome to Student Course Portal';
  coursesAvailable = 0;
  enrolledCount = 0;
  gpa = 3.8;
  isLoaded = false;
  searchTerm = ''; // Two-way binding with [(ngModel)]

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  /** ngOnInit: Simulate fetching data on component initialization */
  ngOnInit(): void {
    console.log('[HomeComponent] ngOnInit - Fetching dashboard data...');
    // Simulate 1s loading delay
    setTimeout(() => {
      this.courseService.getCourses().subscribe({
        next: (courses: Course[]) => {
          this.coursesAvailable = courses.length;
          this.enrolledCount = this.enrollmentService.getEnrolledIds().length;
          this.isLoaded = true;
          console.log('[HomeComponent] Dashboard data loaded.');
        },
        error: () => {
          // Fallback values if API is not running
          this.coursesAvailable = 12;
          this.enrolledCount = this.enrollmentService.getEnrolledIds().length;
          this.isLoaded = true;
        }
      });
    }, 1000);
  }

  /** ngOnDestroy: Cleanup and logging */
  ngOnDestroy(): void {
    console.log('[HomeComponent] ngOnDestroy - Component destroyed. Cleaning up subscriptions.');
  }

  onRefresh(): void {
    this.isLoaded = false;
    this.ngOnInit();
  }
}
