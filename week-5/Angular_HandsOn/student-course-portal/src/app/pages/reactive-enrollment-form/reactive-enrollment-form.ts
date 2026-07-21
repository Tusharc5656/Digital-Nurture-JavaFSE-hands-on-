import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { delay, map } from 'rxjs/operators';

/**
 * ReactiveEnrollmentFormComponent (Hands-On 5) - Reactive Form
 *
 * Demonstrates:
 * - FormBuilder for building form structure
 * - FormGroup, FormControl, FormArray
 * - Custom synchronous validator: noCourseCode (blocks 'XX' prefix codes)
 * - Custom async validator: simulateEmailCheck (800ms delay, rejects 'test@' emails)
 * - Dynamic FormArray: add/remove additional courses
 * - Form status observables: form.valueChanges, form.statusChanges
 */

// Custom synchronous validator: block course codes starting with 'XX'
function noCourseCodeValidator(control: AbstractControl): ValidationErrors | null {
  const value: string = control.value || '';
  if (value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: { message: "Course codes starting with 'XX' are not allowed." } };
  }
  return null;
}

// Custom async validator: simulate an API check that rejects 'test@' emails
function simulateEmailCheckValidator(control: AbstractControl): Observable<ValidationErrors | null> {
  return of(control.value).pipe(
    delay(800),
    map((email: string) => {
      if (email && email.toLowerCase().startsWith('test@')) {
        return { emailTaken: { message: 'This email address is already registered.' } };
      }
      return null;
    })
  );
}

@Component({
  selector: 'app-reactive-enrollment-form',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;
  successMessage = '';

  availableCourses = [
    { id: 'CS201', name: 'Data Structures & Algorithms' },
    { id: 'CS301', name: 'Database Management Systems' },
    { id: 'CS401', name: 'Web Development' },
    { id: 'AI501', name: 'Machine Learning' },
    { id: 'CS302', name: 'Operating Systems' },
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: ['', [Validators.required, Validators.email], [simulateEmailCheckValidator]],
      primaryCourseCode: ['', [Validators.required, noCourseCodeValidator]],
      additionalCourses: this.fb.array([]),
    });
  }

  /** Getter for additionalCourses FormArray */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  /** Add a new course entry to FormArray */
  addCourse(): void {
    this.additionalCourses.push(
      this.fb.group({
        courseCode: ['', [Validators.required, noCourseCodeValidator]],
      })
    );
  }

  /** Remove a course entry from FormArray by index */
  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;
    if (this.enrollForm.valid) {
      console.log('[ReactiveEnrollmentForm] Form submitted:', this.enrollForm.value);
      this.successMessage = `✅ Enrollment submitted for "${this.enrollForm.value.studentName}"!`;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.successMessage = '';
    this.enrollForm.reset();
    while (this.additionalCourses.length) {
      this.additionalCourses.removeAt(0);
    }
  }

  /** Helper to get a form control by path */
  getControl(path: string): AbstractControl | null {
    return this.enrollForm.get(path);
  }

  /** Helper to show error for a control */
  hasError(path: string, error: string): boolean {
    const ctrl = this.getControl(path);
    return !!(ctrl?.hasError(error) && (ctrl.touched || this.submitted));
  }

  /** Check async validation pending state */
  isPending(path: string): boolean {
    return this.enrollForm.get(path)?.status === 'PENDING';
  }
}
