import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CourseList } from './course-list';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { provideRouter } from '@angular/router';
import { provideMockStore } from '@ngrx/store/testing';

describe('CourseList', () => {
  let component: CourseList;
  let fixture: ComponentFixture<CourseList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CourseList, HttpClientTestingModule],
      providers: [
        provideRouter([]),
        provideMockStore({
          initialState: {
            courses: { courses: [], loading: false, error: null }
          }
        })
      ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CourseList);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
