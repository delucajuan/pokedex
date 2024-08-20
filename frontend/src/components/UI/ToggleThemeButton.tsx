'use client';
import { IconButton } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkMode';
import LightModeIcon from '@mui/icons-material/LightMode';
import { useThemeContext } from '@/context/ThemeContext';

function ToggleThemeButton() {
  const theme = useTheme();
  const darkMode = theme.palette.mode === 'dark';
  const { toggleTheme } = useThemeContext();

  return (
    <IconButton onClick={toggleTheme} color="inherit">
      {darkMode ? <LightModeIcon /> : <DarkModeIcon />}
    </IconButton>
  );
}

export default ToggleThemeButton;
