import { ThemeOptions, createTheme } from '@mui/material/styles';

export const themeOptions: ThemeOptions = {
  palette: {
    mode: 'light',
    primary: {
      main: '#ffeb3b',
    },
    secondary: {
      main: '#3b4fff',
    },
  },
};

export const theme = createTheme(themeOptions);
  