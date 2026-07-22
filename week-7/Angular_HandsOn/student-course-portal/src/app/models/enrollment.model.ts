// Enrollment model representing a course enrollment record
export interface Enrollment {
  id: number;
  studentId: number;
  courseId: number;
  enrolledAt: string;
}
