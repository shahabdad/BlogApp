import React, { useState } from 'react';
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  useMediaQuery,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import CategoryIcon from '@mui/icons-material/Category';
import { useThemeMode } from '../ThemeContext';

const CreateBlogs = () => {
  const { isDarkMode } = useThemeMode();
  const id = localStorage.getItem('userId');
  const navigate = useNavigate();
  const isMobile = useMediaQuery('(max-width:600px)');

  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    image: '',
    category: 'General',
  });

  const categories = ['General', 'Tech', 'Design', 'Travel', 'Food', 'Life'];

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!id) {
      toast.error('Please login to create a blog post.');
      return;
    }
    try {
      const { data } = await axios.post('http://localhost:9001/api/v1/blog/create-blog', {
        title: inputs.title,
        description: inputs.description,
        image: inputs.image,
        category: inputs.category,
        user: id,
      });
      if (data?.success) {
        toast.success('Blog Created successfully!');
        navigate('/my-blogs');
      }
    } catch (error) {
      console.log(error);
      toast.error('Failed to create post. Try again.');
    }
  };

  return (
    <Box sx={{ minHeight: '90vh', display: 'flex', alignItems: 'center', py: 6 }}>
      <Card
        sx={{
          width: isMobile ? '92%' : '60%',
          maxWidth: 650,
          margin: 'auto',
          bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
          backdropFilter: 'blur(8px)',
          boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 5 } }}>
          <form onSubmit={handleSubmit}>
            <Typography
              variant="h4"
              textAlign="center"
              fontWeight={800}
              sx={{
                background: isDarkMode 
                  ? 'linear-gradient(90deg, #818cf8 0%, #f472b6 100%)' 
                  : 'linear-gradient(90deg, #4f46e5 0%, #db2777 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                mb: 4,
              }}
            >
              Draft a New Article
            </Typography>

            {/* Title Input */}
            <InputLabel
              sx={{
                mb: 1,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
              }}
            >
              <TitleIcon fontSize="small" /> Title
            </InputLabel>
            <TextField
              name="title"
              value={inputs.title}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              fullWidth
              required
              placeholder="Give your article a catchy title..."
            />

            {/* Description Input */}
            <InputLabel
              sx={{
                mb: 1,
                mt: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
              }}
            >
              <DescriptionIcon fontSize="small" /> Description
            </InputLabel>
            <TextField
              name="description"
              value={inputs.description}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              required
              fullWidth
              multiline
              rows={6}
              placeholder="Tell your story here..."
            />

            {/* Category Dropdown */}
            <InputLabel
              sx={{
                mb: 1,
                mt: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
              }}
            >
              <CategoryIcon fontSize="small" /> Category
            </InputLabel>
            <FormControl fullWidth margin="dense">
              <Select
                name="category"
                value={inputs.category}
                onChange={handleChange}
                sx={{
                  borderRadius: 2.5,
                  bgcolor: isDarkMode ? 'rgba(255,255,255,0.02)' : 'transparent',
                }}
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Image URL Input */}
            <InputLabel
              sx={{
                mb: 1,
                mt: 3,
                fontWeight: 700,
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                color: 'text.primary',
              }}
            >
              <ImageIcon fontSize="small" /> Image URL
            </InputLabel>
            <TextField
              name="image"
              value={inputs.image}
              onChange={handleChange}
              margin="dense"
              variant="outlined"
              required
              fullWidth
              placeholder="Paste cover image web link (URL)..."
            />

            {/* Image Live Preview */}
            {inputs.image && (
              <Box sx={{ mt: 3, textAlign: 'center' }}>
                <Typography variant="caption" color="text.secondary" display="block" mb={1}>
                  Live Cover Preview
                </Typography>
                <Box
                  component="img"
                  src={inputs.image}
                  alt="Live Preview"
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                  sx={{
                    width: '100%',
                    maxHeight: 200,
                    objectFit: 'cover',
                    borderRadius: 3,
                    border: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)'}`,
                  }}
                />
              </Box>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 3,
              }}
            >
              Publish Article
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreateBlogs;
