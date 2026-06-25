import React, { useState, useRef } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Avatar,
  Stack,
  Card,
  CardContent,
  IconButton,
  InputAdornment
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import { useThemeMode } from "../ThemeContext";

const Register = () => {
  const { isDarkMode } = useThemeMode();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [inputs, setInputs] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  // Handle text input changes
  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  // Handle image input
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!image) {
      toast.error("Please upload a profile image.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("username", inputs.name);
      formData.append("email", inputs.email);
      formData.append("password", inputs.password);
      formData.append("image", image);

      const { data } = await axios.post(
        "http://localhost:9001/api/v1/user/register",
        formData
      );

      if (data.success) {
        toast.success("User registered successfully!");
        navigate("/login");
      }
    } catch (error) {
      console.error(error);
      toast.error("Registration failed. Please try again.");
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
        py: 4,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 440,
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
                mb: 3,
              }}
            >
              Create Account
            </Typography>

            {/* Profile Image Select */}
            <Box
              onClick={() => fileInputRef.current.click()}
              sx={{
                cursor: "pointer",
                mb: 3,
                textAlign: "center",
                position: "relative",
                display: "inline-block",
                left: "50%",
                transform: "translateX(-50%)"
              }}
            >
              <Stack alignItems="center" spacing={1}>
                <Box sx={{ position: 'relative' }}>
                  <Avatar
                    src={preview}
                    sx={{
                      width: 84,
                      height: 84,
                      border: '3px solid #6366f1',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'scale(1.05)',
                        borderColor: '#db2777'
                      }
                    }}
                  />
                  <Box
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      bgcolor: '#6366f1',
                      color: 'white',
                      borderRadius: '50%',
                      p: 0.5,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '2px solid white'
                    }}
                  >
                    <PhotoCameraIcon sx={{ fontSize: 16 }} />
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Upload Profile Photo
                </Typography>
              </Stack>
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                ref={fileInputRef}
                style={{ display: "none" }}
              />
            </Box>

            {/* Name Input */}
            <TextField
              label="Username"
              name="name"
              value={inputs.name}
              onChange={handleChange}
              fullWidth
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonOutlineIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Email Input */}
            <TextField
              label="Email Address"
              name="email"
              value={inputs.email}
              onChange={handleChange}
              type="email"
              fullWidth
              margin="normal"
              required
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <MailOutlineIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            {/* Password Input */}
            <TextField
              label="Password"
              name="password"
              value={inputs.password}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="normal"
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
              Sign Up
            </Button>

            <Button
              onClick={() => navigate("/login")}
              fullWidth
              sx={{ mt: 2, textTransform: 'none', color: 'text.secondary', fontWeight: 600 }}
            >
              Already registered? Sign In
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Register;
