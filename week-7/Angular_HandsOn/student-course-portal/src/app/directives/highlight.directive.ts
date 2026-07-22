import { Directive, ElementRef, HostListener, Input } from '@angular/core';

/**
 * HighlightDirective (Hands-On 3)
 * Custom attribute directive that adds background color on mouseenter and removes on mouseleave.
 * Supports configurable color via `@Input() appHighlight`.
 */
@Directive({
  selector: '[appHighlight]',
  standalone: true,
})
export class HighlightDirective {
  /** Configurable highlight color, default to yellow */
  @Input() appHighlight: string = 'yellow';
  @Input() highlightColor?: string;

  private originalBg: string = '';

  constructor(private el: ElementRef) {}

  @HostListener('mouseenter') onMouseEnter(): void {
    const color = this.highlightColor || this.appHighlight || 'yellow';
    this.originalBg = this.el.nativeElement.style.backgroundColor;
    this.el.nativeElement.style.backgroundColor = color;
    this.el.nativeElement.style.transition = 'background-color 0.3s ease';
  }

  @HostListener('mouseleave') onMouseLeave(): void {
    this.el.nativeElement.style.backgroundColor = this.originalBg;
  }
}
