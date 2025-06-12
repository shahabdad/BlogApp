// // // // import React from 'react';
// // // // import { Card, CardMedia, CardContent, Avatar, Typography, Box, IconButton } from '@mui/material';
// // // // import { blue, grey, red } from '@mui/material/colors';
// // // // import ModeEditIcon from '@mui/icons-material/ModeEdit';
// // // // import DeleteIcon from '@mui/icons-material/Delete';
// // // // import axios from 'axios';
// // // // import { useNavigate } from 'react-router-dom';

// // // // const Blogcard = ({ title, description, image, username, time, id, isUser }) => {
// // // //   const navigate = useNavigate();

// // // //   const handleDelete = async () => {
// // // //     try {
// // // //       const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
// // // //       if (data?.success) {
// // // //         alert('Blog Deleted');
// // // //         window.location.reload();
// // // //       }
// // // //     } catch (error) {
// // // //       console.error(error);
// // // //       alert('Failed to delete the blog. Please try again.');
// // // //     }
// // // //   };

// // // //   const handleEdit = () => {
// // // //     navigate(`/blog-details/${id}`);
// // // //   };

// // // //   return (
// // // //     <Card
// // // //       sx={{
// // // //         width: {
// // // //           xs: '95%', // 95% width on extra-small screens
// // // //           sm: '90%', // 90% width on small screens
// // // //           md: '80%', // 80% width on medium and above
// // // //         },
// // // //         margin: '20px auto',
// // // //         padding: 2,
// // // //         backgroundColor: grey[50],
// // // //         boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
// // // //         ':hover': {
// // // //           boxShadow: '10px 10px 30px rgba(20, 0, 0, 0.2)',
// // // //         },
// // // //         borderRadius: '10px',
// // // //       }}
// // // //     >
// // // //       {/* Edit/Delete Buttons for Admin/User */}
// // // //       {isUser && (
// // // //         <Box display="flex" justifyContent="flex-end">
// // // //           <IconButton onClick={handleEdit}>
// // // //             <ModeEditIcon sx={{ color: blue[500] }} />
// // // //           </IconButton>
// // // //           <IconButton onClick={handleDelete}>
// // // //             <DeleteIcon sx={{ color: red[500] }} />
// // // //           </IconButton>
// // // //         </Box>
// // // //       )}

// // // //       {/* User Info */}
// // // //       <Box display="flex" alignItems="center" mb={1}>
// // // //         <Avatar sx={{ bgcolor: blue[500] }} aria-label="user-avatar">
// // // //           {username ? username[0].toUpperCase() : 'N'}
// // // //         </Avatar>
// // // //         <Typography variant="h6" sx={{ marginLeft: 1, color: blue[700], fontSize: { xs: '1rem', sm: '1.2rem' } }}>
// // // //           {username || 'Unknown User'}
// // // //         </Typography>
// // // //       </Box>

// // // //       {/* Blog Image */}
// // // //       <CardMedia
// // // //         component="img"
// // // //         image={image}
// // // //         alt={title || 'Blog Image'}
// // // //         sx={{
// // // //           width: '100%',
// // // //           height: {
// // // //             xs: '200px', // Smaller height for extra-small screens
// // // //             sm: '250px', // Medium height for small screens
// // // //             md: '300px', // Larger height for medium and above
// // // //           },
// // // //           objectFit: 'cover',
// // // //           borderRadius: '8px',
// // // //         }}
// // // //       />

// // // //       {/* Blog Content */}
// // // //       <CardContent>
// // // //         <Typography variant="h5" sx={{ fontWeight: 'bold', color: blue[700], fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
// // // //           {title}
// // // //         </Typography>
// // // //         <Typography
// // // //           variant="body2"
// // // //           sx={{
// // // //             color: grey[900],
// // // //             marginBottom: 2,
// // // //             fontSize: { xs: '0.9rem', sm: '1rem' },
// // // //           }}
// // // //         >
// // // //           {description.length > 140 ? `${description.slice(0, 140)}...` : description}
// // // //         </Typography>
// // // //         <Typography
// // // //           variant="caption"
// // // //           sx={{
// // // //             color: grey[500],
// // // //             fontSize: { xs: '0.8rem', sm: '0.9rem' },
// // // //           }}
// // // //         >
// // // //           Published on: {new Date(time).toLocaleDateString() || 'N/A'}
// // // //         </Typography>
// // // //       </CardContent>
// // // //     </Card>
// // // //   );
// // // // };

