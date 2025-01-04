const express = require('express')
const  cors  = require('cors')
const morgan  = require('morgan') 
const colors  = require('colors')
const dotenv = require('dotenv')
const { connection } = require('mongoose')
const connectDB = require ('./config/db')

// env config 
dotenv.config()

// router import 
// const userRoutes = require('./routes/userRoutes')

const userRoutes = require('./routes/userRoutes');


// mongodb  connection
connectDB();

//  rest object 
const app = express();

// middelwares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

// routes
// app.get('/',(req,res)=>{
//     res.status(200).send({
//         message:"Node server",
//     });
// });

 app.use("/api/v1/user",userRoutes );

// app.use((req, res, next) => {
//     console.log(`Incoming Request URL: ${req.url}`);
//     next();
// });


// app.use((req, res, next) => {
//     console.log(`Incoming URL: ${req.url}`);
//     console.log(`Request Body:`, req.body);
//     next();
// });


// app.use((req, res, next) => {
//     req.url = req.url.trim(); // Removes extra spaces or newlines
//     console.log(`Sanitized URL: ${req.url}`);
//     next();
// });

//  port
const PORT = process.env.PORT || 9020; 
app.listen(PORT,()=>{
console.log(`Server Running on ${process.env.DEV_MODE} mode on port ${PORT}`.bgGreen.white)
});




