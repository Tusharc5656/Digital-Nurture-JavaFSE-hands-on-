import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';

/**
 * CourseCard Unit Tests (Hands-On 10)
 * Tests: component creation, @Input rendering, @Output emitter, ngOnChanges spy
 */
describe('CourseCard', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures & Algorithms',
    code: 'CS201',
    credits: 4,
    department: 'Computer Science',
    gradeStatus: 'Passed',
    description: 'Core algorithms and data structures.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard, CreditLabelPipe, HighlightDirective],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should render the course name via @Input', () => {
    const nameEl = fixture.debugElement.query(By.css('.course-name'));
    expect(nameEl.nativeElement.textContent).toContain('Data Structures & Algorithms');
  });

  it('should render the course code via @Input', () => {
    const codeEl = fixture.debugElement.query(By.css('.course-code'));
    expect(codeEl.nativeElement.textContent).toContain('CS201');
  });

  it('should render "Passed" badge with correct class', () => {
    const badge = fixture.debugElement.query(By.css('.badge'));
    expect(badge.nativeElement.classList).toContain('badge-passed');
    expect(badge.nativeElement.textContent.trim()).toBe('Passed');
  });

  it('should emit enrollRequested @Output on enroll button click', () => {
    spyOn(component.enrollRequested, 'emit');
    // Pending courses can be enrolled; switch gradeStatus
    component.course = { ...mockCourse, gradeStatus: 'Pending' };
    fixture.detectChanges();
    const btn = fixture.debugElement.query(By.css('.enroll-btn'));
    btn.nativeElement.click();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(component.course);
  });

  it('should set isEnrolled to true after clicking enroll', () => {
    component.course = { ...mockCourse, gradeStatus: 'Pending' };
    fixture.detectChanges();
    component.onEnroll();
    expect(component.isEnrolled).toBeTrue();
  });

  it('should log course change in ngOnChanges', () => {
    spyOn(console, 'log');
    component.ngOnChanges({
      course: new SimpleChange(null, mockCourse, true),
    });
    expect(console.log).toHaveBeenCalledWith(
      '[CourseCard] course input changed:',
      'Data Structures & Algorithms'
    );
  });

  it('should return correct badge class for Failed status', () => {
    component.course = { ...mockCourse, gradeStatus: 'Failed' };
    expect(component.getGradeBadgeClass()).toBe('badge-failed');
  });

  it('should return correct badge class for Pending status', () => {
    component.course = { ...mockCourse, gradeStatus: 'Pending' };
    expect(component.getGradeBadgeClass()).toBe('badge-pending');
  });
});
