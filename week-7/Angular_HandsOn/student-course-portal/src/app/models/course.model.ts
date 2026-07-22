// Course model representing a course in the portal
export interface Course {
  id: number;
  name: string;
  code: string;
  credits: number;
  department: string;
  gradeStatus: 'Passed' | 'Failed' | 'Pending';
  description?: string;
}
