const userModel = require("../models/UserModel");
    // createe user register user 
    exports.registerController = async (req,res)=>{
        try{
      const   {username,email,password} = req.body 
    //   validation 
    if (!username || !email || !password) {
        return  res.status(400).send({
             success :false,
             message : 'PLease Fill all fields '
        })}
    const exisitingUser  = await userModel.findOne({email})
    if (exisitingUser){
        return res.status(401).send({
            success :false,
            message:'user already exisits'
        }) }
    const user  = new  userModel({username,email,password})
    await user.save()
     return res.status(201 ).send({
      success:true,
        message :'New User Created',
        user})
 }catch(error){
            console.log(error )
            return  res.status(500).send ({
                message:'error  in registr  callback',
                success :false,
                error 
            })
        }
    };

    exports.getALLUsers =  ()=>{}; 

    // login  
    exports.loginController  = ()=>{}; 

// const bcrypt = require("bcrypt");

// // Get ALL users
// exports.getALLUsers = async (req, res) => {
//   try {
//     const users = await UserModel.find();
//     return res.status(200).send({
//       success: true,
//       message: "Users retrieved successfully",
//       users,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error retrieving users",
//       error,
//     });
//   }
// };

// // Register user
// exports.registerController = async (req, res) => {
//   try {
//     const { username, email, password } = req.body;

//     // Validation
//     if (!username || !email || !password) {
//       return res.status(400).send({
//         success: false,
//         message: "Please fill all fields",
//       });
//     }

//     // Email format validation
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!emailRegex.test(email)) {
//       return res.status(400).send({
//         success: false,
//         message: "Invalid email format",
//       });
//     }

//     const existingUser = await UserModel.findOne({ email });
//     if (existingUser) {
//       return res.status(401).send({
//         success: false,
//         message: "User already exists",
//       });
//     }

//     // Hash password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = new UserModel({ username, email, password: hashedPassword });
//     await user.save();
//     return res.status(201).send({
//       success: true,
//       message: "New user created",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in register callback",
//       error,
//     });
//   }
// };

// // Login
// exports.loginController = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validation
//     if (!email || !password) {
//       return res.status(400).send({
//         success: false,
//         message: "Please provide email and password",
//       });
//     }

//     const user = await UserModel.findOne({ email });
//     if (!user) {
//       return res.status(401).send({
//         success: false,
//         message: "User not found",
//       });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).send({
//         success: false,
//         message: "Invalid credentials",
//       });
//     }

//     return res.status(200).send({
//       success: true,
//       message: "Login successful",
//       user,
//     });
//   } catch (error) {
//     console.log(error);
//     return res.status(500).send({
//       success: false,
//       message: "Error in login callback",
//       error,
//     });
//   }
// };
// const userModel = require('../models/UserModel'); // Correct path


// // exports.getALLUsers = async (req, res) => {
// //   try {
// //       const users = await userModel.find();
// //       res.status(200).send({
// //           success: true,
// //           message: "Users fetched successfully",
// //           users,
// //       });
// //   } catch (error) {
// //       console.error("Error in getALLUsers:", error);
// //       res.status(500).send({ success: false, error });
// //   }
// // };

// // exports.loginController = async (req, res) => {
// //   try {
// //       const { email, password } = req.body;
// //       if (!email || !password) {
// //           return res.status(400).send({
// //               success: false,
// //               message: "Email and password are required",
// //           });
// //       }
// //       const user = await userModel.findOne({ email });
// //       if (!user || user.password !== password) {
// //           return res.status(401).send({
// //               success: false,
// //               message: "Invalid credentials",
// //           });
// //       }
// //       res.status(200).send({
// //           success: true,
// //           message: "Login successful",
// //           user,
// //       });
// //   } catch (error) {
// //       console.error("Error in loginController:", error);
// //       res.status(500).send({ success: false, error });
// //   }
// // };



// // exports.getALLUsers = () => {};
// // exports.loginController = () => {};


// // // Mock database for demonstration
// // const users = [];

// // // GET Controller: Fetch all users
// // exports.getUsersController = (req, res) => {
// //     try {
// //         res.status(200).json({
// //             success: true,
// //             data: users,
// //         });
// //     } catch (error) {
// //         res.status(500).json({
// //             success: false,
// //             message: 'Failed to fetch users',
// //             error: error.message,
// //         });
// //     }
// // };

// // // POST Controller: Register a new user
// // exports.registerController = (req, res) => {
// //     try {
// //         const { name, email, password } = req.body;

// //         if (!name || !email || !password) {
// //             return res.status(400).json({
// //                 success: false,
// //                 message: 'All fields are required',
// //             });
// //         }

// //         const newUser = { id: users.length + 1, name, email, password };
// //         users.push(newUser);

// //         res.status(201).json({
// //             success: true,
// //             message: 'User registered successfully',
// //             data: newUser,
// //         });
// //     } catch (error) {
// //         res.status(500).json
// //     }