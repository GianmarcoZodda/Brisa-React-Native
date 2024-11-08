import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoImg from '../components/LogoImg';
import { useAuth } from '../../data/AuthContext';
import Btn from '../../presentation/components/Btn';
import { useNavigation } from '@react-navigation/native';

const HomeScreen = () => {
  const { logout } = useAuth();
  const navigation = useNavigation();
  return (
    <View style={styles.container}>
      <LogoImg></LogoImg>
      <Btn
        onPress={() => logout(navigation)} 
        text="Cerrar Sesion"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 65
  },

});

export default HomeScreen;
