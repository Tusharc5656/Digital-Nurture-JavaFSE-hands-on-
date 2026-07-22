import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { Course } from '../../models/course.model';
import { Observable } from 'rxjs';

/**
 * CourseSummaryWidgetComponent (Hands-On 6)
 * Demonstrates multiple components consuming the singleton CourseService instance.
 */
@Component({
  selector: 'app-course-summary-widget',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="summary-widget">
      <h3>Course Summary Widget</h3>
      <p>Total Available Courses: <strong>{{ (courses$ | async)?.length || 0 }}</strong></p>
    </div>
  `,
  styles: [`
    .summary-widget {
      background: linear-gradient(135deg, #1e293b, #334155);
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      margin: 1rem 0;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .summary-widget h3 {
      margin-top: 0;
      color: #38bdf8;
    }
  `]
})
export class CourseSummaryWidgetComponent implements OnInit {
  courses$!: Observable<Course[]>;

  constructor(private courseService: CourseService) {}

  ngOnInit(): void {
    this.courses$ = this.courseService.getCourses();
  }
}
