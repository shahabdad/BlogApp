// // import React,{useState,useEffect}  from 'react';
// // import axios from "axios";
// // import Blogcard from '../Components/BlogsCard';
// // const UserBlogs =  () =>{
// //     const [blogs,setBlogs] = useState([]);
// //     //  get user Blogs
// //     const getUserBlogs = async () =>{
// //         try{
// //             const id  = localStorage.getItem('userId')
// //             const {data} = await axios.get(`http://localhost:9001/api/V1/Blog/user-blog/${id}`);
// //             if (data?.success) {
// //                 setBlogs(data?.success)
// //             }
// //         } catch (error){
// //             console.log(error)
// //         }
// //     }
// //     console.log(blogs)
// //     return(
// //         <div> 
// //             <h1>Users Blogs</h1>  
// //             {blogs && blogs.length > 0 ?(  blogs.map((blog) => (
// //             <Blogcard
// //             //   key={blog._id})
// //               title={blog.title}
// //               description={blog.description}
// //               image={blog.image}
// //               username={blog.user.username}
// //               time ={blog.createdAt}
// //             />)))
// //           : (<h1>You havent Create a blog</h1>)
            

// //             )
// //         </div>
// //     )
// // };
// // export default UserBlogs; 

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import Blogcard from '../Components/BlogsCard';

// const UserBlogs = () => {
//     const [blogs, setBlogs] = useState([]);
//     const [error, setError] = useState(null);

//     // Fetch user blogs
//     const getUserBlogs = async () => {
//         try {
//             const id = localStorage.getItem('userId');
//             const { data } = await axios.get(`http://localhost:9001/api/V1/Blog/user-blog/${id}`);
//             if (data?.success) {
//                 setBlogs(data?.blogs || []);
//             } else {
//                 setError('No blogs found.');
//             }
//         } catch (err) {
//             setError('An error occurred while fetching blogs.');
//             console.error(err);
//         }
//     };

//     useEffect(() => {
//         getUserBlogs();
//     }, []);

//     return (
//         <div>
//             <h1>User Blogs</h1>
//             {error ? (
//                 <h1>{error}</h1>
//             ) : blogs && blogs.length > 0 ? (
//                 blogs.map((blog) => (
//                     <Blogcard
                    
//                     // for update use in acccess id 
//                     id= {blog.id}
//                     isUser ={localStorage.getItem("userId") === blog.user.id}
//                         key={blog._id}
//                         title={blog.title}
//                         description={blog.description}
//                         image={blog.image}
//                         username={blog.user.username}
//                         time={blog.createdAt}
//                     />
//                 ))
//             ) : (
//                 <h1>You haven't created a blog</h1>
//             )}
//         </div>
//     );
// };

// export default UserBlogs;


import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blogcard from '../Components/BlogsCard';

const UserBlogs = () => {
    const [blogs, setBlogs] = useState([]);
    const [error, setError] = useState(null);

    // Fetch user blogs
    const getUserBlogs = async () => {
        try {
            const id = localStorage.getItem('userId');
            const { data } = await axios.get(`http://localhost:9001/api/V1/Blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data.blogs || []);
                setError(null); // Clear error
            } else {
                setError('No blogs found.');
            }
        } catch (err) {
            setError('An error occurred while fetching blogs.');
            console.error(err);
        }
    };

    useEffect(() => {
        getUserBlogs();
    }, []);

    return (
        <div>
            <h1>User Blogs</h1>
            {error ? (
                <h1>{error}</h1>
            ) : blogs && blogs.length > 0 ? (
                blogs.map((blog) => (
                    <Blogcard
                        id={blog._id}
                        isUser={true}
                        // key={blog._id}
                        title={blog.title}
                        description={blog.description}
                        image={blog.image}
                        username={blog.user.username}
                        time={blog.createdAt}
                    />
                ))
            ) : (
                <h1>You haven't created a blog</h1>
            )}
        </div>
    );
};

export default UserBlogs;
