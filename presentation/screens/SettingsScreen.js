import React from 'react';
import { StyleSheet, ScrollView } from 'react-native';
import Desplegable from '../components/Desplegable';
import LogoImg from '../components/LogoImg';
import strings from '../../utils/strings/strings';

const SettingsScreen = () => {
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
      
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginBottom: 80
  },
});

export default SettingsScreen;