// // // // export default Blogcard;


// // // import React from 'react';
// // // import { Card, CardMedia, CardContent, Avatar, Typography, Box, IconButton } from '@mui/material';
// // // import { blue, grey, red } from '@mui/material/colors';
// // // import ModeEditIcon from '@mui/icons-material/ModeEdit';
// // // import DeleteIcon from '@mui/icons-material/Delete';
// // // import axios from 'axios';
// // // import { useNavigate } from 'react-router-dom';

// // // const Blogcard = ({ title, description, image, username, profilePic, time, id, isUser }) => {
// // //   const navigate = useNavigate();

// // //   const handleDelete = async () => {
// // //     try {
// // //       const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
// // //       if (data?.success) {
// // //         alert('Blog Deleted');
// // //         window.location.reload();
// // //       }
// // //     } catch (error) {
// // //       console.error(error);
// // //       alert('Failed to delete the blog. Please try again.');
// // //     }
// // //   };

// // //   const handleEdit = () => {
// // //     navigate(`/blog-details/${id}`);
// // //   };

// // //   return (
// // //     <Card
// // //       sx={{
// // //         width: { xs: '95%', sm: '90%', md: '80%' },
// // //         margin: '20px auto',
// // //         padding: 2,
// // //         backgroundColor: grey[50],
// // //         boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
// // //         ':hover': { boxShadow: '10px 10px 30px rgba(20, 0, 0, 0.2)' },
// // //         borderRadius: '10px',
// // //       }}
// // //     >
// // //       {isUser && (
// // //         <Box display="flex" justifyContent="flex-end">
// // //           <IconButton onClick={handleEdit}>
// // //             <ModeEditIcon sx={{ color: blue[500] }} />
// // //           </IconButton>
// // //           <IconButton onClick={handleDelete}>
// // //             <DeleteIcon sx={{ color: red[500] }} />
// // //           </IconButton>
// // //         </Box>
// // //       )}

// // //       <Box display="flex" alignItems="center" mb={1}>
// // //         {profilePic ? (
// // //           <Avatar
// // //             src={`http://localhost:9001/uploads/${profilePic}`}
// // //             alt={username}
// // //             sx={{ width: 40, height: 40 }}
// // //           />
// // //         ) : (
// // //           <Avatar sx={{ bgcolor: blue[500] }}>
// // //             {username ? username[0].toUpperCase() : 'N'}
// // //           </Avatar>
// // //         )}
// // //         <Typography variant="h6" sx={{ marginLeft: 1, color: blue[700], fontSize: { xs: '1rem', sm: '1.2rem' } }}>
// // //           {username || 'Unknown User'}
// // //         </Typography>
// // //       </Box>

// // //       <CardMedia
// // //         component="img"
// // //         image={image}
// // //         alt={title || 'Blog Image'}
// // //         sx={{
// // //           width: '100%',
// // //           height: { xs: '200px', sm: '250px', md: '300px' },
// // //           objectFit: 'cover',
// // //           borderRadius: '8px',
// // //         }}
// // //       />

// // //       <CardContent>
// // //         <Typography variant="h5" sx={{ fontWeight: 'bold', color: blue[700], fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
// // //           {title}
// // //         </Typography>
// // //         <Typography
// // //           variant="body2"
// // //           sx={{ color: grey[900], marginBottom: 2, fontSize: { xs: '0.9rem', sm: '1rem' } }}
// // //         >
// // //           {description.length > 140 ? `${description.slice(0, 140)}...` : description}
// // //         </Typography>
// // //         <Typography variant="caption" sx={{ color: grey[500], fontSize: { xs: '0.8rem', sm: '0.9rem' } }}>
// // //           Published on: {new Date(time).toLocaleDateString() || 'N/A'}
// // //         </Typography>
// // //       </CardContent>
// // //     </Card>
// // //   );
// // // };

