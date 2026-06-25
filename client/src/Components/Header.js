import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, useMediaQuery, IconButton, Menu, MenuItem, Avatar } from '@mui/material';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/store';
import toast from 'react-hot-toast';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import MenuIcon from '@mui/icons-material/Menu';
import { useThemeMode } from '../ThemeContext';

const Header = () => {
  const { isDarkMode, toggleTheme } = useThemeMode();
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileAnchorEl, setMobileAnchorEl] = useState(null);

  const username = localStorage.getItem('username') || '';
  const profilePic = localStorage.getItem('profilePic') || '';

  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success('Logout Successfully');
      localStorage.clear();
      setAnchorEl(null);
      navigate('/login');
    } catch (error) {
      console.log(error);
    }
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileAnchorEl(null);
  };

  // Media query for responsive design
  const isMobile = useMediaQuery('(max-width: 768px)');

  const navLinks = [
    { label: 'All Blogs', path: '/blogs' },
    { label: 'My Blogs', path: '/my-blogs', private: true },
    { label: 'Create Blog', path: '/create-blog', private: true },
  ];

  return (
    <AppBar
      position="sticky"
      sx={{
        background: isDarkMode ? 'rgba(11, 15, 25, 0.8)' : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(12px)',
        borderBottom: isDarkMode ? '1px solid rgba(255, 255, 255, 0.08)' : '1px solid rgba(0, 0, 0, 0.08)',
        color: isDarkMode ? '#f1f5f9' : '#0f172a',
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', px: { xs: 2, md: 4 } }}>
        {/* Brand Logo */}
        <Typography
          variant="h5"
          component={Link}
          to="/"
          sx={{
            fontWeight: 800,
            textDecoration: 'none',
            color: 'inherit',
            background: isDarkMode 
              ? 'linear-gradient(90deg, #818cf8 0%, #f472b6 100%)' 
              : 'linear-gradient(90deg, #4f46e5 0%, #db2777 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            letterSpacing: '-0.5px',
          }}
        >
          InkFlow
        </Typography>

        {/* Desktop Navigation */}
        {!isMobile && (
          <Box display="flex" gap={2} alignItems="center">
            {navLinks.map((link) => {
              if (link.private && !isLogin) return null;
              const isActive = location.pathname === link.path;
              return (
                <Button
                  key={link.path}
                  component={Link}
                  to={link.path}
                  sx={{
                    color: isActive 
                      ? (isDarkMode ? '#818cf8' : '#4f46e5') 
                      : (isDarkMode ? '#94a3b8' : '#475569'),
                    fontWeight: isActive ? 700 : 500,
                    position: 'relative',
                    '&:after': {
                      content: '""',
                      position: 'absolute',
                      bottom: 4,
                      left: '10%',
                      width: isActive ? '80%' : '0%',
                      height: '2px',
                      backgroundColor: isDarkMode ? '#818cf8' : '#4f46e5',
                      transition: 'all 0.3s ease',
                    },
                    '&:hover': {
                      color: isDarkMode ? '#f1f5f9' : '#0f172a',
                      background: 'transparent',
                      '&:after': {
                        width: '80%',
                      }
                    }
                  }}
                >
                  {link.label}
                </Button>
              );
            })}
          </Box>
        )}

        {/* Action Buttons (Right) */}
        <Box display="flex" alignItems="center" gap={1}>
          {/* Theme Toggle */}
          <IconButton onClick={toggleTheme} color="inherit">
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>

          {/* Login/Register/Profile buttons */}
          {isLogin ? (
            <>
              {/* User Dropdown */}
              {!isMobile && (
                <Typography variant="body2" sx={{ mr: 1, fontWeight: 600, color: isDarkMode ? '#94a3b8' : '#475569' }}>
                  Hi, {username || 'Blogger'}
                </Typography>
              )}
              <IconButton onClick={handleMenuOpen} sx={{ p: 0 }}>
                <Avatar
                  src={profilePic ? (profilePic.startsWith('http') ? profilePic : `http://localhost:9001/uploads/${profilePic}`) : null}
                  sx={{ 
                    bgcolor: isDarkMode ? '#6366f1' : '#4f46e5', 
                    width: 38, 
                    height: 38,
                    border: `2px solid ${isDarkMode ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)'}` 
                  }}
                >
                  {username ? username[0].toUpperCase() : 'U'}
                </Avatar>
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                onClick={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    minWidth: 150,
                    borderRadius: '12px',
                    boxShadow: isDarkMode ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.08)',
                    border: isDarkMode ? '1px solid rgba(255,255,255,0.05)' : '1px solid rgba(0,0,0,0.05)',
                  }
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
              >
                <MenuItem component={Link} to="/profile">My Profile</MenuItem>
                <MenuItem component={Link} to="/my-blogs">My Blogs</MenuItem>
                <MenuItem component={Link} to="/create-blog">Create Blog</MenuItem>
                <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 600 }}>Logout</MenuItem>
              </Menu>
            </>
          ) : (
            <Box display="flex" gap={1}>
              <Button component={Link} to="/login" variant="text" color="inherit">
                Login
              </Button>
              <Button component={Link} to="/register" variant="contained" color="primary">
                Register
              </Button>
            </Box>
          )}

          {/* Mobile Menu Icon */}
          {isMobile && (
            <>
              <IconButton onClick={handleMobileMenuOpen} color="inherit">
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={mobileAnchorEl}
                open={Boolean(mobileAnchorEl)}
                onClose={handleMobileMenuClose}
                onClick={handleMobileMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1.5,
                    width: '200px',
                    borderRadius: '12px',
                    boxShadow: isDarkMode ? '0 10px 25px rgba(0,0,0,0.5)' : '0 10px 25px rgba(0,0,0,0.08)',
                  }
                }}
              >
                {navLinks.map((link) => {
                  if (link.private && !isLogin) return null;
                  return (
                    <MenuItem 
                      key={link.path} 
                      component={Link} 
                      to={link.path}
                      selected={location.pathname === link.path}
                    >
                      {link.label}
                    </MenuItem>
                  );
                })}
                {isLogin && (
                  <>
                    <MenuItem component={Link} to="/profile">
                      My Profile
                    </MenuItem>
                    <MenuItem onClick={handleLogout} sx={{ color: 'error.main', fontWeight: 600 }}>
                      Logout
                    </MenuItem>
                  </>
                )}
              </Menu>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
