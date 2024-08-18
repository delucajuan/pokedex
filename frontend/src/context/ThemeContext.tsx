'use client';
import React, { createContext, useContext, useState, useMemo, ReactNode, useEffect } from 'react';
import { useMediaQuery } from '@mui/material';
import { getTheme } from '../theme';
import { ThemeProvider } from '@mui/material/styles';
import { ThemeContextType } from '@/types/types';

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useThemeContext = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useThemeContext must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeContextProvider = ({ children }: { children: ReactNode }) => {
  // Get user dark mode preference
  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  // Check session storage for saved theme mode
  const storedMode =
    typeof window !== 'undefined'
      ? (sessionStorage.getItem('themeMode') as 'light' | 'dark')
      : null;
  const [mode, setMode] = useState<'light' | 'dark' | undefined>(undefined);

  // Set mode based on storedMode or prefersDarkMode after component mounts
  useEffect(() => {
    const initialMode = storedMode || (prefersDarkMode ? 'dark' : 'light');
    setMode(initialMode);
  }, [prefersDarkMode, storedMode]);

  const theme = useMemo(() => (mode ? getTheme(mode) : undefined), [mode]);

  // Toggle color mode and save to session storage
  const toggleTheme = () => {
    setMode((prevMode) => {
      const newMode = prevMode === 'light' ? 'dark' : 'light';
      sessionStorage.setItem('themeMode', newMode);
      return newMode;
    });
  };

  // Synchronize mode with system preference, only if no user choice is stored
  useEffect(() => {
    if (!storedMode) {
      setMode(prefersDarkMode ? 'dark' : 'light');
    }
  }, [prefersDarkMode, storedMode]);

  // Prevent rendering until mode is determined
  if (!mode || !theme) {
    return null;
  }

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider key={mode} theme={theme}>
        {children}
      </ThemeProvider>
    </ThemeContext.Provider>
  );
};
