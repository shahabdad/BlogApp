import   React ,{useState,useEffect} from "react";
import axios from "axios";
import { useParams } from "react-router-dom";


const BlogDetails = () =>{
    const [blog,setBlog]  = useState({})
    const id = useParams().id
    // blog detalis get
    const getBlogDetail = async () =>{
        try{
    const {data}  = await axios.get(`/api/v1/blog/get-blog/${id}`)
if (data?.success){
    setBlog(data?.blog)

}
        }catch(error){
            console.log(error)
        }
    }
    useEffect(() =>{
        getBlogDetail();
    },[id])
    console.log( blog)
         return(
        <>
        <h1>Blog Details  /Edit</h1>
        </>
    )
}
export default BlogDetails