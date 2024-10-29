import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import InputField from '../components/InputField'; 
import EyeIcon from '../components/EyeIcon'; 
import Btn from '../components/Btn'
import strings from '../../utils/strings/strings';
import { useAppTheme } from "../../data/ThemeContext"
import { useNavigation } from '@react-navigation/native'


const LoginScreen = ({ /*agregar el context*/ }) => {//ahi le tengo que poner que reciba lkas funbciones que necesita, como las del vm o navegacion en kotlin...
  const theme = useAppTheme();
  const navigation = useNavigation()

  return (
    <View style={styles.container}>
      <EyeIcon />

      <InputField
        value="" //despues le agrego logica, x ahora queda vacio
        onValueChange={() => {}} // same....
        label="Email"
      />

      <InputField
        value="" 
        onValueChange={() => {}} 
        label="Password"
        isPassword={true}
  
      />

     <Btn
        onPress={() => {navigation.navigate("Home")}} //aca le tengo que pasar la funcion del vm y navegar
        text={strings.iniciarSesion}
      />

      <Text style={[styles.text, { color: theme.inverseBackground } ]}>{strings.sinCuenta}</Text>

      <Btn
        onPress={() => {navigation.navigate('Register')}} //lo mismo....
        text={strings.registrarme}
      />
    </View>
  );
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
  }
});

export default LoginScreen;