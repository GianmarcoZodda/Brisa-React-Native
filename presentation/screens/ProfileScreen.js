import React from 'react';
import { View, StyleSheet} from 'react-native';
import InputField from '../components/InputField'; 
import EyeIcon from '../components/EyeIcon'; 



const ProfileScreen = () => {

  return (
    <View style={styles.container}>
      <EyeIcon />

      <InputField
        value=""
        onValueChange={() => {}} 
        label="Email"
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

export default ProfileScreen;