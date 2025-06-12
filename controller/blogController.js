// const  blogModel =  require('../models/BlogModel');
// const  userModel =  require('../models/UserModel');
// const mongoose   = require('mongoose');
// //  GET All BLOGS
// exports.getAllBlogsController= async (req,res)  =>{
//     try{
//      const  blogs  = await blogModel.find({});
//      if(!blogs){
//         return res.status(200).send({
//             success:false,  
//             message:'No Blogs Found',
//         });
//      }
//      return res.status(200).send({
//         success:true,
//         BlogCount:blogs.length,
//         message :'All  Blogs  lists',
//         blogs,
//      });
    

//     }catch( error){
//         console.log(error);
//         return res.status( 500 ) .send({
//             success:false,
//             message:"we are facing some issue at server side",
//             error
//         }) 
//        }
// };

// // Create Blog 
// exports.createBlogController = async (req,res) =>{
//         try{
//             const { title,description,image , user } = req.body;
//             //  Validation
//             if (!title || !description || !image  || !user ){
//                 return res.status(400).send({
//                     succes:false,
//                     message:'Please ALL Fields',
//                 });
//             }
//             const exisitingUser   = await  userModel.findById(user)
//             if(!exisitingUser){
//                 return res.status(404).send({
//                     success:false,
//                     message:  "unable to find  user",
//                 });
//             }
//            const  newBlog  =  new   blogModel({title, description,image,user});
//            const session  = await mongoose.startSession()
//            session.startTransaction()
//            await newBlog.save({session});
//            exisitingUser.blogs.push(newBlog)
//            await  exisitingUser.save({session});
//            await session.commitTransaction();
//            await newBlog.save();
//            return  res.status(201).send({
//             success:true,
//             message: "Blog Created !",
//             newBlog,
//            });
//         } catch(error){
//             console.log(error);
//             return res.status(500).send({
//                 success:false,
//                 message:'Error While Creating Blog',
//                  error,
//             });
//         }
// };


// // Updata  Blog 
//   exports. updateBLogController =  async (req,res )=>{
//     try{
//         const  {id} = req.params ;
//         const {title ,description,image} = req.body;
//         const blog  = await blogModel.findByIdAndUpdate(
//             id, 
//             {...req.body},
//             {new:true}
//         );
//         return res.status(200).send({
//             success:true,
//             message:'Blog Updated', 
//             blog,
//         });
//     }  catch (error){
//         console.log(error);
//         return res.status(400).send({ 
//             success:false,
//             message:'Error While Updating Blog',
//             error,
//         });
//     }
//   };


// //  Single Blog 
// exports.getBlogByIdController =  async (req,res) => {
//     try{
//         const {id} = req.params; 
//      const blog  = await  blogModel.findById(id).populate('user');
//      if(!blog){
//         return res.status(404).send({
//             success:false,
//             messsage:"Blog not found width this  ID ",
//           });
//      } 
//      return  res.status(200).send({
//         success:'true',
//         message :"  fetch single blog ",
//         blog,
//      })

//     } catch(error){
//         console.log(error)
//         return res.status(401).send({
//             success : false,
//             message: 'error   while getting  single blog ',
//             error
//         })
//     }

// };

// //  Delete Blog  
// exports.deleteBlogController = async (req,res) =>{ 
//     try{
//       const blog = await blogModel.findByIdAndDelete(req.params.id).populate("user") 
//        await blog.user.blogs.pull(blog)
//        await blog.user.save();
//        return  res.status(200).send({
//         success:true,
//         message : "Blog Deleted",
//        })
//     } catch(error){
//         console.log(error);

//         return res.status(400).send({
//             success:false,
//              message:"Error While Deleting BLog ",
//             error
//         })
//     }
// };

// // GET USER BLOG
// exports.userBlogController = async (req,res) =>{
//     try{
//  const  userBlog = await   userModel.findById(req.params.id).populate("blogs")
//  if (!userBlog){
//     return res.status(404).send({
//         success:false,
//         message:"blogs not found with this  id"
//     })
//  }
//  return res.status (200).send ({
//     success:true,
//     message: " user blogs",
//     userBlog,
//  })
//     } catch (error){
//         console.log(error ) 
//         return  res.status(400).send({
//             success:false,
//             message : ' erorr  in user blog',
//             error
//         })
//     }
// };

const blogModel = require('../models/BlogModel');
const userModel = require('../models/UserModel');
const mongoose = require('mongoose');

// GET All Blogs
exports.getAllBlogsController = async (req, res) => {
  try {
    const blogs = await blogModel.find({}).populate('user');
    if (!blogs.length) {
      return res.status(200).send({
        success: false,
        message: 'No blogs found',
      });
    }
    return res.status(200).send({
      success: true,
      BlogCount: blogs.length,
      message: 'All blogs list',
      blogs,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Server error while fetching blogs',
      error,
    });
  }
};

// Create Blog
exports.createBlogController = async (req, res) => {
  try {
    const { title, description, image, user } = req.body;

    if (!title || !description || !image || !user) {
      return res.status(400).send({
        success: false,
        message: 'All fields are required',
      });
    }

    const existingUser = await userModel.findById(user);
    if (!existingUser) {
      return res.status(404).send({
        success: false,
        message: 'User not found',
      });
    }

    const newBlog = new blogModel({ title, description, image, user });
    const session = await mongoose.startSession();
    session.startTransaction();

    await newBlog.save({ session });
    existingUser.blogs.push(newBlog);
    await existingUser.save({ session });

    await session.commitTransaction();

    return res.status(201).send({
      success: true,
      message: 'Blog created successfully',
      newBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send({
      success: false,
      message: 'Error while creating blog',
      error,
    });
  }
};

// Update Blog
exports.updateBLogController = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, image } = req.body;

    const blog = await blogModel.findByIdAndUpdate(
      id,
      { title, description, image },
      { new: true }
    );

    return res.status(200).send({
      success: true,
      message: 'Blog updated successfully',
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while updating blog',
      error,
    });
  }
};

// Get Single Blog by ID
exports.getBlogByIdController = async (req, res) => {
  try {
    const { id } = req.params;
    const blog = await blogModel.findById(id).populate('user');

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: 'Blog not found with this ID',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'Fetched single blog successfully',
      blog,
    });
  } catch (error) {
    console.error(error);
    return res.status(401).send({
      success: false,
      message: 'Error while fetching single blog',
      error,
    });
  }
};

// Delete Blog
exports.deleteBlogController = async (req, res) => {
  try {
    const blog = await blogModel.findByIdAndDelete(req.params.id).populate('user');

    if (!blog) {
      return res.status(404).send({
        success: false,
        message: 'Blog not found to delete',
      });
    }

    await blog.user.blogs.pull(blog);
    await blog.user.save();

    return res.status(200).send({
      success: true,
      message: 'Blog deleted successfully',
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while deleting blog',
      error,
    });
  }
};

// Get Blogs by User ID
exports.userBlogController = async (req, res) => {
  try {
    const userBlog = await userModel.findById(req.params.id).populate('blogs');

    if (!userBlog) {
      return res.status(404).send({
        success: false,
        message: 'Blogs not found for this user',
      });
    }

    return res.status(200).send({
      success: true,
      message: 'User blogs fetched successfully',
      userBlog,
    });
  } catch (error) {
    console.error(error);
    return res.status(400).send({
      success: false,
      message: 'Error while fetching user blogs',
      error,
    });
  }
};
