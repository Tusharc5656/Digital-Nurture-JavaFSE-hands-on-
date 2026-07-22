import { CanDeactivateFn } from '@angular/router';

export interface ComponentCanDeactivate {
  canDeactivate?: () => boolean;
  enrollForm?: { dirty: boolean };
}

/**
 * UnsavedChangesGuard (Hands-On 7 Step 77)
 *
 * Checks if the form is dirty (enrollForm.dirty).
 * If dirty, calls window.confirm('You have unsaved changes. Leave?')
 * Returns true to allow navigation, false to stay.
 */
export const unsavedChangesGuard: CanDeactivateFn<ComponentCanDeactivate> = (component) => {
  if (component.enrollForm?.dirty) {
    return window.confirm('You have unsaved changes. Leave?');
  }
  return true;
};
