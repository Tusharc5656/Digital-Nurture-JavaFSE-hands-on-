import { Pipe, PipeTransform } from '@angular/core';

/**
 * CreditLabelPipe (Hands-On 3)
 *
 * A custom pipe that transforms a numeric credit value into a human-readable label.
 * Demonstrates:
 * - @Pipe decorator with standalone: true
 * - PipeTransform interface implementation
 * - Handling edge cases (null, undefined, 0, singular, plural)
 *
 * Usage: {{ course.credits | creditLabel }}
 * Examples:
 *   null  -> 'No Credits'
 *   0     -> 'No Credits'
 *   1     -> '1 Credit'
 *   3     -> '3 Credits'
 */
@Pipe({
  name: 'creditLabel',
  standalone: true,
})
export class CreditLabelPipe implements PipeTransform {
  transform(value: number | null | undefined): string {
    if (value === null || value === undefined || value === 0) {
      return 'No Credits';
    }
    return value === 1 ? '1 Credit' : `${value} Credits`;
  }
}
