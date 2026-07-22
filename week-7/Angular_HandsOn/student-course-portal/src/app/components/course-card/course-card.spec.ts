import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { CourseCard } from './course-card';
import { Course } from '../../models/course.model';
import { CreditLabelPipe } from '../../pipes/credit-label.pipe';
import { HighlightDirective } from '../../directives/highlight.directive';
import { HttpClientTestingModule } from '@angular/common/http/testing';

/**
 * CourseCard Unit Tests (Hands-On 10 Task 1)
 * Tests: component creation, @Input rendering, @Output emitter, ngOnChanges spy
 */
describe('CourseCardComponent', () => {
  let component: CourseCard;
  let fixture: ComponentFixture<CourseCard>;

  const mockCourse: Course = {
    id: 1,
    name: 'Data Structures',
    code: 'CS101',
    credits: 4,
    department: 'Computer Science',
    gradeStatus: 'Passed',
    description: 'Core algorithms.',
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseCard, CreditLabelPipe, HighlightDirective, HttpClientTestingModule],
    }).compileComponents();

    fixture = TestBed.createComponent(CourseCard);
    component = fixture.componentInstance;
    component.course = mockCourse;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should render course name in h3 via @Input', () => {
    const h3El = fixture.debugElement.query(By.css('h3'));
    expect(h3El.nativeElement.textContent).toContain('Data Structures');
  });

  it('should emit course id on enroll button click via @Output', () => {
    spyOn(component.enrollRequested, 'emit');
    const button = fixture.debugElement.query(By.css('.enroll-btn'));
    button.nativeElement.click();
    fixture.detectChanges();
    expect(component.enrollRequested.emit).toHaveBeenCalledWith(1);
  });

  it('should trigger ngOnChanges and log changes', () => {
    spyOn(console, 'log');
    const prevCourse = null;
    const currCourse = mockCourse;
    component.ngOnChanges({
      course: new SimpleChange(prevCourse, currCourse, true),
    });
    expect(console.log).toHaveBeenCalledWith(
      '[CourseCard] ngOnChanges - Previous:',
      prevCourse,
      'Current:',
      currCourse
    );
  });
});
