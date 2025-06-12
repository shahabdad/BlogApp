// const express = require('express')
// const  cors  = require('cors')
// const morgan  = require('morgan') 
// const colors  = require('colors')
// const dotenv = require('dotenv')
// const { connection } = require('mongoose')
// const connectDB = require ('./config/db')

// // env config 
// dotenv.config()

// // router import 
// const userRoutes = require('./routes/userRoutes');
// const blogRoutes = require('./routes/blogRoutes')
// // mongodb  connection
// connectDB();
// //  rest object 
// const app = express();
// // middelwares
// app.use(cors());
// app.use(express.json());
// app.use(morgan('dev'));
// // routes
//  app.use("/api/v1/user",userRoutes );
//  app.use ("/api/v1/blog",blogRoutes);



// //  port
// const PORT = process.env.PORT || 9020; 
// app.listen(PORT,()=>{
// console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white)
// });






const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const colors = require('colors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// env config
dotenv.config();

// router imports
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
app.use('/uploads', express.static('uploads'));

// 👇 This line is necessary to access uploaded image files
app.use("/uploads", express.static("uploads"));

// routes
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/blog", blogRoutes);

// port
const PORT = process.env.PORT || 9020;
app.listen(PORT, () => {
  console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgBlue.white);
});
