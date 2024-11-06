import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);


  //esto se usa para saber si el user esta autenticado o no
  useEffect(() => {
    const loadToken = async () => {
      try {
        const storedToken = await AsyncStorage.getItem('authToken');
        if (storedToken) {
          setToken(storedToken);
          setIsAuthenticated(true);
          setError(null);
        }
      } catch (err) {
        console.error("Error loading token:", err);
      }
    };
    loadToken();
  }, []);


  const login = async (email, password) => {
    setError(null); //pongo el error en nulo para sacar el anterior, sui es q habia
    try {
      const authToken = await loginService(email, password);    //uso el service
      console.log("llame al servicio")
      setToken(authToken);
      setIsAuthenticated(true);
      try {
        await AsyncStorage.setItem('authToken', authToken);
      } catch (err) {
        console.error("Error saving token:", err);
      }
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } 
  };
  
  const logout = async () => {
    setToken(null); //borro token
    setIsAuthenticated(false);  //deja de estar autenticado
    setError(null); //sacvo el posible errror previo
    try {
      await AsyncStorage.removeItem('authToken');
    } catch (err) {
      console.error("Error removing token:", err);
    }
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, token }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};