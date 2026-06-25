import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Blogcard from '../Components/BlogsCard';
import { Container, Grid, TextField, InputAdornment, Box, Chip, Typography, CircularProgress } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useThemeMode } from '../ThemeContext';

const Blogs = () => {
  const { isDarkMode } = useThemeMode();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Tech', 'Design', 'Travel', 'Food', 'Life'];

  const getAllBlogs = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get('http://localhost:9001/api/v1/blog/all-blog');
      if (data?.success) {
        setBlogs(data.blogs); 
        setError(null);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      setError('Error fetching blogs. Please check your backend connection.');
      console.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllBlogs();
  }, []);

  const filteredBlogs = blogs.filter((blog) => {
    const matchesSearch = 
      (blog.title || '').toLowerCase().includes(searchQuery.toLowerCase()) || 
      (blog.description || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (blog.user?.username || '').toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesCategory = 
      selectedCategory === 'All' || 
      (blog.category && blog.category.toLowerCase() === selectedCategory.toLowerCase());
      
    return matchesSearch && matchesCategory;
  });

  return (
    <Box sx={{ minHeight: '90vh', pb: 8 }}>
      
      {/* Premium Hero Banner */}
      <Box 
        sx={{ 
          background: isDarkMode 
            ? 'radial-gradient(circle at top right, rgba(99, 102, 241, 0.15) 0%, transparent 60%)' 
            : 'radial-gradient(circle at top right, rgba(79, 70, 229, 0.05) 0%, transparent 60%)',
          py: { xs: 6, md: 10 }, 
          textAlign: 'center',
          borderBottom: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}`
        }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 800,
              fontSize: { xs: '2.5rem', sm: '3.5rem', md: '4rem' },
              mb: 2,
              background: isDarkMode 
                ? 'linear-gradient(90deg, #f1f5f9 0%, #94a3b8 100%)' 
                : 'linear-gradient(90deg, #0f172a 0%, #475569 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              letterSpacing: '-1.5px',
              lineHeight: 1.1
            }}
          >
            Discover Stories & Ideas
          </Typography>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 500, 
              color: 'text.secondary', 
              mb: 4,
              fontSize: { xs: '1rem', sm: '1.25rem' }
            }}
          >
            Insights, thoughts, and expertise from creators around the globe.
          </Typography>

          {/* Search Box */}
          <Box display="flex" justifyContent="center">
            <TextField
              placeholder="Search by title, body, or author..."
              variant="outlined"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              sx={{
                width: { xs: '100%', sm: '80%', md: '60%' },
                '& .MuiOutlinedInput-root': {
                  bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
                  backdropFilter: 'blur(10px)',
                  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.05)',
                }
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />
          </Box>
        </Container>
      </Box>

      {/* Main Content Area */}
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        
        {/* Category Filter Pills */}
        <Box 
          display="flex" 
          gap={1.5} 
          justifyContent="center" 
          flexWrap="wrap" 
          mb={6}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              color={selectedCategory === cat ? 'primary' : 'default'}
              variant={selectedCategory === cat ? 'contained' : 'outlined'}
              sx={{
                px: 1,
                py: 2,
                fontWeight: 600,
                fontSize: '0.85rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)'
                }
              }}
            />
          ))}
        </Box>

        {error && (
          <Typography variant="h6" sx={{ color: 'error.main', textAlign: 'center', mt: 4 }}>
            {error}
          </Typography>
        )}

        {/* Loading Spinner */}
        {loading ? (
          <Box display="flex" justifyContent="center" my={8}>
            <CircularProgress size={50} thickness={4} />
          </Box>
        ) : (
          <>
            {filteredBlogs.length > 0 ? (
              <Grid container spacing={4}>
                {filteredBlogs.map((blog) => (
                  <Grid item xs={12} sm={6} md={4} key={blog._id} sx={{ display: 'flex' }}>
                    <Blogcard
                      id={blog._id}
                      isUser={localStorage.getItem('userId') === blog?.user?._id}
                      title={blog.title}
                      description={blog.description}
                      image={blog.image}
                      username={blog.user?.username}
                      profilePic={blog.user?.image}
                      time={blog.createdAt}
                      likes={blog.likes}
                      comments={blog.comments}
                      category={blog.category}
                    />
                  </Grid>
                ))}
              </Grid>
            ) : (
              <Box textAlign="center" py={8}>
                <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                  No blogs found
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  Try refining your search keyword or selected category filter.
                </Typography>
              </Box>
            )}
          </>
        )}

      </Container>
    </Box>
  );
};

export default Blogs;
