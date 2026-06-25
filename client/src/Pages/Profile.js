import React, { useState, useEffect, useRef } from "react";
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
  InputAdornment,
  useMediaQuery
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

const Profile = () => {
  const { isDarkMode } = useThemeMode();
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const userId = localStorage.getItem('userId');
  const isMobile = useMediaQuery('(max-width:600px)');

  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [imageFile, setImageFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  // Get user details
  const getUserProfile = async () => {
    if (!userId) {
      toast.error("Please login to view profile.");
      navigate("/login");
      return;
    }
    try {
      const { data } = await axios.get(`http://localhost:9001/api/v1/user/profile/${userId}`);
      if (data?.success) {
        setInputs((prev) => ({
          ...prev,
          username: data.user.username,
          email: data.user.email,
        }));
        setPreview(data.user.image);
      }
    } catch (error) {
      console.error(error);
      toast.error("Failed to load user profile.");
    }
  };

  useEffect(() => {
    getUserProfile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  const handleChange = (e) => {
    setInputs((prev) => ({
      ...prev,
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inputs.newPassword && inputs.newPassword !== inputs.confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    }

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("username", inputs.username);
      formData.append("email", inputs.email);
      if (inputs.newPassword) {
        formData.append("password", inputs.newPassword);
      }
      if (imageFile) {
        formData.append("image", imageFile);
      }

      const { data } = await axios.put(
        `http://localhost:9001/api/v1/user/update-profile/${userId}`,
        formData
      );

      if (data?.success) {
        toast.success("Profile updated successfully!");
        // Update local storage so Header reflects changes
        localStorage.setItem("username", data.user.username);
        if (data.user.image) {
          localStorage.setItem("profilePic", data.user.image);
        }
        // Clear password fields
        setInputs((prev) => ({
          ...prev,
          newPassword: "",
          confirmPassword: "",
        }));
        setImageFile(null);
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to update profile.");
    } finally {
      setLoading(false);
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
        py: 6,
        px: 2,
      }}
    >
      <Card
        sx={{
          width: '100%',
          maxWidth: 480,
          borderRadius: 4,
          bgcolor: isDarkMode ? 'rgba(17, 24, 39, 0.6)' : '#ffffff',
          backdropFilter: 'blur(8px)',
          boxShadow: isDarkMode ? '0 10px 30px rgba(0,0,0,0.5)' : '0 10px 30px rgba(0,0,0,0.05)',
        }}
      >
        <CardContent sx={{ p: { xs: 3, md: 4 } }}>
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
              My Profile
            </Typography>

            {/* Profile Image Select */}
            <Box
              onClick={() => fileInputRef.current.click()}
              sx={{
                cursor: "pointer",
                mb: 4,
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
                    src={preview ? (preview.startsWith('http') || preview.startsWith('blob:') ? preview : `http://localhost:9001/uploads/${preview}`) : null}
                    sx={{
                      width: 96,
                      height: 96,
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
                    <PhotoCameraIcon sx={{ fontSize: 18 }} />
                  </Box>
                </Box>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                  Change Profile Photo
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

            {/* Username Input */}
            <TextField
              label="Username"
              name="username"
              value={inputs.username}
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

            {/* Password Update Fields */}
            <Typography variant="body2" sx={{ mt: 3, mb: 1, fontWeight: 700, color: 'text.secondary' }}>
              Change Password (Leave blank to keep current)
            </Typography>

            <TextField
              label="New Password"
              name="newPassword"
              value={inputs.newPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                )
              }}
            />

            <TextField
              label="Confirm New Password"
              name="confirmPassword"
              value={inputs.confirmPassword}
              onChange={handleChange}
              type={showPassword ? 'text' : 'password'}
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockOpenIcon sx={{ color: 'text.secondary' }} />
                  </InputAdornment>
                ),
              }}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              fullWidth
              sx={{
                mt: 4,
                py: 1.5,
                fontSize: '1rem',
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                boxShadow: '0 4px 14px rgba(99, 102, 241, 0.4)',
                color: '#ffffff',
                '&:hover': {
                  background: 'linear-gradient(135deg, #4f46e5 0%, #9333ea 100%)',
                  transform: 'translateY(-2px)'
                }
              }}
            >
              {loading ? "Saving Changes..." : "Save Changes"}
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
