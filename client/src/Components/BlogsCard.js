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
  Collapse,
  Chip,
  Button,
  TextField,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import CommentIcon from '@mui/icons-material/Comment';
import SendIcon from '@mui/icons-material/Send';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteIcon from '@mui/icons-material/Delete';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useThemeMode } from '../ThemeContext';

const Blogcard = ({
  title,
  description,
  image,
  username,
  profilePic,
  time,
  id,
  isUser,
  likes = [],
  comments = [],
  category = 'General'
}) => {
  const { isDarkMode } = useThemeMode();
  const navigate = useNavigate();
  
  const currentUserId = localStorage.getItem('userId');
  const currentUsername = localStorage.getItem('username');

  const [likesState, setLikesState] = useState(likes);
  const [commentsState, setCommentsState] = useState(comments);
  const [commentInput, setCommentInput] = useState('');
  const [showComments, setShowComments] = useState(false);
  const [isLiking, setIsLiking] = useState(false);

  const isLiked = currentUserId && likesState.includes(currentUserId);
  const readTime = Math.max(1, Math.ceil((description || '').split(/\s+/).length / 200));

  // Category Color Map
  const getCategoryColor = (cat) => {
    const formatted = cat.toLowerCase();
    if (formatted === 'tech') return { bg: 'rgba(99, 102, 241, 0.15)', text: '#818cf8' };
    if (formatted === 'design') return { bg: 'rgba(236, 72, 153, 0.15)', text: '#f472b6' };
    if (formatted === 'travel') return { bg: 'rgba(20, 184, 166, 0.15)', text: '#2dd4bf' };
    if (formatted === 'food') return { bg: 'rgba(245, 158, 11, 0.15)', text: '#fbbf24' };
    if (formatted === 'life') return { bg: 'rgba(16, 185, 129, 0.15)', text: '#34d399' };
    return { bg: 'rgba(139, 92, 246, 0.15)', text: '#a78bfa' }; // General / Custom
  };

  const catColor = getCategoryColor(category);

  const handleDelete = async () => {
    const confirmDelete = window.confirm('Are you sure you want to delete this blog?');
    if (!confirmDelete) return;
    try {
      const { data } = await axios.delete(`http://localhost:9001/api/v1/blog/delete-blog/${id}`);
      if (data?.success) {
        toast.success('Blog Deleted Successfully');
        window.location.reload();
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to delete the blog. Please try again.');
    }
  };

  const handleEdit = () => {
    navigate(`/blog-details/${id}`);
  };

  const handleLike = async () => {
    if (!currentUserId) {
      toast.error('Please login to like this blog!');
      return;
    }
    if (isLiking) return;
    setIsLiking(true);
    try {
      const { data } = await axios.put(`http://localhost:9001/api/v1/blog/like-blog/${id}`, {
        userId: currentUserId
      });
      if (data?.success) {
        setLikesState(data.likes);
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not process like action.');
    } finally {
      setIsLiking(false);
    }
  };

  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!currentUserId) {
      toast.error('Please login to add a comment!');
      return;
    }
    if (!commentInput.trim()) return;

    try {
      const { data } = await axios.put(`http://localhost:9001/api/v1/blog/comment-blog/${id}`, {
        userId: currentUserId,
        username: currentUsername || 'Blogger',
        comment: commentInput.trim()
      });
      if (data?.success) {
        setCommentsState(data.comments);
        setCommentInput('');
        toast.success('Comment added');
      }
    } catch (error) {
      console.error(error);
      toast.error('Could not submit comment.');
    }
  };

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
        backdropFilter: 'blur(8px)',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: isDarkMode 
            ? '0 12px 30px 0 rgba(0, 0, 0, 0.6), 0 0 15px rgba(99, 102, 241, 0.2)' 
            : '0 12px 30px 0 rgba(0, 0, 0, 0.08)',
        }
      }}
    >
      {/* Blog Image with Hover Zoom */}
      <Box sx={{ position: 'relative', overflow: 'hidden', pt: '56.25%' /* 16:9 aspect ratio */ }}>
        <CardMedia
          component="img"
          image={image || 'https://images.unsplash.com/photo-1543128639-4cb7e6eeef1b?auto=format&fit=crop&w=800&q=80'}
          alt={title || 'Blog Cover'}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.5s ease',
            '&:hover': {
              transform: 'scale(1.08)',
            }
          }}
        />
        
        {/* Category Pill Overlaid */}
        <Chip
          label={category}
          sx={{
            position: 'absolute',
            top: 16,
            left: 16,
            backdropFilter: 'blur(10px)',
            backgroundColor: catColor.bg,
            color: catColor.text,
            fontWeight: 700,
            border: `1px solid ${catColor.text}40`,
            fontSize: '0.75rem',
            textTransform: 'uppercase'
          }}
        />
      </Box>

      {/* Card Header Content */}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
        
        {/* Author details & Edit/Delete Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <Box display="flex" alignItems="center" gap={1.5}>
            <Avatar
              src={profilePic ? `http://localhost:9001/uploads/${profilePic}` : null}
              sx={{ bgcolor: '#4f46e5', width: 36, height: 36 }}
            >
              {username ? username[0].toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography variant="subtitle2" sx={{ fontWeight: 700, lineHeight: 1.2 }}>
                {username || 'Anonymous'}
              </Typography>
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                {new Date(time).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
              </Typography>
            </Box>
          </Box>

          {isUser && (
            <Box display="flex" gap={0.5}>
              <Tooltip title="Edit Post" arrow>
                <IconButton size="small" onClick={handleEdit} sx={{ color: 'primary.main', '&:hover': { bgcolor: 'action.hover' } }}>
                  <ModeEditIcon fontSize="small" />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete Post" arrow>
                <IconButton size="small" onClick={handleDelete} sx={{ color: 'error.main', '&:hover': { bgcolor: 'error.lighter' } }}>
                  <DeleteIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            </Box>
          )}
        </Box>

        {/* Read Time & Details */}
        <Box display="flex" alignItems="center" gap={0.5} mb={1}>
          <AccessTimeIcon sx={{ fontSize: 14, color: 'text.secondary' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 600 }}>
            {readTime} min read
          </Typography>
        </Box>

        {/* Title */}
        <Typography
          variant="h6"
          component="h2"
          sx={{
            fontWeight: 800,
            mb: 1.5,
            lineHeight: 1.3,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
          }}
        >
          {title}
        </Typography>

        {/* Teaser Description */}
        <Typography
          variant="body2"
          sx={{
            color: 'text.secondary',
            mb: 3,
            lineHeight: 1.6,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
            flexGrow: 1
          }}
        >
          {description}
        </Typography>

        <Divider sx={{ my: 1.5, opacity: 0.5 }} />

        {/* Interaction Actions */}
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Box display="flex" gap={1.5}>
            {/* Likes Icon Button */}
            <Box display="flex" alignItems="center">
              <IconButton 
                onClick={handleLike} 
                disabled={isLiking}
                sx={{ 
                  color: isLiked ? '#ef4444' : 'text.secondary',
                  transition: 'transform 0.2s',
                  '&:active': { transform: 'scale(1.3)' }
                }}
              >
                {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5, color: 'text.secondary' }}>
                {likesState.length}
              </Typography>
            </Box>

            {/* Comment Toggle Button */}
            <Box display="flex" alignItems="center">
              <IconButton onClick={() => setShowComments(!showComments)} sx={{ color: 'text.secondary' }}>
                <CommentIcon />
              </IconButton>
              <Typography variant="body2" sx={{ fontWeight: 600, ml: 0.5, color: 'text.secondary' }}>
                {commentsState.length}
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Comment Thread Collapse Section */}
        <Collapse in={showComments} timeout="auto" unmountOnExit>
          <Box sx={{ mt: 3, pt: 2, borderTop: `1px solid ${isDarkMode ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'}` }}>
            <Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 2 }}>
              Comments ({commentsState.length})
            </Typography>

            {/* Comments List */}
            {commentsState.length > 0 ? (
              <List sx={{ maxH: 220, overflowY: 'auto', mb: 2, pr: 1 }}>
                {commentsState.map((cmt, idx) => (
                  <ListItem key={idx} alignItems="flex-start" sx={{ px: 0, py: 1.5 }}>
                    <ListItemAvatar sx={{ minWidth: 40 }}>
                      <Avatar sx={{ width: 28, height: 28, bgcolor: 'secondary.main', fontSize: '0.8rem' }}>
                        {cmt.username ? cmt.username[0].toUpperCase() : 'U'}
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box display="flex" justifyContent="space-between" alignItems="center">
                          <Typography variant="caption" sx={{ fontWeight: 700 }}>
                            {cmt.username}
                          </Typography>
                          <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                            {cmt.createdAt ? new Date(cmt.createdAt).toLocaleDateString() : ''}
                          </Typography>
                        </Box>
                      }
                      secondary={
                        <Typography variant="body2" sx={{ mt: 0.5, color: 'text.primary', wordBreak: 'break-word' }}>
                          {cmt.comment}
                        </Typography>
                      }
                    />
                  </ListItem>
                ))}
              </List>
            ) : (
              <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2, fontStyle: 'italic' }}>
                No comments yet. Start the conversation!
              </Typography>
            )}

            {/* Comment Form */}
            {currentUserId ? (
              <Box component="form" onSubmit={handleCommentSubmit} display="flex" gap={1} alignItems="flex-end">
                <TextField
                  fullWidth
                  size="small"
                  variant="outlined"
                  placeholder="Write a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  sx={{
                    '& .MuiInputBase-input': { fontSize: '0.85rem' }
                  }}
                />
                <Button 
                  type="submit" 
                  variant="contained" 
                  color="primary"
                  sx={{ minWidth: 40, width: 40, height: 40, p: 0, borderRadius: '50%' }}
                >
                  <SendIcon fontSize="small" />
                </Button>
              </Box>
            ) : (
              <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                Please log in to leave comments.
              </Typography>
            )}
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  );
};

export default Blogcard;