function BlogDetails() {
  const blogs = [
    { id: 1, title: "Learning React", author: "Alice" },
    { id: 2, title: "JavaScript ES6", author: "Bob" },
    { id: 3, title: "Frontend Development", author: "Charlie" }
  ];

  return (
    <div>
      <h2>Blog Details</h2>

      <ul>
        {blogs.map((blog) => (
          <li key={blog.id}>
            <b>{blog.title}</b> - {blog.author}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default BlogDetails;