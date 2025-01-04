// const express  =  require('express');
// const { getALLUsers,
//      registerController, 
// //      loginController } = require('../contronal/userController');

// // const  router  = express.Router()

// // //  GET ALL USERS || GET
// //     router.get('/all-users',getALLUsers)

// // // CREATE USER  || POST
// //    router.post('/register',registerController )

// //     //  LOGIN ||   POST  
// //     router.post('/login',loginController);
// //     module.exports = router;     

// const express = require('express');
// const { getALLUsers, registerController, loginController } = require('../contronal/userController');

// const router = express.Router();

// // GET all users
// router.get('/all-users', getALLUsers);

// // POST register user
// router.post('/register', registerController);

// // POST login user
// router.post('/login', loginController);

// module.exports = router;


const express = require('express');
const { getUsersController, registerController, loginController } = require('../contronal/userController');

const router = express.Router();

// GET route to fetch all users
// router.get('/users', getUsersController); 

// POST route for user registration
router.post('/register', registerController);
// router.get('/register', getUsersController);
// POST route for user login
router.post('/login', loginController);

module.exports = router;
