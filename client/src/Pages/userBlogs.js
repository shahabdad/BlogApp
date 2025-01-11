import React,{useState,useEffect}  from 'react';
import axios from "axios";
const UserBlogs =  () =>{
    const [blogs,setBlogs] = useState([]);
    //  get user Blogs
    const getUserBlogs = async () =>{
        try{
            const id  = localStorage.getItem('userId')
            const {data} = await axios.get(`http://localhost:9001/api/V1/Blog/user-blog/${id}`);
            if (data?.success) {
                setBlogs(data?.success)
            }
        } catch (error){
            console.log(error)
        }
    }
    console.log(blogs)
    return(
        <div> 
            <h1>Users Blogs</h1>            
        </div>
    )
};
export default UserBlogs; 