// // // export default Blogcard;


// // import React from 'react';
// // import {
// //   Card,
// //   CardMedia,
// //   CardContent,
// //   Avatar,
// //   Typography,
// //   Box,
// //   IconButton,
// //   Tooltip,
// // } from '@mui/material';
// // import { blueGrey, indigo, red, deepPurple } from '@mui/material/colors';
// // import ModeEditIcon from '@mui/icons-material/ModeEdit';
// // import DeleteIcon from '@mui/icons-material/Delete';
// // import axios from 'axios';
// // import { useNavigate } from 'react-router-dom';

// // const Blogcard = ({ title, description, image, username, profilePic, time, id, isUser }) => {
// //   const navigate = useNavigate();

// //   const handleDelete = async () => {
// //     try {
// //       const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
// //       if (data?.success) {
// //         alert('Blog Deleted');
// //         window.location.reload();
// //       }
// //     } catch (error) {
// //       console.error(error);
// //       alert('Failed to delete the blog. Please try again.');
// //     }
// //   };

// //   const handleEdit = () => {
// //     navigate(`/blog-details/${id}`);
// //   };

// //   return (
// //     <Card
// //       sx={{
// //         width: { xs: '95%', sm: '90%', md: '80%' },
// //         margin: '25px auto',
// //         padding: 2,
// //         borderRadius: 3,
// //         backgroundColor: blueGrey[50],
// //         boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
// //         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
// //         ':hover': {
// //           transform: 'translateY(-8px)',
// //           boxShadow: '0 12px 45px rgba(0,0,0,0.2)',
// //         },
// //       }}
// //     >
// //       {/* Edit & Delete Buttons */}
// //       {isUser && (
// //         <Box display="flex" justifyContent="flex-end" gap={1}>
// //           <Tooltip title="Edit" arrow>
// //             <IconButton onClick={handleEdit} sx={{ transition: 'all 0.2s', '&:hover': { color: deepPurple[700] } }}>
// //               <ModeEditIcon />
// //             </IconButton>
// //           </Tooltip>
// //           <Tooltip title="Delete" arrow>
// //             <IconButton onClick={handleDelete} sx={{ transition: 'all 0.2s', '&:hover': { color: red[700] } }}>
// //               <DeleteIcon />
// //             </IconButton>
// //           </Tooltip>
// //         </Box>
// //       )}

// //       {/* Avatar and Username */}
// //       <Box display="flex" alignItems="center" mb={2}>
// //         {profilePic ? (
// //           <Avatar
// //             src={`http://localhost:9001/uploads/${profilePic}`}
// //             alt={username}
// //             sx={{ width: 45, height: 45 }}
// //           />
// //         ) : (
// //           <Avatar sx={{ bgcolor: indigo[500], width: 45, height: 45 }}>
// //             {username ? username[0].toUpperCase() : 'U'}
// //           </Avatar>
// //         )}
// //         <Typography
// //           variant="subtitle1"
// //           sx={{
// //             marginLeft: 2,
// //             color: indigo[800],
// //             fontWeight: 600,
// //             fontSize: { xs: '1rem', sm: '1.1rem' },
// //           }}
// //         >
// //           {username || 'Unknown User'}
// //         </Typography>
// //       </Box>

// //       {/* Blog Image */}
// //       <CardMedia
// //         component="img"
// //         image={image}
// //         alt={title || 'Blog Image'}
// //         sx={{
// //           width: '100%',
// //           height: { xs: 200, sm: 280, md: 320 },
// //           objectFit: 'cover',
// //           borderRadius: 2,
// //           transition: '0.4s',
// //           ':hover': {
// //             filter: 'brightness(0.95)',
// //           },
// //         }}
// //       />

// //       {/* Blog Content */}
// //       <CardContent>
// //         <Typography
// //           variant="h5"
// //           sx={{
// //             fontWeight: 'bold',
// //             color: deepPurple[700],
// //             fontSize: { xs: '1.3rem', sm: '1.6rem' },
// //             mb: 1,
// //           }}
// //         >
// //           {title}
// //         </Typography>

