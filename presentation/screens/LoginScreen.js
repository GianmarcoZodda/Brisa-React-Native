import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import InputField from '../../presentation/components/InputField'; 
import Btn from '../../presentation/components/Btn';
import strings from '../../utils/strings/strings';
import { useAppTheme } from '../../data/ThemeContext';
import { useNavigation } from '@react-navigation/native';
import EyeIcon from "../components/EyeIcon";

const LoginScreen = () => {
  const theme = useAppTheme();
  const navigation = useNavigation();
  const [email, setEmail] = React.useState(''); 
  const [password, setPassword] = React.useState(''); 

  return (
    <View style={styles.container}>
          <EyeIcon></EyeIcon>
      <InputField
        value={email}
        onValueChange={setEmail}
        label="Email"
      />
      <InputField
        value={password}
        onValueChange={setPassword}
        label="Password"
        isPassword={true}
      />
      <Btn
        onPress={() => { /* Aquí iría la lógica para iniciar sesión */ }}
        text={strings.iniciarSesion}
      />
  <Text style={[styles.text, { color: theme.inverseBackground }]}>
    {strings.sinCuenta} {}
  </Text>

      <Btn
        onPress={() => navigation.navigate('Register')}
        text={strings.registrarme}
      />
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
});

export default LoginScreen;

