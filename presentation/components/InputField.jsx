import React, { useState } from 'react';
import { View, TextInput, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { useAppTheme } from '../../data/ThemeContext';

const InputField = ({ value, onValueChange, label, isPassword = false , error}) => {
  const theme = useAppTheme();
  const [showPassword, setShowPassword] = useState(false); // Estado para mostrar/ocultar la contraseña

  return (
    <View style={styles.container}>
      <Text style={[styles.label, { color: theme.inverseBackground }]}>{label}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={[styles.input, { color: '#FFFFFF' }]}
          value={value}
          onChangeText={onValueChange}
          secureTextEntry={isPassword && !showPassword} // Cambia según el estado de showPassword
          placeholderTextColor="#FFFFFF"
        />
        {isPassword && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeButton}>
            <Image
              source={require('../../assets/PassIcon.png')} // Usar require para importar la imagen
              style={{ width: 24, height: 24 }} // Ajusta el tamaño de la imagen según lo necesites
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
    width: '90%',
  },
  label: {
    marginBottom: 4,
    fontSize: 16,
    fontWeight: '500',
  },
  inputContainer: {
    position: 'relative', // Establece el contenedor como relativo
    flexDirection: 'row', // Mantiene la flexibilidad en el diseño
  },
  input: {
    flex: 1, // Permitir que el TextInput use el espacio disponible
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    backgroundColor: '#333',
  },
  eyeButton: {
    position: 'absolute', // Posicionamiento absoluto para colocar el botón dentro del TextInput
    right: 10, // Espacio desde el borde derecho
    top: 5, // Ajusta este valor para subir el icono
    padding: 5, // Espaciado interno del botón
  },
  errorText: {
    color: '#FF0000',
    fontSize: 12,
    marginTop: 4,  // Espacio entre el TextInput y el mensaje de error
  },
});

export default InputField