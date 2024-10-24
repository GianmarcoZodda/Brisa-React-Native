import React from 'react';
import { View, Text, StyleSheet} from 'react-native';
import InputField from '../../presentation/components/InputField'; 
import EyeIcon from '../../presentation/components/EyeIcon'; 
import Btn from '../../presentation/components/Btn'
import strings from '../../utils/strings/strings';
import { useAppTheme } from "../../data/ThemeContext"


const LoginScreen = ({ /*agregar el context*/ }) => {//ahi le tengo que poner que reciba lkas funbciones que necesita, como las del vm o navegacion en kotlin...
  const theme = useAppTheme();
  
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
        onClick={{}} //aca le tengo que pasar la funcion del vm y navegar
        text={strings.iniciarSesion}
      />

      <Text style={[styles.text, { color: theme.background }, styles ]}>{strings.sinCuenta}</Text>

      <Btn
        onClick={{}} //lo mismo....
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