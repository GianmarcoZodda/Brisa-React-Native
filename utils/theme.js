import { useColorScheme } from 'react-native';
import colors from './colors/colors'

const DarkTheme = {
    background: '#333',
    primary: colors.celeste,
    secondary: colors.azul,
    tertiary: colors.darkBlue,
    inverseBackground: colors.white
  };
  
  const LightTheme = {
    background: '#e4e4e4',
    primary: colors.celeste,
    secondary: colors.azul,
    tertiary: colors.darkBlue,
    inverseBackground: colors.black
  };
  
  // Hook para obtener el esquema de color
  export const useTheme = () => {
    const scheme = useColorScheme();
    console.log("Current scheme:", scheme);
    return scheme === 'dark' ? DarkTheme : LightTheme;
  };