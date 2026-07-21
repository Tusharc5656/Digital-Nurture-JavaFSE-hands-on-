import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { CourseService } from './course.service';
import { Course } from '../models/course.model';

/**
 * CourseService Unit Tests (Hands-On 10)
 * Uses HttpClientTestingModule to mock HTTP calls.
 */
describe('CourseService', () => {
  let service: CourseService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/courses';

  const mockCourses: Course[] = [
    { id: 1, name: 'Data Structures', code: 'CS201', credits: 4, department: 'CS', gradeStatus: 'Passed' },
    { id: 2, name: 'Web Development', code: 'CS401', credits: 3, department: 'CS', gradeStatus: 'Pending' },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [CourseService],
    });
    service = TestBed.inject(CourseService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Ensure no outstanding HTTP requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all courses via GET', () => {
    service.getCourses().subscribe(courses => {
      expect(courses.length).toBe(2);
      expect(courses[0].name).toBe('Data Structures');
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses);
  });

  it('should fetch a single course by ID via GET', () => {
    service.getCourseById(1).subscribe(course => {
      expect(course.id).toBe(1);
      expect(course.code).toBe('CS201');
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('GET');
    req.flush(mockCourses[0]);
  });

  it('should POST a new course', () => {
    const newCourse = { name: 'OS', code: 'CS302', credits: 3, department: 'CS', gradeStatus: 'Pending' as const };
    service.addCourse(newCourse).subscribe(c => {
      expect(c.id).toBe(3);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    req.flush({ ...newCourse, id: 3 });
  });

  it('should DELETE a course by ID', () => {
    service.deleteCourse(1).subscribe(res => {
      expect(res).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should handle HTTP error gracefully', () => {
    service.getCourses().subscribe({
      next: () => fail('Expected an error'),
      error: (err) => {
        expect(err.message).toContain('Server Error');
      }
    });

    const req = httpMock.expectOne(apiUrl);
    req.flush('Server Error', { status: 500, statusText: 'Internal Server Error' });
  });
});
