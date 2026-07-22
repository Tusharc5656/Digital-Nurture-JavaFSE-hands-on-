import BookDetails from "./BookDetails";
import BlogDetails from "./BlogDetails";
import CourseDetails from "./CourseDetails";

function App() {

  const showBooks = true;
  const showBlogs = true;
  const showCourses = true;

  return (
    <div style={{ margin: "30px" }}>
      <h1>Blogger App</h1>

      {showBooks && <BookDetails />}

      {showBlogs ? <BlogDetails /> : <h3>No Blogs Available</h3>}

      {showCourses && <CourseDetails />}
    </div>
  );
}

export default App;