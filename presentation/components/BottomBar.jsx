import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from '../../data/ThemeContext'
import HomeScreen from "../screens/HomeScreen";
import ProfileScreen from "../screens/ProfileScreen";


const Tab = createBottomTabNavigator();

const screenOptions = {
    tabBarShowLabel: false,
    tabBarHideOnKeyboard: true,
    headerShown: false,
    tabBarStyle: {
        position: "absolute",
        bottom: 0,
        right: 0,
        left: 0,
        elevation: 0,
        height: 70
    }
}

const BottomTabNavigator  = () => {
    const theme = useAppTheme();

    return(
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen 
                name="Home" 
                component={HomeScreen} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Ionicons 
                                name={focused ? "home" : "home-outline"} 
                                size={24} 
                                color={theme.primary}
                            />
                    }
                }}
            />

            <Tab.Screen 
                name="Profile" 
                component={ProfileScreen} 
                options={{
                    tabBarIcon: ({focused}) => {
                        return <Ionicons 
                                name={focused ? "person" : "person-outline"} 
                                size={24} 
                                color={theme.primary}
                            />
                    }
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator ;