import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Image, TouchableOpacity, FlatList, Text } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import logoTransp from '../../assets/logoTransparente.png';
import Btn from '../../presentation/components/Btn';
import strings from '../../utils/strings/strings';
import logoutIcon from '../../assets/logout.png';
import RetinaCard from '../components/RetinaCard';
import retina1 from '../../assets/retina1.jpg';
import retina2 from '../../assets/retina2.jpg';
import retina3 from '../../assets/retina3.jpg';

const ProfileScreen = ({imagen, fecha, horario}) => {
  const navigation = useNavigation();
  const route = useRoute();

  const [profile, setProfile] = useState({ 
    username: 'Juan Motok', 
    profilePic: require('../../assets/persona.jpg') 
  });
  const [miniCards, setMiniCards] = useState([
    { id: '1', miniatura: retina1, fecha: '2024-11-10', horario: '14:30' },
    { id: '2', miniatura: retina2, fecha: '2024-11-11', horario: '15:00' },
    { id: '3', miniatura: retina3, fecha: '2024-11-12', horario: '16:15' },
  ]);

  useEffect(() => {
    if (route.params?.imagen) {
      const nuevaImagen = {
        id: `${miniCards.length + 1}`, // Genera un ID único
        miniatura: { uri: route.params.imagen },
        fecha: route.params.fecha,
        horario: route.params.horario,
      };
      setMiniCards([nuevaImagen, ...miniCards]); 
    }
  }, [route.params]);

  const subirImagen = () => {
    navigation.navigate("SubirImagen");
  };

  const handleLogout = () => {
    console.log('Logica Logout');
  };

  return (
    <View style={styles.container}>
      <Image source={logoTransp} style={styles.logo} resizeMode="contain" />

      <View style={styles.profileContainer}>
        <Image source={profile.profilePic} style={styles.profilePic} resizeMode="contain" />
        <Text style={styles.username}>{profile.username}</Text>
      </View>

      <Text style={styles.retinasText}>Mis Retinas:</Text>

      <View style={styles.retinaListContainer}>
        <FlatList
          data={miniCards}
          renderItem={({ item }) => (
            <RetinaCard miniatura={item.miniatura} fecha={item.fecha} horario={item.horario} />
          )}
          keyExtractor={item => item.id}
        />
      </View>

      <View style={styles.buttonContainer}>
        <Btn text={strings.subirImagen} onPress={subirImagen} />
        <TouchableOpacity onPress={handleLogout}>
          <Image source={logoutIcon} style={styles.logoutIcon} resizeMode="contain" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    justifyContent: 'space-between',
  },
  logo: {
    width:70,
    height: 70,
    alignSelf: 'center',
    marginTop : 25
  },
  profileContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  profilePic: {
    width: 50,
    height: 50,
    borderRadius: 40,
    top: 20,
  },
  username: {
    fontSize: 18,
    marginLeft: 10,
    color: '#ddd',
    top: 20,
  },
  retinasText: {
    fontSize: 25,
    color: '#ddd',
    marginTop: 30,
  },
  retinaListContainer: {
    height: 450,
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    marginBottom: 40,
    justifyContent: 'space-between',
    marginTop: 10,  
  },
  logoutIcon: {
    width: 40, 
    height: 40, 
    marginLeft: 2, 
    backgroundColor: "#FF4C4C",
  },
});


export default ProfileScreen;
