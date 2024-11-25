import React from 'react';
import { StyleSheet, ScrollView, View} from 'react-native';
import { useTheme } from '../../utils/theme';
import { useAuth } from '../../data/AuthContext';
import { useUser } from '../../data/UserContext';
import Btn from "../components/Btn";
import Desplegable from '../components/Desplegable';
import LogoImg from '../components/LogoImg';
import { useNavigation } from '@react-navigation/native';
import strings from '../../utils/strings/strings';

const SettingsScreen = () => {
  const theme = useTheme();
  const { logout, user } = useAuth(); //me agarro los datos del user
  const { deleteAccount } = useUser();
  const navigation = useNavigation();

  return (
    <ScrollView style={styles.container}>

        <LogoImg></LogoImg>

      <Desplegable
        title={strings.privacidad}
        content={[
        strings.privacidadBody, '\n\n', 
        strings.privacidadBody1, '\n\n', 
        strings.privacidadBody2, '\n\n', 
        strings.privacidadBody3, '\n\n', 
        strings.privacidadBody4, '\n\n', 
        strings.privacidadBody5]}
      />

     <Desplegable
        title={strings.terminos}
        content={[
        strings.terminosBody, '\n\n', 
        strings.terminosBody1, '\n\n', 
        strings.terminosBody2, '\n\n', 
        strings.terminosBody3, '\n\n', 
        strings.terminosBody4, '\n\n', 
        strings.terminosBody5]}
      />
     
     <Desplegable
        title={strings.version}
        content={[
        strings.versionBody, '\n\n', 
        strings.versionBody1, '\n\n', 
        strings.versionBody2,]}
      />

      <Desplegable
        title={strings.preguntas}
        content={[
        strings.preg1titulo, '\n\n', strings.preg1body, '\n\n\n', 
        strings.preg2titulo, '\n\n', strings.preg2body, '\n\n\n', 
        strings.preg3titulo, '\n\n', strings.preg3body, '\n\n\n',
        strings.preg4titulo, '\n\n', strings.preg4body, '\n\n\n',]}
      />
      <View style={styles.analysisContainer}>

      <Btn
         onPress={() => logout(navigation)} 
         text="Cerrar Sesión"
         backgroundColor={theme.secondary}
         />

       <Btn
         onPress={() => deleteAccount(navigation)} 
         text="Eliminar Cuenta"
         backgroundColor={theme.buttonRed}
         />


      </View>

     

      
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 80
    
  },
  analysisContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  }

});

export default SettingsScreen;
