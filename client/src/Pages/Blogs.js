import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blogcard from '../Components/BlogsCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get('http://localhost:9001/api/v1/blog/all-blog');
      console.log("Fetched blog data:", data);

      if (data?.success) {
        setBlogs(data.blogs); 
      } else {
        setError('Failed to fetch blogs.');
      }
    } catch (error) {
      setError('Error fetching blogs.');
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Latest Blogs</h1>
      {error && <p style={styles.error}>{error}</p>}
      
      <div style={styles.grid}>
        {blogs && blogs.map((blog) => (
          <Blogcard
            key={blog._id}
            id={blog._id}
            isUser={localStorage.getItem('userId') === blog?.user?._id}
            title={blog.title}
            description={blog.description}
            image={blog.image}
            username={blog.user?.username}
            profilePic={blog.user?.profilePic}
            time={blog.createdAt}
          />
        ))}
      </div>
    </div>
  );
};

// Updated Styles
const styles = {
  container: {
    padding: '20px',
    backgroundColor: '#e0e7ff', // ✅ New background color
    minHeight: '80vh',
  },
  title: {
    textAlign: 'center',
    marginBottom: '20px',
    fontSize: '2rem',
    color: '#1e293b',
    fontWeight: 'bold',
  },
  error: {
    color: '#e11d48',
    textAlign: 'center',
    fontSize: '1.2rem',
    marginBottom: '20px',
  },
  grid: {
    display: 'flex',           // ✅ Use flex to stack cards in one column
    flexDirection: 'column',
    gap: '10px',
  },
};

export default Blogs;
