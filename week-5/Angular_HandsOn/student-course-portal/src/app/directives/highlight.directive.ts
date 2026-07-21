import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * HighlightDirective (Hands-On 3)
 *
 * A custom attribute directive that highlights the host element on mouse hover.
 * Demonstrates:
 * - @Directive decorator with a standalone: true directive
 * - @Input() for configurable highlight color
 * - @HostListener for responding to mouse events on the host element
 * - ElementRef for accessing the native DOM element
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  /** The color to use for the highlight effect */
  @Input() highlightColor: string = '#6366f1';

  private originalBg: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    this.originalBg = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = this.highlightColor + '15'; // 15 = ~8% opacity in hex
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBg;
  }
}
