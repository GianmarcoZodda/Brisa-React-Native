import { useColorScheme } from 'react-native';
import colors from './colors/colors'

const DarkTheme = {
    background: colors.black,
    primary: colors.celeste,
    secondary: colors.azul,
    /*tertiary: colors.darkBlue,*/
    inverseBackground: colors.white,
    buttonRed: colors.red,
    buttonGreen: colors.green
  };
  
  const LightTheme = {
    background: colors.white,
    primary: colors.celeste,
    secondary: colors.azul,
    /*tertiary: colors.darkBlue,*/
    inverseBackground: colors.black,
    buttonRed: colors.red,
    buttonGreen: colors.green
  };
  
  // Hook para obtener el esquema de color
  export const useTheme = () => {
    const scheme = useColorScheme();
    return scheme === 'dark' ? DarkTheme : LightTheme;
  };