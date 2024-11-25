import React, { createContext, useState, useContext, useEffect } from 'react';
import { login as loginService } from './AuthService';
import { register as registerService } from './AuthService';
import AsyncStorage from '@react-native-async-storage/async-storage';
import emailRegex from '../utils/Constants';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState(null);
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null)


  //para saber si esta autenticado o no. tambien lo expórto para poder actalualizar los datos del user en cualquier screen
  const loadUserData = async () => {
    try {
      const storedToken = await AsyncStorage.getItem('authToken');
      const storedUser = JSON.parse(await AsyncStorage.getItem('user'));

      if (storedToken && storedUser) {
        setToken(storedToken);
        setUser(storedUser);
        setIsAuthenticated(true);
        setError(null);
      }
    } catch (err) {
      console.error("Error cargando la data:", err);
    }
  };

  useEffect(() => {
    loadUserData();  
  }, []);


  const login = async (email, password) => {
    setError(null); //pongo el error en nulo para sacar el anterior, sui es q habia
   console.log("entro al login")
    try {
      const [authToken, userData] = await loginService(email, password);   

      if (authToken && userData) {
      setToken(authToken);
      setUser(userData);
      setIsAuthenticated(true);

      await AsyncStorage.setItem('authToken', authToken);
      await AsyncStorage.setItem('user', JSON.stringify(userData));

      console.log("me loguie")
      }
    
    } catch (err) {
      setError(err.message);
      setIsAuthenticated(false);
    } 
  };

  const register = async (username, email, password) => {
    setError(null)
    try{
      const [registroToken, userData] = await registerService(username, email, password);

      if(registroToken && userData){
        setToken(registroToken);
        setUser(userData)
        setIsAuthenticated(true);

        await AsyncStorage.setItem('authToken', registroToken);
        await AsyncStorage.setItem('user', JSON.stringify(userData));
      }
    }catch(error){
      setError(error.message)
      setIsAuthenticated(false);
      console.log("error: ", error)
    }
  }
  
  const logout = async (navigation) => {
    navigation.navigate("Login")
    setToken(null);
    setUser(null);
    setIsAuthenticated(false);
    setError(null);
    try {
      await AsyncStorage.removeItem('authToken');
      await AsyncStorage.removeItem('user');
    } catch (err) {
      console.error("Error al eliminar el token y el user:", err);
    }
  };


  const validateEmail = (email) => {
    if (email && !emailRegex.test(email)) { //esa funcion de test valida que lo que tiene entre () cumpla con lo que esta en regex
      return false;
    }
    return true;
  }

  const validateLength = (text, minLength) => {
    if (text.length < minLength) {
      return false;
    }
    return true;
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, setIsAuthenticated, login, logout, error, setError,  token, setToken, register, user, setUser, validateEmail, validateLength }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};