// //         <Typography
// //           variant="body2"
// //           sx={{
// //             color: blueGrey[800],
// //             fontSize: { xs: '0.95rem', sm: '1.05rem' },
// //             mb: 2,
// //           }}
// //         >
// //           {description.length > 140 ? `${description.slice(0, 140)}...` : description}
// //         </Typography>

// //         <Typography
// //           variant="caption"
// //           sx={{ color: blueGrey[500], fontSize: '0.8rem' }}
// //         >
// //           Published on: {new Date(time).toLocaleDateString() || 'N/A'}
// //         </Typography>
// //       </CardContent>
// //     </Card>
// //   );
// // };

// // export default Blogcard;


// import React from 'react';
// import {
//   Card,
//   CardMedia,
//   CardContent,
//   Avatar,
//   Typography,
//   Box,
//   IconButton,
//   Tooltip,
// } from '@mui/material';
// import { blueGrey, indigo, red, deepPurple } from '@mui/material/colors';
// import ModeEditIcon from '@mui/icons-material/ModeEdit';
// import DeleteIcon from '@mui/icons-material/Delete';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const Blogcard = ({ title, description, image, username, profilePic, time, id, isUser }) => {
//   const navigate = useNavigate();

//   const handleDelete = async () => {
//     try {
//       const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
//       if (data?.success) {
//         alert('Blog Deleted');
//         window.location.reload();
//       }
//     } catch (error) {
//       console.error(error);
//       alert('Failed to delete the blog. Please try again.');
//     }
//   };

//   const handleEdit = () => {
//     navigate(`/blog-details/${id}`);
//   };

//   return (
//     <Card
//       sx={{
//         width: { xs: '95%', sm: '90%', md: '80%' },
//         margin: '25px auto',
//         padding: 2,
//         borderRadius: 3,
//         backgroundColor: blueGrey[50],
//         boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
//         transition: 'transform 0.3s ease, box-shadow 0.3s ease',
//         ':hover': {
//           transform: 'translateY(-8px)',
//           boxShadow: '0 12px 45px rgba(0,0,0,0.2)',
//         },
//       }}
//     >
//       {/* Edit & Delete Buttons */}
//       {isUser && (
//         <Box display="flex" justifyContent="flex-end" gap={1}>
//           <Tooltip title="Edit" arrow>
//             <IconButton onClick={handleEdit} sx={{ transition: 'all 0.2s', '&:hover': { color: deepPurple[700] } }}>
//               <ModeEditIcon />
//             </IconButton>
//           </Tooltip>
//           <Tooltip title="Delete" arrow>
//             <IconButton onClick={handleDelete} sx={{ transition: 'all 0.2s', '&:hover': { color: red[700] } }}>
//               <DeleteIcon />
//             </IconButton>
//           </Tooltip>
//         </Box>
//       )}

//       {/* Avatar and Username */}
//       <Box display="flex" alignItems="center" mb={2}>
//         {profilePic ? (
//           <Avatar
//             src={`http://localhost:9001/uploads/${profilePic}`}
//             alt={username}
//             sx={{ width: 45, height: 45 }}
//           />
//         ) : (
//           <Avatar sx={{ bgcolor: indigo[500], width: 45, height: 45 }}>
//             {username ? username[0].toUpperCase() : 'U'}
//           </Avatar>
//         )}
//         <Typography
//           variant="subtitle1"
//           sx={{
//             marginLeft: 2,
//             color: indigo[800],
//             fontWeight: 600,
//             fontSize: { xs: '1rem', sm: '1.1rem' },
//           }}
//         >
//           {username || 'Unknown User'}
//         </Typography>
//       </Box>

//       {/* Blog Image */}
//       <CardMedia
//         component="img"
//         image={image}
//         alt={title || 'Blog Image'}
//         sx={{
//           width: '100%',
//           height: { xs: 200, sm: 280, md: 320 },
//           objectFit: 'cover',
//           borderRadius: 2,
//           transition: '0.4s',
//           ':hover': {
//             filter: 'brightness(0.95)',
//           },
//         }}
//       />

