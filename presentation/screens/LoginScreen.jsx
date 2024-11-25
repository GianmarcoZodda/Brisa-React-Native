import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../components/InputField'; 
import Btn from '../components/Btn';
import strings from '../../utils/strings/strings';
import { useAppTheme } from '../../data/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import EyeIcon from "../components/EyeIcon";
import { useAuth } from '../../data/AuthContext';


const LoginScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { login, error, setError, isAuthenticated, validateEmail, validateLength } = useAuth();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  //cada vez que se autentique el usuario, va al homescreen
  useEffect(() => {
    if (isAuthenticated) {
      navigation.replace('Main');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    // Limpiar los errores de validación antes de la nueva validación
    setEmailError('');
    setPasswordError('');

    let valid = true;

    const emailLower = email.trim().toLowerCase();
    if (!validateEmailAndPaswordEmpty(emailLower, password)) valid = false;
    if (!validateEmail(emailLower)) {
      setEmailError(strings.emailInvalido);
      valid = false;
    }
    if (!validateLength(password, 8)) {
      setPasswordError(strings.passwordInvalida);
      valid = false;
    }

    if (valid) {
      try {
        console.log("estoy en el try de la screen de login")
        await login(emailLower, password);
      } catch (err) {
        // Si ocurre un error durante el login
        setPasswordError(strings.errorInesperado);
      }
    }
  };

  const validateEmailAndPaswordEmpty = (email, password) => {
    if (!email || !password) {
      if (!email) setEmailError(strings.emailVacio);
      if (!password) setPasswordError(strings.passwordVacia);
      return false;
    }
    return true;
  }

  return (
    <View style={styles.container}>
          <EyeIcon></EyeIcon>
      <InputField
        value={email}
        onValueChange={setEmail}
        label="Email"
        error={emailError}
      />

      <InputField
        value={password}
        onValueChange={setPassword}
        label="Password"
        isPassword={true}
        error={passwordError}
      />

     <Btn
        onPress={handleLogin} 
        text={strings.iniciarSesion}
      />
      
      <Text style={[styles.text, { color: theme.inverseBackground }]}>
        {strings.sinCuenta}
      </Text>

      <Btn
        onPress={() => {
          setError(null);
          navigation.navigate('Register');
        }}
        text={strings.registrarme}
      />

    {error && <Text style={styles.errorText}>{error}</Text>} 
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  text: {
    marginBottom: 6,
  },
  errorText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 10,  
  },
});

export default LoginScreen;

