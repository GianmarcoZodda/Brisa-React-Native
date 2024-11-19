import React, { createContext, useContext } from 'react';
import { useAuth } from './AuthContext';  
import { deleteAccount as deleteAccountService } from './UserService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const { setError, setUser, setToken, setIsAuthenticated } = useAuth();  

    const deleteAccount = async (navigation) => {
        setError(null);  
        
        try {
            const token = await AsyncStorage.getItem('authToken');
            const user = JSON.parse(await AsyncStorage.getItem('user'));
            console.log("Token cargado desde AsyncStorage en userContext:", token)
            console.log("User cargado desde AsyncStorage en userContext:", user)

            if (!token || !user) {
                throw new Error("No se encontró token o usuario.");
            }
            
            const response = await deleteAccountService(user.id, token);
  
            if (response.status === 200) {
                console.log('Cuenta eliminada con éxito');
                
                await AsyncStorage.removeItem('authToken');
                await AsyncStorage.removeItem('user');
                
                setToken(null);
                setUser(null);
                setIsAuthenticated(false);
                setError(null);
  
                navigation.navigate('Login');
            }
        } catch (err) {
            setError(err.message); 
            console.error('Error al eliminar la cuenta:', err);
        }
    };

    return (
        <UserContext.Provider value={{ deleteAccount }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook para usar el contexto
export const useUser = () => {
    return useContext(UserContext);
};
