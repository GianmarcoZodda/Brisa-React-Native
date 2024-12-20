import React, { useState } from 'react';
import { View, Text, Button, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import logoTransp from '../../assets/logoTransparente.png';

const SubirImagenScreen = () => {
  const navigation = useNavigation();
  const [imagen, setImagen] = useState(null);
  const [fechaSubida, setFechaSubida] = useState(null);

  const elegirImagen = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setImagen(result.assets[0].uri);
    } else {
      Alert.alert("Selección cancelada", "No se seleccionó ninguna imagen.");
    }
  };

  const subirImagen = async () => {
    if (!imagen) {
      Alert.alert("Error", "Primero selecciona una imagen.");
      return;
    }

    const fechaActual = new Date();
    const fecha = fechaActual.toLocaleDateString();
    const horario = fechaActual.toLocaleTimeString();
    setFechaSubida({ fecha, horario });

    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imagen,
        type: 'image/jpeg',
        name: 'imagen.jpg',
      });

      // Verificar si la imagen es una retina
      const response = await fetch('http://192.168.100.201:3000/isRetina', {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      const result = await response.json();

      if (result.result) {
        Alert.alert("Éxito", "La imagen es una retina.");
        // Aquí puedes proceder con el análisis adicional o la lógica adicional
        navigation.navigate("Profile", { imagen, fecha, horario });
      } else {
        Alert.alert("No es una retina", "La imagen seleccionada no es una retina.");
      }
    } catch (error) {
      console.error("Error al verificar si es retina:", error);
      Alert.alert("Error", "Hubo un problema al verificar si la imagen es una retina.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={logoTransp} style={styles.logo} resizeMode="contain" />
      <TouchableOpacity style={styles.imagePlaceholder} onPress={elegirImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>Seleccionar imagen</Text>
        )}
      </TouchableOpacity>
      <View style={styles.buttonContainer}>
        <Button title="Subir Imagen" color="#5FD068" onPress={subirImagen} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333',
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  logo: {
    width: 88,
    height: 88,
    marginBottom: 30,
    alignSelf: 'center',
  },
  imagePlaceholder: {
    width: 244,
    height: 244,
    borderRadius: 10,
    borderColor: '#5FD068',
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#444',
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 18,
  },
  image: {
    width: 244,
    height: 244,
    borderRadius: 10,
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
  },
});

export default SubirImagenScreen;
