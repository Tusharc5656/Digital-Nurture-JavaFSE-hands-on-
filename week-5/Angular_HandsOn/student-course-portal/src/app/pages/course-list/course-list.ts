import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { NotificationService } from '../../services/notification.service';
import { CourseCard } from '../../components/course-card/course-card';
import { Course } from '../../models/course.model';

/**
 * CourseListComponent (Hands-On 2, 3, 6)
 *
 * Demonstrates:
 * - ngFor with trackBy for efficient list rendering
 * - ngIf / @if for conditional display (loading state)
 * - Handling @Output() events from CourseCardComponent
 * - Component-level provider: NotificationService is scoped to this component
 */
@Component({
  selector: 'app-course-list',
  imports: [CommonModule, CourseCard],
  providers: [NotificationService], // Component-level provider scoping (Hands-On 6)
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  courses: Course[] = [];
  isLoading = true;
  errorMessage = '';
  notification = '';

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private notificationService: NotificationService
  ) {}

  ngOnInit(): void {
    console.log('[CourseList] ngOnInit - fetching courses');
    // Simulate 1.5s loading delay (Hands-On 2)
    setTimeout(() => {
      this.courseService.getCourses().subscribe({
        next: (data) => {
          this.courses = data;
          this.isLoading = false;
        },
        error: (err) => {
          // Fallback to static data if API not running
          this.courses = this.getFallbackCourses();
          this.isLoading = false;
          console.warn('[CourseList] API unavailable, using fallback data.');
        }
      });
    }, 1500);
  }

  ngOnDestroy(): void {
    console.log('[CourseList] ngOnDestroy - component cleaned up');
  }

  /** trackBy function for ngFor - improves rendering performance */
  trackByCourseId(_index: number, course: Course): number {
    return course.id;
  }

  /** Handles enrollRequested @Output event from CourseCardComponent */
  onEnrollRequested(course: Course): void {
    this.enrollmentService.enroll(course.id);
    this.notificationService.add(`Enrolled in ${course.name}`);
    this.notification = `✅ Successfully enrolled in "${course.name}"!`;
    setTimeout(() => (this.notification = ''), 4000);
  }

  private getFallbackCourses(): Course[] {
    return [
      { id: 1, name: 'Data Structures & Algorithms', code: 'CS201', credits: 4, department: 'Computer Science', gradeStatus: 'Passed', description: 'Core algorithms and data structures.' },
      { id: 2, name: 'Database Management Systems', code: 'CS301', credits: 3, department: 'Computer Science', gradeStatus: 'Passed', description: 'Relational databases, SQL, and normalization.' },
      { id: 3, name: 'Web Development', code: 'CS401', credits: 4, department: 'Computer Science', gradeStatus: 'Pending', description: 'HTML, CSS, JavaScript, and Angular.' },
      { id: 4, name: 'Machine Learning', code: 'AI501', credits: 3, department: 'AI & Data Science', gradeStatus: 'Pending', description: 'Supervised and unsupervised learning techniques.' },
      { id: 5, name: 'Operating Systems', code: 'CS302', credits: 4, department: 'Computer Science', gradeStatus: 'Failed', description: 'Process management, memory, and file systems.' },
      { id: 6, name: 'Computer Networks', code: 'CS303', credits: 3, department: 'Computer Science', gradeStatus: 'Pending', description: 'OSI model, TCP/IP, and network protocols.' },
    ];
  }
}
