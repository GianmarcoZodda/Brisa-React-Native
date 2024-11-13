import strings from "../../utils/strings/strings";
import Btn from "../components/Btn";
import EyeIcon from "../components/EyeIcon";
import InputField from "../components/InputField";
import { StyleSheet, View, Text } from "react-native";
import React, { useState }  from 'react';
import { useAuth } from '../../data/AuthContext';


const RegisterScreen = () => {

    const [username, setUsername] = useState(''); 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState(''); 
    const [secondPassword, setSecondPassword] = useState('');

    const { register, error } = useAuth();

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [secondPasswordError, setSecondPasswordError] = useState('');



    const handleRegister = async () => {
        // Limpiar los errores de validación antes de la nueva validación
        setUsernameError('');
        setEmailError('')
        setPasswordError('');
        setSecondPasswordError('')
    
        let valid = true;
    
        if (!username || !email || !password || !secondPassword) {
          if (!username) setUsernameError(strings.usernameVacio);
          if (!email) setEmailError(strings.emailVacio);
          if (!password) setPasswordError(strings.passwordVacia);
          if (!secondPassword) setSecondPasswordError(strings.confirmeContraseña);
          valid = false;
        }
    
        if (username && username.length < 2) {
          setUsernameError(strings.usernameInvalido);
          valid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if (email && !emailRegex.test(email)) { //esa funcion de test valida que lo que tiene entre () cumpla con lo que esta en regex
            setEmailError(strings.emailInvalido);
            valid = false;
          }
    
        if (password && password.length < 8) {
          setPasswordError(strings.passwordInvalida);
          valid = false;
        }

        if ((password && secondPassword) && password != secondPassword) {
            setSecondPasswordError(strings.contraseñasDistintas);
            valid = false;
          }
    
        if (valid) {
          try {
            console.log("estoy en el try de la screen de register")
            await register(username, email, password, secondPassword);
          } catch (err) {
            // Si ocurre un error durante el registro
            setPasswordError(strings.errorInesperado);
          }
        }
      };



return(
<View style={styles.container}>
    <EyeIcon></EyeIcon>

    <InputField value={username} onValueChange={setUsername} label="username" error={usernameError}></InputField>

    <InputField value={email} onValueChange={setEmail} label="email" error={emailError}></InputField>

    <InputField value={password} onValueChange={setPassword} label="password" isPassword={true} error={passwordError}></InputField>

    <InputField value={secondPassword} onValueChange={setSecondPassword} label="confirm password" isPassword={true} error={secondPasswordError}></InputField>

    <Btn  onPress={handleRegister}
        text={strings.registrarme}></Btn>

    {error && <Text style={styles.errorText}>{error}</Text>}
</View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', // Centra verticalmente
      alignItems: 'center', // Centra horizontalmente
      padding: 16,
    },
    text:{
        marginBottom: 6,
    },
    errorText: {
        color: 'red',
        marginTop: 8,
      },
});


export default RegisterScreen;