//       {/* Blog Content */}
//       <CardContent>
//         <Typography
//           variant="h5"
//           sx={{
//             fontWeight: 'bold',
//             color: deepPurple[700],
//             fontSize: { xs: '1.3rem', sm: '1.6rem' },
//             mb: 1,
//           }}
//         >
//           {title}
//         </Typography>

//         <Typography
//           variant="body2"
//           sx={{
//             color: blueGrey[800],
//             fontSize: { xs: '0.95rem', sm: '1.05rem' },
//             mb: 2,
//           }}
//         >
//           {description.length > 140 ? `${description.slice(0, 140)}...` : description}
//         </Typography>

//         <Typography
//           variant="caption"
//           sx={{ color: blueGrey[500], fontSize: '0.8rem' }}
//         >
//           Published on: {new Date(time).toLocaleDateString() || 'N/A'}
//         </Typography>
//       </CardContent>
//     </Card>
//   );
// };

// export default Blogcard;



import React, { useState } from 'react';
import {
  Card,
  CardMedia,
  CardContent,
  Avatar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Collapse
} from '@mui/material';
import { blueGrey, indigo, red, deepPurple } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blogcard = ({ title, description, image, username, profilePic, time, id, isUser }) => {
  const [showDescription, setShowDescription] = useState(false);
  const navigate = useNavigate();

  const handleDelete = async () => {
    try {
      const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert('Blog Deleted');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  return (
    <Card
      sx={{
        width: { xs: '95%', sm: '90%', md: '80%' },
        margin: '25px auto',
        padding: 2,
        borderRadius: 3,
        backgroundColor: blueGrey[50],
        boxShadow: '0 8px 30px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        ':hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 45px rgba(0,0,0,0.2)',
        },
      }}
    >
      {isUser && (
        <Box display="flex" justifyContent="flex-end" gap={1}>
          <Tooltip title="Edit" arrow>
            <IconButton onClick={handleEdit} sx={{ '&:hover': { color: deepPurple[700] } }}>
              <ModeEditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete" arrow>
            <IconButton onClick={handleDelete} sx={{ '&:hover': { color: red[700] } }}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      )}

      {/* Avatar & Username */}
      <Box display="flex" alignItems="center" mb={2}>
        <Avatar
          src={profilePic ? `http://localhost:9001/uploads/${profilePic}` : null}
          sx={{ bgcolor: indigo[500], width: 45, height: 45 }}
        >
          {username ? username[0].toUpperCase() : 'U'}
        </Avatar>
        <Typography
          variant="subtitle1"
          sx={{ marginLeft: 2, color: indigo[800], fontWeight: 600 }}
        >
          {username || 'Unknown User'}
        </Typography>
      </Box>

      {/* Blog Image */}
      <CardMedia
        component="img"
        image={image}
        alt={title || 'Blog Image'}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          borderRadius: 2,
        }}
      />

      {/* Title & Expand Icon */}
      <CardContent sx={{ paddingBottom: '8px !important' }}>
        <Typography
          variant="h5"
          sx={{ fontWeight: 'bold', color: deepPurple[700], mb: 1 }}
        >
          {title}
        </Typography>

        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="caption" sx={{ color: blueGrey[500] }}>
            Published on: {new Date(time).toLocaleDateString() || 'N/A'}
          </Typography>

          <Tooltip title={showDescription ? 'Hide Description' : 'Show Description'}>
            <IconButton
              onClick={() => setShowDescription(!showDescription)}
              sx={{ transform: showDescription ? 'rotate(180deg)' : 'rotate(0deg)', transition: '0.3s' }}
            >
              <ExpandMoreIcon />
            </IconButton>
          </Tooltip>
        </Box>

        {/* Description (toggle on click) */}
        <Collapse in={showDescription} timeout="auto" unmountOnExit>
          <Typography
            variant="body2"
            sx={{
              color: blueGrey[800],
              mt: 5,
              fontSize: { xs: '0.95rem', sm: '1.05rem' },
            }}
          >
            {description}
          </Typography>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Blogcard;