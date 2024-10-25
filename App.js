import LoginScreen from "./presentation/screens/LoginScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './data/ThemeContext';
import ThemeContainer from "./presentation/screens/ThemeContainer";
import React from 'react';
import RegisterScreen from "./presentation/screens/RegisterScreen";


export default function App() {

  const Stack = createNativeStackNavigator()

  return (
    <ThemeProvider>
    <ThemeContainer> {/* El ThemeContainer envuelve todo */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </ThemeContainer>
  </ThemeProvider>
  );
}
