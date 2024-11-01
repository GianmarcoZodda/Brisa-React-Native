import LoginScreen from "./presentation/screens/LoginScreen";
import RegisterScreen from "./presentation/screens/RegisterScreen";
import SubirScreen from "./presentation/screens/SubirImagenScreen";

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './data/ThemeContext'
import React from 'react';
import BottomTabNavigator from "./presentation/components/BottomBar"
import { withThemeContainer } from "./presentation/screens/HocContainer";

const Stack = createNativeStackNavigator()



export default function App() {

  return (
    <ThemeProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={withThemeContainer(LoginScreen)} />
        <Stack.Screen name="Register" component={withThemeContainer(RegisterScreen)} />
        <Stack.Screen name="SubirImagen" component={withThemeContainer(SubirScreen)} />
        <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeProvider>
  );
}
