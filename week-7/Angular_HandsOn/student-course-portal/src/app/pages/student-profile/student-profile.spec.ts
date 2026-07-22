import { ComponentFixture, TestBed } from '@angular/core/testing';
import { StudentProfile } from './student-profile';
import { HttpClientTestingModule } from '@angular/common/http/testing';

describe('StudentProfile', () => {
  let component: StudentProfile;
  let fixture: ComponentFixture<StudentProfile>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [StudentProfile, HttpClientTestingModule]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudentProfile);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
