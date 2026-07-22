import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, NgForm } from '@angular/forms';

/**
 * EnrollmentFormComponent (Hands-On 4) - Template-Driven Form
 *
 * Demonstrates:
 * - Template-driven form with #enrollForm="ngForm" and (ngSubmit)="onSubmit(enrollForm)"
 * - Two-way binding with [(ngModel)] and mandatory `name` attributes on controls
 * - Built-in validators: required, minlength="3", email
 * - Accessing control state via template variables (#nameCtrl="ngModel")
 * - CSS styling for .ng-invalid.ng-touched and .ng-valid.ng-touched
 * - Form submission handling logging form.value and form.valid
 * - Form reset via enrollForm.resetForm()
 * - Success message conditional display
 */
@Component({
  selector: 'app-enrollment-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './enrollment-form.html',
  styleUrl: './enrollment-form.css',
})
export class EnrollmentForm {
  studentName = '';
  studentEmail = '';
  courseId: number | null = null;
  preferredSemester = 'Odd';
  agreeToTerms = false;

  submitted = false;

  onSubmit(form: NgForm): void {
    console.log('Form Value:', form.value);
    console.log('Form Valid:', form.valid);
    if (form.valid) {
      this.submitted = true;
    }
  }

  onReset(form: NgForm): void {
    form.resetForm();
    this.submitted = false;
  }
}
