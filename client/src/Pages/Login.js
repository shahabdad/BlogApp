// import React, { use, useState } from 'react'
// import { Box, Typography, TextField, Button } from '@mui/material'
// import { useNavigate } from 'react-router-dom'
// import axios from "axios";
// import { useDispatch } from "react-redux";
// // import {useDispatch} from "";
// // import {authActions} from " ./Redux/store";
// import { authActions } from '../Redux/store';
// function Login() {
//   const dispatch = useDispatch()
//   const navigate = useNavigate();
//   //   state
//   const [inputs, setInputs] = useState({
//     email: "",
//     password: "",
//   });
//   //  handle input  change 
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   }
//   // 03369580356
//   // 03325901504
//   // bose Hnadle
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:9001/api/v1/user/login', { email: inputs.email, password: inputs.password });
//       if (data.success) {
//         localStorage.setItem('userId',data?.user._id)
//         dispatch(authActions.login());
//         alert("User login Successfully ");
//         navigate("/");
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <div>
//       <form onSubmit={handleSubmit}>
//         <Box maxWidth={450} display="flex"
//           flexDirection={'column'}
//           alignItems="center"
//           justifyContent={'center'}
//           margin="auto"
//           marginTop={5}
//           boxShadow={"10px  10px 20px #ccc"}
//           padding={3}
//           borderRadius={5}

//         >
//           <Typography variant='h4' padding={3} textAlign='center' sx={{ textTransform: "uppercase" }}  >  Login  </Typography>

//           <TextField
//             placeholder='email'
//             value={inputs.email}
//             name='email'
//             margin='normal'
//             onChange={handleChange}
//             type='email'
//             required />
//           <TextField
//             placeholder='passsword'
//             value={inputs.password}

//             onChange={handleChange}
//             name='password'
//             margin='normal'
//             type='password'
//             required
//           />
//           <Button type='submit'
//             variant='contained'
//             color='primary'
//             sx={{ borderRadius: 3, marginTop: '3' }}
//           >Submit</Button>
//           <Button onClick={() => navigate("/register")}
//             sx={{ borderRadius: 3, marginTop: '3' }} >NOt a User ? Please Register </Button>
//         </Box>
//       </form>
//     </div>
//   )
// }

// export default Login;


import React, { useState } from 'react';
import { Box, Typography, TextField, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from '../Redux/store';

function Login() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // State for inputs
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:9001/api/v1/user/login', {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        dispatch(authActions.login());
        alert("User login successfully!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      alert("Login failed. Please check your email and password.");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Box
          maxWidth={450}
          display="flex"
          flexDirection="column"
          alignItems="center"
          justifyContent="center"
          margin="auto"
          marginTop={5}
          boxShadow="10px 10px 20px rgba(0, 0, 0, 0.2)"
          padding={3}
          borderRadius={5}
        >
          <Typography
            variant="h4"
            padding={3}
            textAlign="center"
            sx={{ textTransform: "uppercase" }}
          >
            Login
          </Typography>

          <TextField
            placeholder="Email"
            value={inputs.email}
            name="email"
            margin="normal"
            onChange={handleChange}
            type="email"
            required
          />
          <TextField
            placeholder="Password"
            value={inputs.password}
            name="password"
            margin="normal"
            onChange={handleChange}
            type="password"
            required
          />
          <Button
            type="submit"
            variant="contained"
            color="primary"
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Submit
          </Button>
          <Button
            onClick={() => navigate("/register")}
            sx={{ borderRadius: 3, marginTop: 3 }}
          >
            Not a User? Please Register
          </Button>
        </Box>
      </form>
    </div>
  );
}

export default Login;
