import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { useNavigation } from '@react-navigation/native';
import API_URL_BACKEND from "../../data/api/apiUrl"
import { useTheme } from '../../utils/theme';
import strings from '../../utils/strings/strings';
import EyeIcon from "../components/EyeIcon";
import Btn from "../components/Btn";
import { useAuth } from '../../data/AuthContext';

const SubirImagenScreen = () => {
  const theme = useTheme();
  const navigation = useNavigation();
  const { token } = useAuth(); 
  const [imagen, setImagen] = useState(null);

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

  // Función para verificar si la imagen es una retina
  const verificarRetina = async (imageUri) => {
    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      type: 'image/jpeg',  // Asegúrate de que el tipo de archivo sea correcto
      name: 'imagen.jpg',  // Nombre del archivo
    });

    try {
      const response = await fetch(`${API_URL_BACKEND}isRetina`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const responseVerificar = await response.json();

      // Verifica el resultado y retorna un valor booleano
      return responseVerificar.result; // Suponemos que `result` es true o false
    } catch (error) {
      console.error('Error al verificar la imagen:', error);
      Alert.alert('Error', 'Hubo un error al verificar la imagen.');
      return false; // Si ocurre un error, retornamos false
    }
  };

  const subirImagen = async () => {
    if (!imagen) {
      Alert.alert('Error', 'Por favor selecciona una imagen.');
      return;
    }

    // Verificar si la imagen es una retina antes de subirla
    const esRetina = await verificarRetina(imagen);
    if (!esRetina) {
      Alert.alert(
        'Error',
        'La imagen no es retina. Por favor, selecciona una imagen válida.',
        [
          {
            text: 'OK',
            onPress: () => navigation.navigate('Home') 
          }
        ]
      );
      return; // Si no es una retina, no proceder con la subida
    }

    const formData = new FormData();
    formData.append('file', {
      uri: imagen,
      type: 'image/jpeg',  // Asegúrate de que el tipo de archivo sea correcto
      name: 'imagen.jpg',  // Nombre del archivo
    });

    try {
      const response = await fetch(`${API_URL_BACKEND}subirImagen`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data', // Necesario para subir imágenes
        },
        body: formData,
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        throw new Error(errorResponse.message || 'Hubo un error al subir la imagen');
      }

      Alert.alert('Éxito', 'Imagen subida correctamente');
      navigation.goBack();  // Regresar a la pantalla anterior después de la carga exitosa
    } catch (error) {
      console.error('Error al subir la imagen:', error);
      Alert.alert('Error', error.message || 'Hubo un error al subir la imagen');
    } 
  };

  return (
    <View style={styles.container}>
      <EyeIcon />

      <TouchableOpacity style={[styles.imagePlaceholder, {borderColor: theme.primary}]} onPress={elegirImagen}>
        {imagen ? (
          <Image source={{ uri: imagen }} style={styles.image} />
        ) : (
          <Text style={styles.placeholderText}>{strings.seleccionarImagen}</Text>
        )}
      </TouchableOpacity>

      <Btn
        onPress={subirImagen} 
        text={strings.subirImagen}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    justifyContent: 'center',
  },
  imagePlaceholder: {
    width: 244,
    height: 244,
    borderRadius: 10,
    borderWidth: 2,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 50
  },
  placeholderText: {
    color: '#aaa',
    fontSize: 18,
  },
  image: {
    width: 244,
    height: 244,
    borderRadius: 10,
  }
});

export default SubirImagenScreen;
