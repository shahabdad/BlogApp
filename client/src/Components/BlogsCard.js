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