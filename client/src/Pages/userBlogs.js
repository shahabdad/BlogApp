import React, { useState, useEffect } from "react";
import axios from "axios";
import Blogcard from "../Components/BlogsCard";
import { Container, Grid, Box, Typography, Button, Avatar, Card, CardContent, CircularProgress } from "@mui/material";
import { Link } from "react-router-dom";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArticleIcon from '@mui/icons-material/Article';
import { useThemeMode } from "../ThemeContext";

const UserBlogs = () => {
  const { isDarkMode } = useThemeMode();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const username = localStorage.getItem("username") || "User";
  const profilePic = localStorage.getItem("profilePic") || "";

  const getUserBlogs = async () => {
    setLoading(true);
    try {
      const id = localStorage.getItem("userId");
      if (!id) {
        setError("Please login to see your blogs.");
        return;
      }
      const { data } = await axios.get(`http://localhost:9001/api/v1/blog/user-blog/${id}`);
      if (data?.success) {
        setBlogs(data?.userBlog?.blogs || []);
        setError(null);
      } else {
        setBlogs([]);
      }
    } catch (error) {
      setError("An error occurred while fetching your blogs.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserBlogs();
  }, []);

  const totalLikes = blogs.reduce((sum, blog) => sum + (blog.likes ? blog.likes.length : 0), 0);

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      
      {/* User Dashboard Header card */}
      <Card 
        sx={{ 
          mb: 6, 
          bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
          backdropFilter: 'blur(8px)',
          border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
          <Grid container spacing={3} alignItems="center">
            
            {/* Avatar & Name */}
            <Grid item xs={12} sm={6} md={4} display="flex" alignItems="center" gap={3}>
              <Avatar
                src={profilePic ? `http://localhost:9001/uploads/${profilePic}` : null}
                sx={{ 
                  width: { xs: 70, md: 90 }, 
                  height: { xs: 70, md: 90 },
                  bgcolor: 'primary.main',
                  fontSize: '2rem',
                  border: '3px solid rgba(99, 102, 241, 0.3)'
                }}
              >
                {username[0].toUpperCase()}
              </Avatar>
              <Box>
                <Typography variant="h5" sx={{ fontWeight: 800 }}>
                  {username}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Content Creator
                </Typography>
              </Box>
            </Grid>

            {/* Stats Dashboard */}
            <Grid item xs={12} sm={6} md={5} display="flex" gap={4} justifyContent={{ xs: 'flex-start', sm: 'center' }}>
              <Box display="flex" alignItems="center" gap={1.5}>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'primary.light', color: 'primary.main' }}
                >
                  <ArticleIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                    {blogs.length}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Posts
                  </Typography>
                </Box>
              </Box>

              <Box display="flex" alignItems="center" gap={1.5}>
                <Box 
                  display="flex" 
                  alignItems="center" 
                  justifyContent="center" 
                  sx={{ width: 44, height: 44, borderRadius: '50%', bgcolor: 'error.light', color: '#ef4444' }}
                >
                  <FavoriteIcon />
                </Box>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 800, lineHeight: 1.1 }}>
                    {totalLikes}
                  </Typography>
                  <Typography variant="caption" color="text.secondary">
                    Total Likes
                  </Typography>
                </Box>
              </Box>
            </Grid>

            {/* Action Call */}
            <Grid item xs={12} md={3} display="flex" justifyContent={{ xs: 'flex-start', md: 'flex-end' }}>
              <Button 
                component={Link} 
                to="/create-blog" 
                variant="contained" 
                color="primary"
                startIcon={<NoteAddIcon />}
              >
                Write Post
              </Button>
            </Grid>

          </Grid>
        </CardContent>
      </Card>

      {/* Blogs Title */}
      <Typography variant="h4" sx={{ fontWeight: 800, mb: 4 }}>
        Your Publications
      </Typography>

      {error && (
        <Typography variant="h6" sx={{ color: 'error.main', textAlign: 'center', mt: 4 }}>
          {error}
        </Typography>
      )}

      {/* Loading state */}
      {loading ? (
        <Box display="flex" justifyContent="center" my={8}>
          <CircularProgress size={50} thickness={4} />
        </Box>
      ) : (
        <>
          {blogs.length > 0 ? (
            <Grid container spacing={4}>
              {blogs.map((blog) => (
                <Grid item xs={12} sm={6} md={4} key={blog._id} sx={{ display: 'flex' }}>
                  <Blogcard
                    id={blog._id}
                    isUser={true}
                    title={blog.title}
                    description={blog.description}
                    image={blog.image}
                    username={username}
                    profilePic={profilePic}
                    time={blog.createdAt}
                    likes={blog.likes}
                    comments={blog.comments}
                    category={blog.category}
                  />
                </Grid>
              ))}
            </Grid>
          ) : (
            <Card sx={{ textAlign: 'center', p: 6, bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.4)' : '#f8fafc', borderStyle: 'dashed' }}>
              <Typography variant="h5" sx={{ fontWeight: 700, mb: 1, color: 'text.secondary' }}>
                No blogs published yet
              </Typography>
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 3 }}>
                You haven't written any articles. Tap button below to draft your first article!
              </Typography>
              <Button 
                component={Link} 
                to="/create-blog" 
                variant="contained" 
                color="primary"
                startIcon={<NoteAddIcon />}
              >
                Create a Blog
              </Button>
            </Card>
          )}
        </>
      )}

    </Container>
  );
};

export default UserBlogs;
