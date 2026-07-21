import { Component, Input, Output, EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

/**
 * CourseCardComponent (Hands-On 2, 3)
 * - Demonstrates @Input() for receiving course data from parent
 * - Demonstrates @Output() with EventEmitter for emitting enroll requests
 * - Uses [ngClass] for conditional badge styling
 * - Uses [ngStyle] for dynamic font-weight based on credits
 * - Uses custom HighlightDirective and CreditLabelPipe
 *
 * Data Binding Explanation:
 * - [property] (one-way): Data flows from component class -> DOM. The DOM element reflects
 *   the component's state, but changes in the DOM do NOT propagate back.
 * - [(ngModel)] (two-way): Data flows both ways (DOM <-> component). When the user types
 *   in an input, the component property updates, and vice versa.
 */
@Component({
  selector: 'app-course-card',
  imports: [CommonModule, CreditLabelPipe, HighlightDirective],
  templateUrl: './course-card.html',
  styleUrl: './course-card.css',
})
export class CourseCard implements OnChanges {
  /** The course data to display (one-way property binding from parent) */
  @Input({ required: true }) course!: Course;

  /** Event emitted when the user clicks the Enroll button */
  @Output() enrollRequested = new EventEmitter<Course>();

  /** Tracks whether this card's course has been enrolled */
  isEnrolled = false;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['course']) {
      console.log(`[CourseCard] course input changed:`, changes['course'].currentValue?.name);
    }
  }

  onEnroll(): void {
    this.isEnrolled = true;
    this.enrollRequested.emit(this.course);
  }

  /** Returns CSS class name based on grade status (used with [ngClass]) */
  getGradeBadgeClass(): string {
    switch (this.course.gradeStatus) {
      case 'Passed': return 'badge-passed';
      case 'Failed': return 'badge-failed';
      case 'Pending': return 'badge-pending';
      default: return '';
    }
  }
}
