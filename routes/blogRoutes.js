const express = require ('express');
const { getAllBlogsController, createBlogController, updateBLogController, getBlogByIdController, deleteBlogController, userBlogController } = require('../controller/blogController');


// router object
const  router = express.Router();


// router
// GET ||  ALL blogs
router.get('/all-blog',getAllBlogsController)


// Post || create blog 
router.post('/create-blog',createBlogController)

//  PUT ||   update blog 
router.put("/update-blog/:id", updateBLogController)

//  GET || Single Blog  Details
router.get('/get-blog/:id',getBlogByIdController )

// DELETE || Delete blog
router.delete('/delete-blog/:id',deleteBlogController)


router.get('/user-blog/:id', userBlogController)
module.exports = router;