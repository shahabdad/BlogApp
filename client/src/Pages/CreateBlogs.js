// import React, { useState } from 'react';
// import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import toast from 'react-hot-toast';
// import axios from 'axios';

// const CreateBlogs = () => {
//   const id = localStorage.getItem('userId');
//   const navigate = useNavigate();
//   const [inputs, setInputs] = useState({
//     title: '',
//     description: '',
//     image: '',
//   });

//   // Handle input change
//   const handleChange = (e) => {
//     setInputs((prevState) => ({
//       ...prevState,
//       [e.target.name]: e.target.value,
//     }));
//   };

//   // Handle form submit
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await axios.post('http://localhost:9001/api/v1/blog/create-blog', {
//         title: inputs.title,
//         description: inputs.description,
//         image: inputs.image,
//         user: id,
//       });
//       if (data?.success) {
//         toast.success('Blog Created');
//         navigate('/my-blogs');
//       }
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <Box
//         width="50%"
//         border={3}
//         borderRadius={10}
//         padding={3}
//         margin="auto"
//         boxShadow="10px 10px 20px #ccc"
//         display="flex"
//         flexDirection="column"
//         marginTop="30px"
//         bgcolor="#f5f5f5" // Light background color for the form
//       >
//         <Typography
//           variant="h4"
//           textAlign="center"
//           fontWeight="bold"
//           padding={3}
//           color="#2c3e50" // Dark color for the title
//         >
//           Create a Post
//         </Typography>

//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
//           Title
//         </InputLabel>
//         <TextField
//           name="title"
//           value={inputs.title}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
//         />

//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
//           Description
//         </InputLabel>
//         <TextField
//           name="description"
//           value={inputs.description}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
//         />

//         <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
//           Image URL
//         </InputLabel>
//         <TextField
//           name="image"
//           value={inputs.image}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
//         />

//         <Button
//           type="submit"
//           color="primary"
//           variant="contained"
//           sx={{
//             backgroundColor: '#3498db', // Blue color for the button
//             '&:hover': { backgroundColor: '#2980b9' },
//             marginTop: 2,
//             borderRadius: 5,
//           }}
//         >
//           Submit
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default CreateBlogs;


import React, { useState } from 'react';
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';

const CreateBlogs = () => {
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  });

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:9001/api/v1/blog/create-blog', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        user: id,
      });
      if (data?.success) {
        toast.success('Blog Created');
        navigate('/my-blogs');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Box
        width={isMobile ? '90%' : '50%'}
        border={3}
        borderRadius={4}
        padding={4}
        margin="auto"
        boxShadow="10px 10px 20px #ccc"
        display="flex"
        flexDirection="column"
        marginTop="30px"
        bgcolor="#f0f8ff" // Light blue background
      >
        {/* <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          padding={2}
          color="#34495e"
        >
          Create a Post
        </Typography> */}

<Typography
  variant="h4"
  textAlign="center"
  fontWeight="bold"
  padding={2}
  sx={{
    background: 'linear-gradient(90deg, #6a11cb 0%, #2575fc 100%)',
    WebkitBackgroundClip: 'text',
    WebkitTextFillColor: 'transparent',
    animation: 'fadeIn 1s ease-in-out',
    fontSize: { xs: '1.8rem', sm: '2.2rem', md: '2.5rem' },
  }}
>
  Create a Post
</Typography>

        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <TitleIcon /> Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="dense"
          variant="outlined"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '5px',
          }}
        />

        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <DescriptionIcon /> Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="dense"
          variant="outlined"
          required
          multiline
          rows={4}
          placeholder="Write your blog description here..."
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '5px',
          }}
        />

        <InputLabel
          sx={{
            mb: 1,
            mt: 2,
            fontSize: '18px',
            fontWeight: 'bold',
            color: '#2c3e50',
            display: 'flex',
            alignItems: 'center',
            gap: 1,
          }}
        >
          <ImageIcon /> Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="dense"
          variant="outlined"
          required
          sx={{
            backgroundColor: '#ffffff',
            borderRadius: '5px',
          }}
        />

        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: '#2980b9',
            '&:hover': { backgroundColor: '#21618c' },
            marginTop: 3,
            borderRadius: 5,
            padding: '10px 0',
            fontWeight: 'bold',
          }}
        >
          Submit Post
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlogs;
