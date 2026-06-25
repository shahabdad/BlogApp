import React, { useState, useEffect, useRef } from "react";
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

    const [imageFile, setImageFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const fileInputRef = useRef(null);

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
                setPreview(data?.blog.image);
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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setImageFile(file);
            setPreview(URL.createObjectURL(file));
        }
    };

    // Handle form submit
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData();
            formData.append('title', inputs.title);
            formData.append('description', inputs.description);
            formData.append('category', inputs.category);
            formData.append('user', localStorage.getItem('userId'));
            if (imageFile) {
                formData.append('image', imageFile);
            } else {
                formData.append('image', inputs.image);
            }

            const { data } = await axios.put(`http://localhost:9001/api/v1/blog/update-blog/${id}`, formData);
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

                {/* Cover Image Uploader */}
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
                  <ImageIcon fontSize="small" /> Cover Image
                </InputLabel>
                <Box
                  onClick={() => fileInputRef.current.click()}
                  sx={{
                    border: `2px dashed ${isDarkMode ? 'rgba(255,255,255,0.2)' : 'rgba(0,0,0,0.15)'}`,
                    borderRadius: 3,
                    p: 3,
                    textAlign: 'center',
                    cursor: 'pointer',
                    bgcolor: isDarkMode ? 'rgba(255,255,255,0.01)' : 'rgba(0,0,0,0.01)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: isDarkMode ? '#818cf8' : '#4f46e5',
                      bgcolor: isDarkMode ? 'rgba(129,140,248,0.05)' : 'rgba(79,70,229,0.05)',
                      transform: 'scale(1.01)',
                    }
                  }}
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  {preview ? (
                    <Box>
                      <Box
                        component="img"
                        src={preview}
                        alt="Cover Preview"
                        sx={{
                          width: '100%',
                          maxHeight: 220,
                          objectFit: 'cover',
                          borderRadius: 2,
                          boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        }}
                      />
                      <Typography variant="caption" color="text.secondary" display="block" sx={{ mt: 1.5, fontWeight: 600 }}>
                        Click to change cover photo
                      </Typography>
                    </Box>
                  ) : (
                    <Box py={2}>
                      <Box
                        sx={{
                          display: 'inline-flex',
                          bgcolor: isDarkMode ? 'rgba(129,140,248,0.15)' : 'rgba(79,70,229,0.1)',
                          color: isDarkMode ? '#818cf8' : '#4f46e5',
                          p: 1.5,
                          borderRadius: '50%',
                          mb: 1.5
                        }}
                      >
                        <ImageIcon fontSize="large" />
                      </Box>
                      <Typography variant="body1" fontWeight={600} gutterBottom>
                        Select Cover Image
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        PNG, JPG, JPEG or GIF up to 5MB
                      </Typography>
                    </Box>
                  )}
                </Box>

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