import React, { useState, useEffect }  from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../../presentation/components/InputField'; 
import Btn from '../../presentation/components/Btn';
import strings from '../../utils/strings/strings';
import { useAppTheme } from '../../data/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import EyeIcon from "../components/EyeIcon";
import { useAuth } from '../../data/AuthContext';

const LoginScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [username, setUsername] = useState(''); 
  const [password, setPassword] = useState(''); 
  const { login, error, isAuthenticated } = useAuth();
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');


  //cada vez que se autentique el usuario, va al homescreen
  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate('Main');
    }
  }, [isAuthenticated]);

  const handleLogin = async () => {
    // Limpiar los errores de validación antes de la nueva validación
    setUsernameError('');
    setPasswordError('');

    let valid = true;

    if (!username || !password) {
      if (!username) setUsernameError(strings.usernameVacio);
      if (!password) setPasswordError(strings.passwordVacia);
      valid = false;
    }

    if (username && username.length < 2) {
      setUsernameError(strings.usernameInvalido);
      valid = false;
    }

    if (password && password.length < 8) {
      setPasswordError(strings.passwordInvalida);
      valid = false;
    }

    if (valid) {
      try {
        console.log("estoy en el try de la screen de login")
        await login(username, password); // Realiza la llamada al servicio de login, por ahora lo comento porque me falta la api de juanse*/
      } catch (err) {
        // Si ocurre un error durante el login
        setPasswordError(strings.errorInesperado);
      }
    }
  };

  return (
    <View style={styles.container}>
          <EyeIcon></EyeIcon>
      <InputField
        value={username}
        onValueChange={setUsername}
        label="Username"
        error={usernameError}
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
        onPress={() => navigation.navigate('Register')}
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
    marginTop: 10,  // Espacio entre los elementos y el mensaje de error
  },
});

export default LoginScreen;

