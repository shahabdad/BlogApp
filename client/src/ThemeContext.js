import React, { createContext, useContext, useState, useMemo } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

const ThemeModeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {},
});

export const useThemeMode = () => useContext(ThemeModeContext);

export const ThemeModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('themeMode');
    return savedTheme ? savedTheme === 'dark' : true; // Default to dark mode for premium feel
  });

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      const next = !prev;
      localStorage.setItem('themeMode', next ? 'dark' : 'light');
      return next;
    });
  };

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: isDarkMode ? 'dark' : 'light',
          primary: {
            main: isDarkMode ? '#818cf8' : '#4f46e5', // Indigo
          },
          secondary: {
            main: isDarkMode ? '#f472b6' : '#db2777', // Pink/Rose
          },
          background: {
            default: isDarkMode ? '#0b0f19' : '#f8fafc', // Deep dark slate vs clean soft light slate
            paper: isDarkMode ? '#111827' : '#ffffff', // Dark gray vs pure white
          },
          text: {
            primary: isDarkMode ? '#f1f5f9' : '#0f172a',
            secondary: isDarkMode ? '#94a3b8' : '#475569',
          },
        },
        typography: {
          fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
          h1: { fontWeight: 800 },
          h2: { fontWeight: 800 },
          h3: { fontWeight: 700 },
          h4: { fontWeight: 700 },
          h5: { fontWeight: 600 },
          h6: { fontWeight: 600 },
          button: { textTransform: 'none', fontWeight: 600 },
        },
        shape: {
          borderRadius: 12,
        },
        components: {
          MuiButton: {
            styleOverrides: {
              root: {
                borderRadius: 24,
                padding: '8px 20px',
                transition: 'all 0.3s ease',
              },
              containedPrimary: {
                background: isDarkMode 
                  ? 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)' 
                  : 'linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)',
                boxShadow: isDarkMode 
                  ? '0 4px 14px 0 rgba(99, 102, 241, 0.4)' 
                  : '0 4px 14px 0 rgba(79, 70, 229, 0.3)',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: isDarkMode 
                    ? '0 6px 20px 0 rgba(99, 102, 241, 0.6)' 
                    : '0 6px 20px 0 rgba(79, 70, 229, 0.5)',
                },
              },
            },
          },
          MuiCard: {
            styleOverrides: {
              root: {
                borderRadius: 16,
                backgroundImage: 'none',
                boxShadow: isDarkMode
                  ? '0 4px 20px 0 rgba(0, 0, 0, 0.4)'
                  : '0 4px 20px 0 rgba(0, 0, 0, 0.05)',
                border: isDarkMode
                  ? '1px solid rgba(255, 255, 255, 0.05)'
                  : '1px solid rgba(0, 0, 0, 0.05)',
                transition: 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), box-shadow 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
              },
            },
          },
          MuiTextField: {
            styleOverrides: {
              root: {
                '& .MuiOutlinedInput-root': {
                  borderRadius: 10,
                  transition: 'all 0.3s ease',
                  '& fieldset': {
                    borderColor: isDarkMode ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                  },
                  '&:hover fieldset': {
                    borderColor: '#6366f1',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#6366f1',
                    borderWidth: '2px',
                    boxShadow: '0 0 8px rgba(99, 102, 241, 0.3)',
                  },
                },
              },
            },
          },
        },
      }),
    [isDarkMode]
  );

  return (
    <ThemeModeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </ThemeProvider>
    </ThemeModeContext.Provider>
  );
};
