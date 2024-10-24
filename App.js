import LoginScreen from "./presentation/screens/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { useAppTheme, ThemeProvider } from './data/ThemeContext'
import React from 'react';
import ThemeContainer from './presentation/screens/ThemeContainer';


export default function App() {

  const theme = useAppTheme();
  const Stack = createNativeStackNavigator()

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="screens" component={ScreenWrapper} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}

//aca agrego todas las screens para "encerrarlas" dentro del contenedor que le dal el color de fondo
const ScreenWrapper = () => (
  <ThemeContainer>
    <LoginScreen />
  </ThemeContainer>
);