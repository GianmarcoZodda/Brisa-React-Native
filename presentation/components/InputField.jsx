import React from 'react';
import { View, TextInput, Text, StyleSheet } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext'

const InputField = ({ value, onValueChange, label, isPassword = false }) => {//le defino la password en false x defecto
  const theme = useAppTheme();
 
  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.inverseBackground }]}>{label}</Text>
      <TextInput
        style={[styles.input, { color: theme.background }]} 
        value={value}
        onChangeText={onValueChange} 
        secureTextEntry={isPassword} // Habilita la entrada segura si es una contraseña
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40, 
    width: '90%',
  },
  label: {
    marginBottom: 4, // Espacio entre la etiqueta y el campo
    fontSize: 16,
    fontWeight: '500',
  },
  input: {
    height: 50, 
    borderColor: '#ccc', 
    borderWidth: 1, 
    borderRadius: 4, 
    paddingHorizontal: 10, 
    fontSize: 16, //en realidad, tenemos que hacer una lista de tamaños para las fuentes, y una tipografia unica como en kotlin
  },
});

export default InputField;