// import React ,{ useState} from 'react'
// import {Box, Typography,TextField,Button} from  '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import axios from "axios";
// import toast from 'react-hot-toast';
// const Register = () => {
//   const   navigate = useNavigate();
//   //   state
//   const  [inputs, setInputs]  = useState({
//     name   :"",
//     email : "",
//     password : "",
//   });
//   //  handle input  change 
//    const  handleChange = (e) =>{
//     setInputs((prevState )=> ({
//       ...prevState, 
//       [e.target.name]:e.target.value,
//     }));
//    };

// // bose Hnadle
// const handleSubmit = async (e) =>{
// e.preventDefault();
// try{
// const {data} = await axios.post('http://localhost:9001/api/v1/user/register', {username:inputs.name,email:inputs.email,password:inputs.password});
//   if(data.success){
//     toast.success("User Register Successfully ");
//     navigate("/login");
//   }
// } catch (error){
//   console.log(error);
// }
// };
    
//   return (
//     <div>
//        <form onSubmit={handleSubmit}>
//       <Box maxWidth={450} display = "flex"
//       flexDirection={'column'}
//       alignItems="center"
//       justifyContent={'center'}
//       margin="auto"
//       marginTop  ={5}
//       boxShadow={"10px  10px 20px #ccc"}
//       padding = {3}
//       borderRadius={5}
      
//       >
//         <Typography variant='h4' padding={3} textAlign='center' sx = {{textTransform :"uppercase"}}  >Register</Typography>
//         <TextField
//         placeholder='name'
//         value  = {inputs.name}
//         name = 'name'
//         margin ='normal'
//         onChange={handleChange}
//          type='text'
//         required
//         />
//         <TextField
//         placeholder='email'
//         value = {inputs.email}
//         name = 'email'
//         margin ='normal' 
//         onChange={handleChange}
//        type='email'
//        required/>
//         <TextField
//         placeholder='passsword'
//         value  =  {inputs.password  }
       
//         onChange={handleChange}
//         name = 'password'
//         margin ='normal' 
//         type='password'
//         required
//         />
//         <Button  type = 'submit'
//         variant='contained'
//         color='primary'
//         sx ={{borderRadius:3,marginTop:'3'}}
//          >Submit</Button>
//         <Button  onClick ={() => navigate("/login") }  
//            sx ={{borderRadius:3,marginTop:'3'}} >Already Register ? Please Login </Button>
//         </Box>
//        </form>
//     </div>
//   )
// }
// export default Register;

import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const Register = () => {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);

  // Handle text input changes
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload a profile image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", inputs.name);
      formData.append("em`ail", inputs.email);
      formData.append("password", inputs.password);
      formData.append("image", image);

      const { data } = await axios.post(
        "http://localhost:9001/api/v1/user/register",
        formData
      );

      if (data.success) {
        toast.success("User registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
    }
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      maxWidth={450}
      mx="auto"
      mt={5}
      p={4}
      boxShadow="10px 10px 20px #ccc"
      borderRadius={5}
      display="flex"
      flexDirection="column"
      alignItems="center"
    >
      <Typography
        variant="h4"
        mb={3}
        textAlign="center"
        sx={{ textTransform: "uppercase", fontWeight: "bold" }}
      >
        Register
      </Typography>

      {/* Image Upload Area */}
      <Box
        onClick={() => fileInputRef.current.click()}
        sx={{
          cursor: "pointer",
          mb: 2,
          textAlign: "center",
        }}
      >
        <Stack alignItems="center" spacing={1}>
          <Avatar
            src={preview}
            sx={{ width: 80, height: 80 }}
          />
          <Typography variant="body2" color="textSecondary">
            Click to select profile image
          </Typography>
        </Stack>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
      </Box>

      {/* Input Fields */}
      <TextField
        label="Name"
        name="name"
        value={inputs.name}
        onChange={handleChange}
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Email"
        name="email"
        value={inputs.email}
        onChange={handleChange}
        type="email"
        fullWidth
        margin="normal"
        required
      />
      <TextField
        label="Password"
        name="password"
        value={inputs.password}
        onChange={handleChange}
        type="password"
        fullWidth
        margin="normal"
        required
      />

      {/* Buttons */}
      <Button
        type="submit"
        variant="contained"
        color="primary"
        sx={{ mt: 3, borderRadius: 3 }}
        fullWidth
      >
        Submit
      </Button>

      <Button
        onClick={() => navigate("/login")}
        sx={{ mt: 2, textTransform: "none", fontSize: "0.9rem" }}
        color="secondary"
      >
        Already registered? Click here to login
      </Button>
    </Box>
  );
};

export default Register;
