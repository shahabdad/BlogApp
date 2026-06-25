import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Button,
  InputLabel,
  TextField,
  Typography,
  Select,
  MenuItem,
  FormControl,
  Card,
  CardContent,
  useMediaQuery
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import TitleIcon from '@mui/icons-material/Title';
import DescriptionIcon from '@mui/icons-material/Description';
import ImageIcon from '@mui/icons-material/Image';
import CategoryIcon from '@mui/icons-material/Category';
import { useThemeMode } from '../ThemeContext';

const BlogDetails = () => {
    const { isDarkMode } = useThemeMode();
    const id = useParams().id;
    const navigate = useNavigate();
    const isMobile = useMediaQuery('(max-width:600px)');
    
    const [inputs, setInputs] = useState({
        title: '',
        description: '',
        image: '',
        category: 'General'
    });

    const categories = ['General', 'Tech', 'Design', 'Travel', 'Food', 'Life'];

    // blog details get
    const getBlogDetail = async () => {
        try {
            const { data } = await axios.get(`http://localhost:9001/api/v1/blog/get-blog/${id}`);
            if (data?.success) {
                setInputs({
                    title: data?.blog.title,
                    description: data?.blog.description,
                    image: data?.blog.image,
                    category: data?.blog.category || 'General',
                });
            }
        } catch (error) {
            console.log(error);
            toast.error("Failed to load blog details.");
        }
    }

    useEffect(() => {
        getBlogDetail();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [id]);

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
            const { data } = await axios.put(`http://localhost:9001/api/v1/blog/update-blog/${id}`, {
                title: inputs.title,
                description: inputs.description,
                image: inputs.image,
                category: inputs.category,
                user: localStorage.getItem('userId'),
            });
            if (data?.success) {
                toast.success('Blog Updated successfully!');
                navigate('/my-blogs');
            }
        } catch (error) {
            console.log(error);
            toast.error('Failed to update the blog. Try again.');
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
                  Update Article
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
                  color="warning"
                  fullWidth
                  sx={{
                    mt: 4,
                    py: 1.5,
                    fontSize: '1rem',
                    borderRadius: 3,
                    background: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
                    boxShadow: '0 4px 14px rgba(245, 158, 11, 0.4)',
                    color: '#ffffff',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #d97706 0%, #b45309 100%)',
                      transform: 'translateY(-2px)'
                    }
                  }}
                >
                  Update Post
                </Button>
              </form>
            </CardContent>
          </Card>
        </Box>
    )
}
export default BlogDetails