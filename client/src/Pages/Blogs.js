// // // import React  , {useState,useEffect}from 'react';
// // // import axios from  'axios'
// // // const Blogs = () => {
// // //   const [blogs, setBlogs] = useState([]);
// // //   // get blogs
// // //   const getAllBlogs = async () =>{
// // //     try{
// // //       const {data} = await axios.get( "/api/v1/blog/all-blog")
// // //       if(data?.success){
// // //         setBlogs(data?.blogs)
// // //       } 
// // //     } catch (error)  {
// // //       console.log(error +"Hekk-i");
// // //     }
// // //   }
// // // useEffect(() =>{
// // //    getAllBlogs();
// // //    },[])
// // //   return (
// // //     <div>
// // //         <h1>Blogs</h1>
// // //     </div>
// // //   )
// // // }

// // // export default Blogs
// // import React, { useState, useEffect } from 'react';
// // import axios from 'axios';
// // import Blogcard from '../Components/BlogsCard';

// // const Blogs = () => {
// //   const [blogs, setBlogs] = useState([]);

// //   // Get all blogs
// //   const getAllBlogs = async () => {
// //     try {
// //       const { data } = await axios.get("/api/v1/blog/all-blog");
// //       if (data?.success) {
// //         setBlogs(data?.blogs);
// //       } else {
// //         console.error("Failed to fetch blogs.");
// //       }
// //     } catch (error) {
// //       console.error("Error fetching blogs:", error.message);
// //     }
// //   };

// //   useEffect(() => {
// //     getAllBlogs();
// //   }, []);

// //   return (
// //     <div>
// //       {blogs && blogs.map(blog => (
// //         <Blogcard
// //           title={blog.title}
// //           description={blog.description}
// //           image={blog.image}
// //         />
// //       ))}


// //     </div>
// //   );
// // };

// // export default Blogs;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Blogcard from '../Components/BlogsCard';

// const Blogs = () => {
//   const [blogs, setBlogs] = useState([]);
//   const [error, setError] = useState(null);

//   // Get all blogs
//   const getAllBlogs = async () => {
//     try {
//       // const { data } = await axios.get("/api/v1/blog/all-blog");
//       const { data } = await axios.get("http://localhost:9001/api/v1/blog/all-blog");

//       if (data?.success) {
//         setBlogs(data?.blogs);
//       } else {
//         setError("Failed to fetch blogs.");
//       }
//     } catch (error) {
//       setError("Error fetching blogs.");
//       console.error(error.message);
//     }
//   };

//   useEffect(() => {
//     getAllBlogs();
//   }, []);

//   return (
//     <div>
//       <h1>Blogs</h1>
//       {error && <p>{error}</p>}
//       {blogs &&
//         blogs.map((blog) => (
//           <Blogcard
//             key={blog._id} // Ensure a unique key
//             title={blog.title}
//             description={blog.description}
//             image={blog.image}
//             username =  {blog.username}
//           />
//         ))}
//     </div>
//   );
// };

// export default Blogs;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blogcard from '../Components/BlogsCard';

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [error, setError] = useState(null);

  // Get all blogs
  const getAllBlogs = async () => {
    try {
      const { data } = await axios.get("http://localhost:9001/api/v1/blog/all-blog");

      if (data?.success) {
        setBlogs(data?.blogs);
      } else {
        setError("Failed to fetch blogs.");
      }
    } catch (error) {
      setError("Error fetching blogs.");
      console.error(error.message);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  return (
    <div>
      <h1 style={{ textAlign: 'center', margin: '20px 0' }}>Blogs</h1>
      {error && <p style={{ color: 'red', textAlign: 'center' }}>{error}</p>}
      <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>
        {blogs &&
          blogs.map((blog) => (
            <Blogcard
              key={blog._id}
              title={blog.title}
              description={blog.description}
              image={blog.image}
              username={blog.user.username}
              time ={blog.createdAt}
            />
          ))}
      </div>
    </div>
  );
};

export default Blogs;
