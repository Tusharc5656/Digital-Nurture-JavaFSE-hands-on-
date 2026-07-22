import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { CourseCard } from '../../components/course-card/course-card';
import { CourseSummaryWidgetComponent } from '../../components/course-summary-widget/course-summary-widget';
import { Course } from '../../models/course.model';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { NotificationService } from '../../services/notification.service';
import * as CourseActions from '../../store/course/course.actions';
import { selectAllCourses, selectCoursesLoading, selectCoursesError } from '../../store/course/course.selectors';

/**
 * CourseListComponent (Hands-On 2, 3, 6, 7, 8, 9)
 *
 * Demonstrates:
 * - ngFor with trackBy for list performance optimization
 * - ngIf / ng-template #noCourses for loading and empty states
 * - Route query parameters (/courses?search=...) read & written
 * - Navigation to detail page /courses/:id
 * - Integration with NgRx store actions, selectors, and async pipe
 * - Selected course ID display
 */
@Component({
  selector: 'app-course-list',
  standalone: true,
  imports: [CommonModule, FormsModule, CourseCard, CourseSummaryWidgetComponent],
  providers: [NotificationService],
  templateUrl: './course-list.html',
  styleUrl: './course-list.css',
})
export class CourseList implements OnInit, OnDestroy {
  courses$: Observable<Course[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  coursesList: Course[] = [];
  selectedCourseId: number | null = null;
  isLoading = true;
  searchTerm = '';
  errorMessage = '';

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private notificationService: NotificationService,
    private router: Router,
    private route: ActivatedRoute,
    private store: Store
  ) {
    this.courses$ = this.store.select(selectAllCourses);
    this.loading$ = this.store.select(selectCoursesLoading);
    this.error$ = this.store.select(selectCoursesError);
  }

  ngOnInit(): void {
    console.log('[CourseList] ngOnInit - Initializing course list');

    // Read search query param (Hands-On 7)
    const querySearch = this.route.snapshot.queryParamMap.get('search');
    if (querySearch) {
      this.searchTerm = querySearch;
    }

    // Dispatch NgRx load action (Hands-On 9)
    this.store.dispatch(CourseActions.loadCourses());

    // 1.5s simulated loading delay (Hands-On 3 requirement)
    setTimeout(() => {
      this.courseService.getCourses().subscribe({
        next: (data) => {
          this.coursesList = data;
          this.isLoading = false;
        },
        error: () => {
          this.coursesList = this.getFallbackCourses();
          this.isLoading = false;
        }
      });
    }, 1500);
  }

  ngOnDestroy(): void {
    console.log('[CourseList] ngOnDestroy - Cleaning up CourseListComponent');
  }

  /**
   * trackBy function for ngFor.
   * Improves performance by allowing Angular to re-use DOM elements when array items change,
   * instead of tearing down and rebuilding the entire list DOM tree.
   */
  trackByCourseId(index: number, course: Course): number {
    return course.id;
  }

  onEnroll(courseId: number): void {
    console.log('Enrolling in course: ' + courseId);
    this.selectedCourseId = courseId;
    this.enrollmentService.enroll(courseId);
  }

  onCardClick(courseId: number): void {
    this.selectedCourseId = courseId;
    this.router.navigate(['courses', courseId]);
  }

  onSearchChange(): void {
    this.router.navigate(['/courses'], {
      queryParams: { search: this.searchTerm || null }
    });
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
