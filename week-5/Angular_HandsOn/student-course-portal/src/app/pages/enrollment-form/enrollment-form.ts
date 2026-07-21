import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

/**
 * EnrollmentFormComponent (Hands-On 4) - Template-Driven Form
 *
 * Demonstrates:
 * - FormsModule and ngModel for two-way binding
 * - Template reference variables (#form="ngForm")
 * - Built-in validators: required, minlength, email, pattern
 * - ngForm.submitted for post-submit validation display
 * - Form reset functionality
 */
@Component({
  selector: 'app-enrollment-form',
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  student = {
    name: '',
    email: '',
    courseId: '',
    agreeToTerms: false,
  };

  submitted = false;
  successMessage = '';

  availableCourses = [
    { id: 'CS201', name: 'Data Structures & Algorithms' },
    { id: 'CS301', name: 'Database Management Systems' },
    { id: 'CS401', name: 'Web Development' },
    { id: 'AI501', name: 'Machine Learning' },
    { id: 'CS302', name: 'Operating Systems' },
  ];

  onSubmit(isValid: boolean | null): void {
    this.submitted = true;
    if (isValid) {
      this.successMessage = `✅ Enrollment request for "${this.student.name}" submitted successfully!`;
    }
  }

  onReset(): void {
    this.submitted = false;
    this.successMessage = '';
    this.student = { name: '', email: '', courseId: '', agreeToTerms: false };
  }
}
