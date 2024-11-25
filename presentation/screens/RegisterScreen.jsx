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

    const { register, error, validateEmail, validateLength } = useAuth();

    const [usernameError, setUsernameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [secondPasswordError, setSecondPasswordError] = useState('');


    const handleRegister = async () => {
        // Limpiar los errores de validación antes de la nueva validación
        setUsernameError('');
        setEmailError('')
        setPasswordError('');
        setSecondPasswordError('');
    
        let valid = true;

        const usernameLower = username.trim().toLowerCase();  
        const emailLower = email.trim().toLowerCase();
    
        if (!validateFieldsEmpty(usernameLower, emailLower, password, secondPassword)) valid = false;
        if (!validateEmail(emailLower)) {
          setEmailError(strings.emailInvalido);
          valid = false;
        }
        if (!validateLength(usernameLower, 2)) {
          setUsernameError(strings.usernameInvalido);
          valid = false;
        }
        if (!validateLength(password, 8)) {
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
            await register(usernameLower, emailLower, password);
          } catch (err) {
            // Si ocurre un error durante el registro
            setPasswordError(strings.errorInesperado);
          }
        }
      };

      const validateFieldsEmpty = (username, email, password, secondPassword) => {
        if (!username || !email || !password || !secondPassword) {
          if (!username) setUsernameError(strings.usernameVacio);
          if (!email) setEmailError(strings.emailVacio);
          if (!password) setPasswordError(strings.passwordVacia);
          if (!secondPassword) setSecondPasswordError(strings.confirmeContraseña);
          return false;
        }
        return true;
      }


return(
<View style={styles.container}>
    <EyeIcon></EyeIcon>

    <InputField value={username} onValueChange={setUsername} label="Username" error={usernameError}></InputField>

    <InputField value={email} onValueChange={setEmail} label="Email" error={emailError}></InputField>

    <InputField value={password} onValueChange={setPassword} label="Password" isPassword={true} error={passwordError}></InputField>

    <InputField value={secondPassword} onValueChange={setSecondPassword} label="Confirm Password" isPassword={true} error={secondPasswordError}></InputField>

    <Btn  onPress={handleRegister}
        text={strings.registrarme}></Btn>

    {error && <Text style={styles.errorText}>{error}</Text>}
</View>
)
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center', 
      alignItems: 'center', 
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