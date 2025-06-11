import React from 'react';
import { Card, CardMedia, CardContent, Avatar, Typography, Box, IconButton } from '@mui/material';
import { blue, grey, red } from '@mui/material/colors';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Blogcard = ({ title, description, image, username, time, id, isUser }) => {
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
        width: {
          xs: '95%', // 95% width on extra-small screens
          sm: '90%', // 90% width on small screens
          md: '80%', // 80% width on medium and above
        },
        margin: '20px auto',
        padding: 2,
        backgroundColor: grey[50],
        boxShadow: '5px 5px 15px rgba(0, 0, 0, 0.1)',
        ':hover': {
          boxShadow: '10px 10px 30px rgba(20, 0, 0, 0.2)',
        },
        borderRadius: '10px',
      }}
    >
      {/* Edit/Delete Buttons for Admin/User */}
      {isUser && (
        <Box display="flex" justifyContent="flex-end">
          <IconButton onClick={handleEdit}>
            <ModeEditIcon sx={{ color: blue[500] }} />
          </IconButton>
          <IconButton onClick={handleDelete}>
            <DeleteIcon sx={{ color: red[500] }} />
          </IconButton>
        </Box>
      )}

      {/* User Info */}
      <Box display="flex" alignItems="center" mb={1}>
        <Avatar sx={{ bgcolor: blue[500] }} aria-label="user-avatar">
          {username ? username[0].toUpperCase() : 'N'}
        </Avatar>
        <Typography variant="h6" sx={{ marginLeft: 1, color: blue[700], fontSize: { xs: '1rem', sm: '1.2rem' } }}>
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
          height: {
            xs: '200px', // Smaller height for extra-small screens
            sm: '250px', // Medium height for small screens
            md: '300px', // Larger height for medium and above
          },
          objectFit: 'cover',
          borderRadius: '8px',
        }}
      />

      {/* Blog Content */}
      <CardContent>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: blue[700], fontSize: { xs: '1.2rem', sm: '1.5rem' } }}>
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: grey[900],
            marginBottom: 2,
            fontSize: { xs: '0.9rem', sm: '1rem' },
          }}
        >
          {description.length > 140 ? `${description.slice(0, 140)}...` : description}
        </Typography>
        <Typography
          variant="caption"
          sx={{
            color: grey[500],
            fontSize: { xs: '0.8rem', sm: '0.9rem' },
          }}
        >
          Published on: {new Date(time).toLocaleDateString() || 'N/A'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default Blogcard;
