import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

/**
 * CoursesLayoutComponent (Hands-On 7)
 * Layout component for nested course routes (/courses and /courses/:id).
 */
@Component({
  selector: 'app-courses-layout',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <div class="courses-layout">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [`
    .courses-layout {
      width: 100%;
    }
  `]
})
export class CoursesLayoutComponent {}
