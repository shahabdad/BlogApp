// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Blogcard from '../Components/BlogsCard';

// // const Blogs = () => {
// //   const [blogs, setBlogs] = useState([]);
// //   const [error, setError] = useState(null);

// //   // Get all blogs
// //   const getAllBlogs = async () => {
// //     try {
// //       const { data } = await axios.get('http://localhost:9001/api/v1/blog/all-blog');

// //       if (data?.success) {
// //         setBlogs(data?.blogs);
// //       } else {
// //         setError('Failed to fetch blogs.');
// //       }
// //     } catch (error) {
// //       setError('Error fetching blogs.');
// //       console.error(error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     getAllBlogs();
// //   }, []);

// //   return (
// //     <div style={styles.container}>
// //       <h1 style={styles.title}>Blogs</h1>
// //       {error && <p style={styles.error}>{error}</p>}
// //       <div style={styles.grid}>
// //         {blogs &&
// //           blogs.map((blog) => (
// //             <Blogcard
// //               id={blog?._id}
// //               isUser={localStorage.getItem('userId') === blog?.user?._id}
// //               key={blog._id}
// //               title={blog.title}
// //               description={blog.description}
// //               image={blog.image}
// //               username={blog.user.username}
// //               time={blog.createdAt}
// //             />
// //           ))}
// //       </div>
// //     </div>
// //   );
// // };

// // // Inline styles
// // const styles = {
// //   container: {
// //     padding: '3px',
// //     backgroundColor: '#f9f9f9',
// //     minHeight: '100vh',
// //   },
// //   title: {
// //     textAlign: 'center',
// //     margin: '10px 0',
// //     fontSize: '1.5rem',
// //     color: '#2c3e50',
// //     fontWeight: 'bold',
// //     '@media (max-width: 768px)': {
// //       fontSize: '0.5rem', // Adjust font size for medium screens
// //     },
// //     '@media (max-width: 480px)': {
// //       fontSize: '0.5rem', // Adjust font size for small screens
// //     },
// //   },
// //   error: {
// //     color: 'red',
// //     textAlign: 'center',
// //     margin: '1px 0',
// //     fontSize: '1.2rem',
// //     '@media (max-width: 768px)': {
// //       fontSize: '1rem', // Adjust font size for medium screens
// //     },
// //     '@media (max-width: 480px)': {
// //       fontSize: '0.9rem', // Adjust font size for small screens
// //     },
// //   },
// //   grid: {
// //     display: 'grid',
// //     gridTemplateColumns: 'repeat(3, 1fr)', // 3 cards per row
// //     gap: '10px',
// //     padding: '10px',
// //     justifyContent: 'center',
// //     '@media (max-width: 768px)': {
// //       gridTemplateColumns: 'repeat(2, 1fr)', // 2 cards per row on medium screens
// //     },
// //     '@media (max-width: 480px)': {
// //       gridTemplateColumns: '1fr', // 1 card per row on small screens
// //     },
// //   },
// // };

// // export default Blogs;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Blogcard from '../Components/BlogsCard';

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [error, setError] = useState(null);

//   // Fetch all blogs
//   const getAllBlogs = async () => {
//     try {
//       const { data } = await axios.get('http://localhost:9001/api/v1/blog/all-blog');
      
//     console.log("Fetched blog data:", data);

//       if (data?.success) {
//         setBlogs(data.blogs);
//       } else {
//         setError('Failed to fetch blogs.');
//       }
//     } catch (error) {
//       setError('Error fetching blogs.');
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getAllBlogs();
//   }, []);

//   return (
//     <div style={styles.container}>
//       <h1 style={styles.title}>Latest Blogs</h1>
//       {error && <p style={styles.error}>{error}</p>}
      
//       <div style={styles.grid}>
//         {blogs && blogs.map((blog) => (
//           <Blogcard
//             key={blog._id}
//             id={blog._id}
//             isUser={localStorage.getItem('userId') === blog?.user?._id}
//             title={blog.title}
//             description={blog.description}
//             image={blog.image}
//             username={blog.user?.username}
//             profilePic={blog.user?.profilePic}  // Pass profile picture to Blogcard
//             time={blog.createdAt}
//           />
//         ))}
//       </div>
//     </div>
//   );
// };

// // Inline Styles
// const styles = {
//   container: {
//     padding: '20px',
//     backgroundColor: '#f2f4f7',
//     minHeight: '100vh',
//   },
//   title: {
//     textAlign: 'center',
//     marginBottom: '20px',
//     fontSize: '2rem',
//     color: '#2c3e50',
//     fontWeight: 'bold',
//   },
//   error: {
//     color: '#e74c3c',
//     textAlign: 'center',
//     fontSize: '1.2rem',
//     marginBottom: '20px',
//   },
//   grid: {
//     display: 'grid',
//     gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
//     gap: '20px',
//     padding: '10px',
//   },
// };

// export default Blogs;


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
