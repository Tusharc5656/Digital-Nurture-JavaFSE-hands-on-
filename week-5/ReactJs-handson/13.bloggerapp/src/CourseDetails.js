function CourseDetails() {
  const courses = [
    { id: 1, name: "ReactJS", duration: "6 Weeks" },
    { id: 2, name: "Spring Boot", duration: "8 Weeks" },
    { id: 3, name: "Data Science", duration: "10 Weeks" }
  ];

  return (
    <div>
      <h2>Course Details</h2>

      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.name} - {course.duration}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CourseDetails;