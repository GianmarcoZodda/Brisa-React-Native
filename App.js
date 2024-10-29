import LoginScreen from "./presentation/screens/LoginScreen";
import RegisterScreen from "./presentation/screens/RegisterScreen";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from './data/ThemeContext'
import React from 'react';
import ThemeContainer from './presentation/screens/ThemeContainer';
import BottomTabNavigator from "./presentation/components/BottomBar"
import HomeScreen from "./presentation/screens/HomeScreen";


const Stack = createNativeStackNavigator()


const withThemeContainer = (WrappedComponent) => {
  return (props) => (
    <ThemeContainer>
      <WrappedComponent {...props} />
    </ThemeContainer>
  );
};

export default function App() {

  return (
    <ThemeProvider>
       <ThemeContainer>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
            name="Main"
            component={BottomTabNavigator}
            options={{ headerShown: false }}
          />
        <Stack.Screen name="Login" component={withThemeContainer(LoginScreen)} />
        <Stack.Screen name="Register" component={withThemeContainer(RegisterScreen)} />
        <Stack.Screen name="Home" component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </ThemeContainer>
    </ThemeProvider>
  );
}


