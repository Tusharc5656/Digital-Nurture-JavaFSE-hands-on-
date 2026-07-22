import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { EnrollmentService } from '../../services/enrollment.service';

/**
 * CourseCardComponent (Hands-On 2, 3, 6)
 *
 * Demonstrates:
 * - @Input() course data and @Output() enrollRequested event
 * - Lifecycle hook ngOnChanges logging previous and current input values
 * - *ngSwitch for grade status badge rendering
 * - [ngClass] with component getter for clean template styling
 * - [ngStyle] for dynamic left-border color
 * - Toggleable expanded card state
 * - Integration with EnrollmentService
 */
@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  @Input({ required: true }) course!: Course;
  @Output() enrollRequested = new EventEmitter<number>();

  isExpanded = false;
  private enrollmentService = inject(EnrollmentService);

  /** Getter keeps template clean by moving multi-condition CSS object logic to TS */
  get cardClasses() {
    return {
      'card--enrolled': this.isEnrolled,
      'card--full': (this.course?.credits ?? 0) >= 4,
      'expanded': this.isExpanded
    };
  }

  get isEnrolled(): boolean {
    return this.course ? this.enrollmentService.isEnrolled(this.course.id) : false;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(
        `[CourseCard] ngOnChanges - Previous:`,
        changes['course'].previousValue,
        `Current:`,
        changes['course'].currentValue
      );
    }
  }

  toggleDetails(): void {
    this.isExpanded = !this.isExpanded;
  }

  onEnrollClick(): void {
    if (this.isEnrolled) {
      this.enrollmentService.unenroll(this.course.id);
    } else {
      this.enrollmentService.enroll(this.course.id);
    }
    this.enrollRequested.emit(this.course.id);
  }

  /** Dynamic border color based on gradeStatus */
  getBorderColor(): string {
    const status = (this.course?.gradeStatus || '').toLowerCase();
    if (status === 'passed') return '#10b981'; // Green
    if (status === 'failed') return '#ef4444'; // Red
    return '#6b7280'; // Grey for pending
  }
}
