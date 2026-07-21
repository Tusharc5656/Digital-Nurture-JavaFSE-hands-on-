import { inject } from '@angular/core';
import { CanDeactivateFn } from '@angular/router';
import { ReactiveEnrollmentForm } from '../pages/reactive-enrollment-form/reactive-enrollment-form';

/**
 * UnsavedChangesGuard (Hands-On 7)
 *
 * CanDeactivate functional guard that prompts confirmation
 * if the reactive form is dirty (has unsaved changes).
 */
export const unsavedChangesGuard: CanDeactivateFn<ReactiveEnrollmentForm> = (component) => {
  if (component.enrollForm?.dirty && !component.successMessage) {
    return confirm('You have unsaved changes. Are you sure you want to leave?');
  }
  return true;
};
