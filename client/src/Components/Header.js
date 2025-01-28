import React, { useState } from 'react';
import { Box, AppBar, Toolbar, Button, Typography, Tabs, Tab, useMediaQuery } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { authActions } from '../Redux/store';
import toast from 'react-hot-toast';
const Header = () => {
  let isLogin = useSelector((state) => state.isLogin);
  isLogin = isLogin || localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const handleLogout = () => {
    try {
      dispatch(authActions.logout());
      toast.success('Logout Successfully');
      navigate('/login');
      localStorage.clear();
    } catch (error) {
      console.log(error);
    }
  };
  // Media query for responsive design
  const isMobile = useMediaQuery('(max-width: 600px)');
  const isTablet = useMediaQuery('(max-width: 900px)');
  return (
    <>
          <AppBar position="sticky">
        <Toolbar>
          <Typography variant="h4" sx={{ flexGrow: 1 }}>
            My Blog App
          </Typography>
      {/* Navigation Tabs for larger screens */}
          {!isMobile && isLogin && (
            <Box display="flex" marginLeft="auto" marginRight="auto">
              <Tabs
                textColor="inherit"
                value={value}
                onChange={(e, val) => setValue(val)}
                indicatorColor="primary"
              >
                <Tab label="Blogs" component={Link} to="/blogs" />
                <Tab label="My Blogs" component={Link} to="/my-blogs" />
                <Tab label="Create Blog" component={Link} to="/create-blog" />
              </Tabs>
            </Box>
          )}

          {/* Buttons for login, register, and logout */}
          <Box display="flex" marginLeft="auto">
            {!isLogin && (
              <>
                <Button sx={{ margin: 1, color: 'white' }} component={Link} to="/login">
                  Login
                </Button>
                <Button sx={{ margin: 1, color: 'white' }} component={Link} to="/register">
                  Register
                </Button>
              </>
            )}
            {isLogin && (
              <Button onClick={handleLogout} sx={{ margin: 1, color: 'white' }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
