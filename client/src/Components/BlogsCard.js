import React from 'react';
import { Card, CardMedia, CardContent, Avatar, Typography, Box, IconButton } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
const Blogcard = ({ title, description, image, username, time, id, isUser }) => {
  const navigate = useNavigate(); // For navigation

  const handleDelete = async () => {
    try {
      // Sending DELETE request to server
      const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        alert('Blog Deleted');
        window.location.reload(); // Reloading the page after deletion
      }
    } catch (error) {
      console.error(error);
      alert('Failed to delete the blog. Please try again.');
    }
  };

  // Function to edit the blog
  const handleEdit = () => {
    navigate(`/blog-details/${id}`); // Navigate to the blog edit page
  };

  return (
    <Card
      sx={{
        width: '50%', // Card width
        margin: '20px auto', // Centered on the page
        padding: 2, // Padding inside the card
        backgroundColor: grey[50], // Soft light grey background
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)', // Subtle shadow for a professional look
        ':hover': {
          boxShadow: '10px 10px 20px rgba(0, 0, 0, 0.2)', // Shadow on hover for emphasis
        },
        borderRadius: '10px', // Rounded corners
      }}
    >
      {/* Show edit and delete buttons only if the user is the owner */}
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit}>
            <ModeEditIcon sx={{ color: blue[500] }} /> {/* Edit button in blue */}
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: red[500] }} /> {/* Delete button in red */}
          </IconButton>
        </Box>
      )}

      {/* Card Header: Avatar and Username */}
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="user-avatar">
          {username || 'N/A'} {/* Display the first letter of the username */}
        </Avatar>
        <Typography variant="h6" sx={{ marginLeft: 1, color: blue[700] }}>
          {username} {/* Display username */}
        </Typography>
      </Box>

      {/* Card Media with Image (Full Image Display) */}
      <CardMedia
        component="img"
        image={image}
        alt={title || 'Blog Image'}
        sx={{
          width: '100%', // Make the image responsive and take up full width of its container
          height: 'auto', // Ensure image maintains aspect ratio
          objectFit: 'cover', // Ensures the image covers the area without distortion
        }}
      />

      {/* Card Content: Title, Description, and Time */}
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: blue[700] }}>
          {title} {/* Display blog title */}
        </Typography>
        <Typography variant="body2" sx={{ color: grey[900], marginBottom: 2 }}>
          {description} {/* Display blog description */}
        </Typography>
        <Typography variant="caption" sx={{ color: grey[500] }}>
          Published on: {new Date(time).toLocaleDateString() || 'N/A'} {/* Display blog publish date */}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blogcard;
