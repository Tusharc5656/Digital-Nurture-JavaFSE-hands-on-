import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, FormArray, FormControl, Validators, AbstractControl, ValidationErrors } from '@angular/forms';

/**
 * Custom synchronous validator: disallows course code starting with 'XX'
 */
export function noCourseCode(control: AbstractControl): ValidationErrors | null {
  const value = String(control.value || '');
  if (value.toUpperCase().startsWith('XX')) {
    return { noCourseCode: true };
  }
  return null;
}

/**
 * Custom async validator: simulates API email availability check after 800ms
 * Returns Promise<ValidationErrors | null>
 */
export function simulateEmailCheck(control: AbstractControl): Promise<ValidationErrors | null> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const email = String(control.value || '').toLowerCase();
      if (email.includes('test@')) {
        resolve({ emailTaken: true });
      } else {
        resolve(null);
      }
    }, 800);
  });
}

/**
 * ReactiveEnrollmentFormComponent (Hands-On 5) - Reactive Forms
 *
 * Demonstrates:
 * - FormBuilder, FormGroup, FormControl, FormArray
 * - Custom sync validator: noCourseCode
 * - Custom async validator: simulateEmailCheck
 * - Dynamic form controls using FormArray (add/remove additional courses)
 * - Typed getter `get additionalCourses()`
 * - Explaining difference between enrollForm.value and enrollForm.getRawValue()
 */
@Component({
  selector: 'app-reactive-enrollment-form',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reactive-enrollment-form.html',
  styleUrl: './reactive-enrollment-form.css',
})
export class ReactiveEnrollmentForm implements OnInit {
  enrollForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.enrollForm = this.fb.group({
      studentName: ['', [Validators.required, Validators.minLength(3)]],
      studentEmail: this.fb.control(
        '',
        [Validators.required, Validators.email],
        [simulateEmailCheck]
      ),
      courseId: [null, [Validators.required, noCourseCode]],
      preferredSemester: ['Odd', Validators.required],
      agreeToTerms: [false, Validators.requiredTrue],
      additionalCourses: this.fb.array([]),
    });
  }

  /**
   * Typed getter for additionalCourses FormArray.
   * Explaining why getter is better than casting in template:
   * 1. Provides strong TypeScript type safety in component logic and template autocomplete.
   * 2. Avoids repetitive and error-prone inline template casting like `(enrollForm.get('additionalCourses') as FormArray).controls`.
   */
  get additionalCourses(): FormArray {
    return this.enrollForm.get('additionalCourses') as FormArray;
  }

  addCourse(): void {
    this.additionalCourses.push(this.fb.control('', Validators.required));
  }

  removeCourse(index: number): void {
    this.additionalCourses.removeAt(index);
  }

  onSubmit(): void {
    this.submitted = true;

    /**
     * Difference between enrollForm.value and enrollForm.getRawValue():
     * - enrollForm.value: Returns an object containing the values of enabled controls only (excludes disabled controls).
     * - enrollForm.getRawValue(): Returns an object containing values of ALL controls, regardless of whether they are enabled or disabled.
     */
    console.log('enrollForm.value:', this.enrollForm.value);
    console.log('enrollForm.getRawValue():', this.enrollForm.getRawValue());
  }

  canDeactivate(): boolean {
    return !this.enrollForm.dirty;
  }
}
