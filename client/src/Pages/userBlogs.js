import React, { useState, useEffect } from "react";
import axios from "axios";
import BlogsCard from "../Components/BlogsCard";

const UserBlogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const getUserBlogs = async () => {
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        setError("User ID is not available in localStorage.");
        return;
      }
      const { data } = await axios.get(`http://localhost:9001/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs || []);
        setError(null);
      } else {
        setError("No blogs found.");
      }
    } catch (error) {
      setError("An error occurred while fetching blogs.");
      console.error(error);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  return (
    <div>
      <h1 style={styles.header}>User Blogs</h1>
      {error ? (
        <h2>{error}</h2>
      ) : blogs && blogs.length > 0 ? (
        <div style={styles.gridContainer}>
          {blogs.map((blog) => (
            <BlogsCard
              key={blog._id}
              id={blog._id}
              isUser={true}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time={blog.createdAt}
            />
          ))}
        </div>
      ) : (
        <h1 style={styles.noBlogsMessage}>You haven't created a blog</h1>
      )}
    </div>
  );
};

const styles = {
  header: {
    fontSize: '48px',
    fontWeight: 'bold',
    textAlign: 'center',
    color: '#333',
    letterSpacing: '1.5px',
    textTransform: 'uppercase',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
    margin: '20px 0',
    padding: '10px 20px',
    backgroundColor: '#f5f5f5',
    borderRadius: '8px',
  },
  noBlogsMessage: {
    fontSize: '36px',
    fontWeight: 'bold',
    color: '#ff6347',
    textAlign: 'center',
    marginTop: '30px',
    letterSpacing: '1px',
    textShadow: '2px 2px 5px rgba(0, 0, 0, 0.1)',
  },
  gridContainer: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(600px, 1fr))', // Adjust grid for responsiveness
    gap: '1px',
    padding: '10px',
  },
};

export default UserBlogs;
