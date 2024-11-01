import React from 'react';
import { View, StyleSheet } from 'react-native';
import LogoImg from '../components/LogoImg';

const HomeScreen = () => {

  return (
    <View style={styles.container}>
      <LogoImg></LogoImg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 65
  },

});

export default HomeScreen;
