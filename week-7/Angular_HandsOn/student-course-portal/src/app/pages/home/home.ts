import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { Course } from '../../models/course.model';
import { NotificationComponent } from '../../components/notification/notification';

/**
 * HomeComponent (Hands-On 1 & 2)
 *
 * Demonstrates binding types:
 * - String Interpolation: {{ portalName }}
 * - Property Binding: [disabled]="!isPortalActive"
 * - Event Binding: (click)="onEnrollClick()"
 * - Two-Way Binding: [(ngModel)]="searchTerm"
 *
 * Difference between [property] and [(ngModel)]:
 * - [property]: One-way data binding from component property to DOM element property (Component -> DOM).
 * - [(ngModel)]: Two-way data binding connecting DOM user input to component state bidirectionally (DOM <-> Component).
 *   [(ngModel)] is syntactic sugar for [ngModel]="prop" (ngModelChange)="prop = $event".
 *
 * Lifecycle hooks:
 * - ngOnInit: Component initialization & data fetching log
 * - ngOnDestroy: Subscription cleanup & teardown log
 */
@Component({
  selector: 'app-home',
  imports: [CommonModule, FormsModule, RouterLink, NotificationComponent],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit, OnDestroy {
  portalName = 'Student Course Portal';
  isPortalActive = true;
  message = '';
  searchTerm = '';

  coursesAvailable = 12;
  enrolledCount = 3;
  gpa = 3.8;
  isLoaded = false;

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService
  ) {}

  /** ngOnInit: Fetch (or simulate) count of available courses and log initialisation */
  ngOnInit(): void {
    console.log('HomeComponent initialised — courses loaded');
    this.courseService.getCourses().subscribe({
      next: (courses: Course[]) => {
        this.coursesAvailable = courses.length;
        this.enrolledCount = this.enrollmentService.getEnrolledIds().length;
        this.isLoaded = true;
      },
      error: () => {
        this.coursesAvailable = 12;
        this.enrolledCount = this.enrollmentService.getEnrolledIds().length;
        this.isLoaded = true;
      }
    });
  }

  /** ngOnDestroy: Log destruction */
  ngOnDestroy(): void {
    console.log('HomeComponent destroyed');
  }

  onEnrollClick(): void {
    this.message = 'Enrollment opened!';
  }

  onRefresh(): void {
    this.isLoaded = false;
    this.ngOnInit();
  }
}

