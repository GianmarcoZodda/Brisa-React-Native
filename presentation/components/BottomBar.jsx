import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { useAppTheme } from '../../data/ThemeContext'
import HomeScreen from "../screens/HomeScreen";
import { withThemeContainer } from "../hooks/HookContainer"
import AboutUsScreen from "../screens/AboutUsScreen";
import SettingsScreen from "../screens/SettingsScreen";
import PerfilScreen from "../screens/PerfilScreen";
import SubirImagenScreen from "../screens/SubirImagenScreen";


const Tab = createBottomTabNavigator();


const BottomTabNavigator = () => {
    const theme = useAppTheme();

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
            height: 70,
            backgroundColor: theme.background
        }
    }

    return (
        <Tab.Navigator screenOptions={screenOptions}>
            <Tab.Screen
                name="Home"
                component={withThemeContainer(HomeScreen)}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "home" : "home-outline"}
                            size={24}
                            color={theme.primary}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="Perfil"
                component={withThemeContainer(PerfilScreen)}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "person" : "person-outline"}
                            size={24}
                            color={theme.primary}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="SubirImagen"
                component={withThemeContainer(SubirImagenScreen)}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "add-circle" : "add-circle-outline"}
                            size={32}
                            color={theme.primary}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="About"
                component={withThemeContainer(AboutUsScreen)}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "help-circle" : "help-outline"}
                            size={33}
                            color={theme.primary}
                        />
                    }
                }}
            />

            <Tab.Screen
                name="Settings"
                component={withThemeContainer(SettingsScreen)}
                options={{
                    tabBarIcon: ({ focused }) => {
                        return <Ionicons
                            name={focused ? "settings" : "settings-outline"}
                            size={27}
                            color={theme.primary}
                        />
                    }
                }}
            />

        </Tab.Navigator>
    )
}

export default BottomTabNavigator;