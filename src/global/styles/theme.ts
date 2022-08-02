export default {
  colors: {
    header: '#353BD8',
    secondary: '#42D6A4',
    secondary_light: 'rgba(66, 214, 164, 0.3)',
    menu: '#8F8F8F',
    text: '#474747',
    textNormal: '#474747',
    reject: '#D64242',
    subtitle: '#7B7890',
    background: '#FFFFFF',
    font_light: '#C5C5C5',
    welcome: '#0F0A39',
    purple: '#7C37FA',
    black: '#251C1C',
  },
  fonts: {
    regular: 'Poppins_400Regular',
    medium: 'Poppins_500Medium',
    bold: 'Poppins_700Bold',
  },
}

import { extendTheme } from 'native-base';

export const THEME = extendTheme({
  colors: {
    primary: {
      700: '#5e5ce5',
      500: '#6f6ddc',
    },
    secondary: {
      700: '#FBA94C',
    },
    green: {
      700: '#00875F',
      500: '#00B37E',
      300: '#04D361',
    },
    gray: {
      700: '#0d0d0d',
      600: '#262626',
      500: '#29292E',
      400: '#323238',
      300: '#7C7C8A',
      200: '#C4C4CC',
      100: '#E1E1E6',
    },
    white: '#FFFFFF',
  },
  fonts: {
    heading: 'Poppins_400Regular',
    body: 'Poppins_400Regular',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 20,
  },
  sizes: {
    14: 56,
  },
});
