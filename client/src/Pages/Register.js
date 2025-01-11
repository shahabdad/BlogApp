import React ,{ useState} from 'react'
import {Box, Typography,TextField,Button} from  '@mui/material'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const Register = () => {
  const   navigate = useNavigate();
  //   state
  const  [inputs, setInputs]  = useState({
    name   :"",
    email : "",
    password : "",
  });
  //  handle input  change 
   const  handleChange = (e) =>{
    setInputs((prevState )=> ({
      ...prevState, 
      [e.target.name]:e.target.value,
    }));
   };

// bose Hnadle
const handleSubmit = async (e) =>{
e.preventDefault();
try{
const {data} = await axios.post('http://localhost:9001/api/v1/user/register', {username:inputs.name,email:inputs.email,password:inputs.password});
  if(data.success){
    alert("User Register Successfully ");
    navigate("/login");
  }
} catch (error){
  console.log(error);
}
};
    
  return (
    <div>
       <form onSubmit={handleSubmit}>
      <Box maxWidth={450} display = "flex"
      flexDirection={'column'}
      alignItems="center"
      justifyContent={'center'}
      margin="auto"
      marginTop  ={5}
      boxShadow={"10px  10px 20px #ccc"}
      padding = {3}
      borderRadius={5}
      
      >
        <Typography variant='h4' padding={3} textAlign='center' sx = {{textTransform :"uppercase"}}  >Register</Typography>
        <TextField
        placeholder='name'
        value  = {inputs.name}
        name = 'name'
        margin ='normal'
        onChange={handleChange}
         type='text'
        required
        />
        <TextField
        placeholder='email'
        value = {inputs.email}
        name = 'email'
        margin ='normal' 
        onChange={handleChange}
       type='email'
       required/>
        <TextField
        placeholder='passsword'
        value  =  {inputs.password  }
       
        onChange={handleChange}
        name = 'password'
        margin ='normal' 
        type='password'
        required
        />
        <Button  type = 'submit'
        variant='contained'
        color='primary'
        sx ={{borderRadius:3,marginTop:'3'}}
         >Submit</Button>
        <Button  onClick ={() => navigate("/login") }  
           sx ={{borderRadius:3,marginTop:'3'}} >Already Register ? Please Login </Button>
        </Box>
       </form>
    </div>
  )
}

export default Register;