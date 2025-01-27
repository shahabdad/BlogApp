
// // import React, { useState } from 'react';
// // import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
// // import {useNavigate} from 'react-router-dom';
// // import toast from 'react-hot-toast';
// // import   axios  from 'axios';
// // const CreateBlogs = () => {
// //     const id = localStorage.getItem('userId')
// //     const navigate = useNavigate();
// //     const [inputs, setInputs] = useState({
// //         title: "",
// //         description: "",
// //         image: "",
// //     });
// // // Handle input change
// //     const handleChange = (e) => {
// //         setInputs((prevState) => ({
// //             ...prevState,
// //             [e.target.name]: e.target.value,
// //         }));
// //     };
// //     // Handle form submit
// //     const handleSubmit = async (e) => {
// //         e.preventDefault();
// //         try {
// //             const {data } = await  axios.post('http://localhost:9001/api/v1/blog/create-blog',{
// //                 title :inputs.title,
// //                 description:inputs.description,
// //                 image:inputs.image,
// //                 user:id,
// //             })
// //             if(data?.success){
// //                 toast.success('Blog Created')
// //                 navigate('/my-blogs')
// //             }
// //         }catch(error){
// //             console.log(Error);

// //         }
// //     };
// //      return (
// //         <>
// //             <form onSubmit={handleSubmit}>
// //                 <Box
// //                     width="50%"
// //                     border={3}
// //                     borderRadius={10}
// //                     padding={3}
// //                     margin="auto"
// //                     boxShadow="10px 10px 20px #ccc"
// //                     display="flex"
// //                     flexDirection="column"
// //                     marginTop="30px"
// //                 >
// //                     <Typography
// //                         variant="h2"
// //                         textAlign="center"
// //                         fontWeight="bold"
// //                         padding={3}
// //                         color="gray"
// //                     >
// //                         Create a Post
// //                     </Typography>
// //                     <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
// //                         Title
// //                     </InputLabel>
// //                     <TextField
// //                         name="title"
// //                         value={inputs.title}
// //                         onChange={handleChange}
// //                         margin="normal"
// //                         variant="outlined"
// //                         required
// //                     />
// //                     <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
// //                         Description
// //                     </InputLabel>
// //                     <TextField
// //                         name="description"
// //                         value={inputs.description}
// //                         onChange={handleChange}
// //                         margin="normal"
// //                         variant="outlined"
// //                         required
// //                     />
// //                     <InputLabel sx={{ mb: 1, mt: 2, fontSize: "24px", fontWeight: "bold" }}>
// //                         Image URL
// //                     </InputLabel>
// //                     <TextField
// //                         name="image"
// //                         value={inputs.image}
// //                         onChange={handleChange}
// //                         margin="normal"
// //                         variant="outlined"
// //                         required
// //                     />
// //                     <Button type="submit" color="primary" variant="contained">
// //                         Submit
// //                     </Button>
// //                 </Box>
// //             </form>
// //         </>
// //     );
// // };

// // export default CreateBlogs;


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
//       toast.error('An error occurred while creating the blog.');
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
//         backgroundColor="#f9f9f9"
//       >
//         <Typography
//           variant="h3"
//           textAlign="center"
//           fontWeight="bold"
//           padding={3}
//           color="gray"
//           marginBottom="20px"
//         >
//           Create a Blog Post
//         </Typography>

//         <InputLabel sx={{ mb: 1, fontSize: '18px', fontWeight: 'bold' }}>Title</InputLabel>
//         <TextField
//           name="title"
//           value={inputs.title}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           sx={{ marginBottom: '20px' }}
//         />

//         <InputLabel sx={{ mb: 1, fontSize: '18px', fontWeight: 'bold' }}>Description</InputLabel>
//         <TextField
//           name="description"
//           value={inputs.description}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           multiline
//           rows={4}
//           sx={{ marginBottom: '20px' }}
//         />

//         <InputLabel sx={{ mb: 1, fontSize: '18px', fontWeight: 'bold' }}>Image URL</InputLabel>
//         <TextField
//           name="image"
//           value={inputs.image}
//           onChange={handleChange}
//           margin="normal"
//           variant="outlined"
//           required
//           sx={{ marginBottom: '30px' }}
//         />

//         <Button type="submit" color="primary" variant="contained" sx={{ padding: '10px', fontSize: '16px' }}>
//           Create Post
//         </Button>
//       </Box>
//     </form>
//   );
// };

// export default CreateBlogs;


import React, { useState } from 'react';
import { Box, Button, InputLabel, TextField, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';

const CreateBlogs = () => {
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
  });

  // Handle input change
  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // Handle form submit
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
        width="50%"
        border={3}
        borderRadius={10}
        padding={3}
        margin="auto"
        boxShadow="10px 10px 20px #ccc"
        display="flex"
        flexDirection="column"
        marginTop="30px"
        bgcolor="#f5f5f5" // Light background color for the form
      >
        <Typography
          variant="h4"
          textAlign="center"
          fontWeight="bold"
          padding={3}
          color="#2c3e50" // Dark color for the title
        >
          Create a Post
        </Typography>

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
          Title
        </InputLabel>
        <TextField
          name="title"
          value={inputs.title}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
          Description
        </InputLabel>
        <TextField
          name="description"
          value={inputs.description}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
        />

        <InputLabel sx={{ mb: 1, mt: 2, fontSize: '20px', fontWeight: 'bold', color: '#2c3e50' }}>
          Image URL
        </InputLabel>
        <TextField
          name="image"
          value={inputs.image}
          onChange={handleChange}
          margin="normal"
          variant="outlined"
          required
          sx={{ backgroundColor: '#fff', borderRadius: '5px' }}
        />

        <Button
          type="submit"
          color="primary"
          variant="contained"
          sx={{
            backgroundColor: '#3498db', // Blue color for the button
            '&:hover': { backgroundColor: '#2980b9' }, // Darker blue on hover
            marginTop: 2,
            borderRadius: 5,
          }}
        >
          Submit
        </Button>
      </Box>
    </form>
  );
};

export default CreateBlogs;
