import React, { useState } from 'react';
import { Box, Typography, TextField, Button, Card, CardContent, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from '../Redux/store';
import toast from 'react-hot-toast';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import { useThemeMode } from '../ThemeContext';

function Login() {
  const { isDarkMode } = useThemeMode();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setInputs((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post('http://localhost:9001/api/v1/user/login', {
        email: inputs.email,
        password: inputs.password,
      });
      if (data.success) {
        localStorage.setItem('userId', data?.user._id);
        localStorage.setItem('username', data?.user.username);
        localStorage.setItem('profilePic', data?.user.image || '');
        dispatch(authActions.login());
        toast.success("Login Successful!");
        navigate("/");
      }
    } catch (error) {
      console.error("Login Error:", error.response?.data || error.message);
      toast.error(error.response?.data?.message || "Login failed. Please check your email and password.");
    }
  };

  return (
    <Box
      sx={{
        minHeight: '85vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: isDarkMode
          ? 'radial-gradient(circle at center, rgba(99, 102, 241, 0.1) 0%, transparent 70%)'
          : 'radial-gradient(circle at center, rgba(79, 70, 229, 0.03) 0%, transparent 70%)',
        p: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 420,
          borderRadius: 4,
          bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
          backdropFilter: 'blur(8px)',
          boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <CardContent sx={{ p: 4 }}>
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
              Welcome Back
            </Typography>

            {/* Email Field */}
            <TextField
              label="Email Address"
              value={inputs.email}
              name="email"
              margin="normal"
              onChange={handleChange}
              type="email"
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Field */}
            <TextField
              label="Password"
              value={inputs.password}
              name="password"
              margin="normal"
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <Button
              type="submit"
              variant="contained"
              color="primary"
              fullWidth
              sx={{ mt: 4, py: 1.5, fontSize: '1rem', borderRadius: 3 }}
            >
              Sign In
            </Button>

            <Button
              onClick={() => navigate("/register")}
              fullWidth
              sx={{ mt: 2, textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}
            >
              Don't have an account? Sign Up
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
}

export default Login;
