import LoginScreen from "./presentation/screens/LoginScreen";
import RegisterScreen from "./presentation/screens/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './data/ThemeContext'
import BottomTabNavigator from "./presentation/components/BottomBar"
import { withThemeContainer } from "./presentation/hooks/HookContainer";
import { AuthProvider } from "./data/AuthContext";

import React from 'react';
import ProfileScreen from "./presentation/screens/ProfileScreen";
import SubirImagenScreen from "./presentation/screens/SubirImagenScreen";

const Stack = createNativeStackNavigator()

export default function App() {

  return (
    <ThemeProvider>
      <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={withThemeContainer(LoginScreen)} />
        <Stack.Screen name="Register" component={withThemeContainer(RegisterScreen)} />
        <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Profile" component={withThemeContainer(ProfileScreen)} />
          <Stack.Screen name="SubirImagen" component={withThemeContainer(SubirImagenScreen)} />
        </Stack.Navigator>
      </NavigationContainer>
      </AuthProvider>
    </ThemeProvider>
  );
}

